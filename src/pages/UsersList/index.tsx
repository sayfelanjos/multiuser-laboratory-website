import React, { useCallback, useEffect, useState } from "react";
import { Table, Space, App } from "antd";
import type { TableColumnsType } from "antd";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Divider from "antd/lib/divider";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore as db } from "../../firebase";
import UserType from "../../interfaces/user";
import store from "../../redux/store/store";
import {
  setWarningOfDeletingUserModal,
  closeWarningOfDeletingUserModal,
} from "../../redux/reducers/warningOfDeletingUserModalSlice";
import "./_users-list-page.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import { showNotification } from "../../helpers/showNotification";
import { functions } from "../../firebase";
import { httpsCallable } from "firebase/functions";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import Spinner from "react-bootstrap/Spinner";

const personTypes: { [key: string]: string } = {
  unset: "Não especificado",
  individual: "Pessoa física",
  company: "Pessoa Jurídica",
  student: "Estudante",
};

const columns: TableColumnsType<UserType> = [
  {
    width: 72,
    dataIndex: "photoURL",
    render: (photoURL) => (
      <Image
        src={photoURL || userAvatar}
        alt="User"
        style={{ width: "auto", height: "40px" }}
        roundedCircle
      />
    ),
    filteredValue: [],
  },
  {
    title: "Nome",
    dataIndex: "fullName",
    sorter: (a, b) => a.displayName.localeCompare(b.displayName),
    filteredValue: [],
  },
  {
    title: "Email",
    sorter: (a, b) => a.email.localeCompare(b.email),
    dataIndex: "email",
    filteredValue: [],
  },
  {
    title: "Criação",
    dataIndex: "createdAt",
    sorter: (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis(),
    defaultSortOrder: "ascend",
    width: "15rem",
    render: (creationTime) =>
      new Date(creationTime.toMillis()).toLocaleString("pt-BR"),
    filteredValue: [],
  },
  {
    title: "Ultima Modificação",
    dataIndex: "lastUpdated",
    sorter: (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis(),
    defaultSortOrder: "ascend",
    width: "15rem",
    render: (creationTime) =>
      new Date(creationTime.toMillis()).toLocaleString("pt-BR"),
    filteredValue: [],
  },
  {
    title: "Tipo",
    dataIndex: "role",
    width: 100,
    filters: [
      { text: "Administrador", value: "admin" },
      { text: "Técnico", value: "technician" },
      { text: "Gestor", value: "manager" },
      { text: "Usuário comum", value: "user" },
    ],
    onFilter: (value, record) => record.role === value,
    filteredValue: [],
  },
  {
    title: "Pessoa",
    dataIndex: "personType",
    render: (p) => personTypes[p],
    filteredValue: [],
  },
  {
    title: "Usuário Ativo?",
    dataIndex: "isActive",
    width: 150,
    render: (v) => (v ? "Sim" : "Não"),
    filters: [
      { text: "Sim", value: true },
      { text: "Não", value: false },
    ],
    onFilter: (value, record) => record.isActive === value,
    filteredValue: [true],
    hidden: true,
  },
  {
    title: "Telefone",
    width: 120,
    dataIndex: "phoneNumber",
    filteredValue: [],
  },
  {
    title: "Ações",
    key: "operation",
    fixed: "right",
    filteredValue: [],
    width: 132,
    render: (record) => (
      <Space size="middle">
        <Link
          to={`/app/users/edit/${record.uid}`}
          className="users-list__action-btn"
        >
          Editar
        </Link>
        <Button
          type="button"
          className="btn btn-link users-list__action-btn"
          onClick={() =>
            store.dispatch(
              setWarningOfDeletingUserModal({
                isOpened: true,
                key: record.uid,
                userName: `${record.displayName}`,
              }),
            )
          }
        >
          Apagar
        </Button>
      </Space>
    ),
  },
];

const UsersList = () => {
  const [usersData, setUsersData] = useState<Array<UserType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { key, userName, isOpened } = useAppSelector(
    (state) => state.warningOfDeletingUserModal,
  );
  const dispatch = useAppDispatch();
  const { notification } = App.useApp();
  // todo: COMMENT REMOVE THESE VARIABLES AFTER MIGRATION COMPLETED
  const [migratedUsers, setMigratedUsers] = useState<boolean>(false);
  const [migratingUsers, setMigratingUsers] = useState<boolean>(false);

  // Get users list from firestore database.
  useEffect(() => {
    setIsLoading(true);
    const users: Array<UserType> = [];
    getDocs(collection(db, "users"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          users.push(user as UserType);
        });
        setUsersData(users.filter((user) => user.isActive));
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        // This ensures setIsLoading(false) is called only after the promise settles
        setIsLoading(false);
      });
  }, [key, migratedUsers]);

  const handleDeleteUser = useCallback(async () => {
    setIsLoading(true);

    // Get a reference to the Cloud Function
    const deleteUserFunction = httpsCallable(functions, "deleteUser");

    // Delete the user from Auth
    console.log("Deleting user with UID:", key);
    deleteUserFunction({ uid: key })
      .then(() => {
        // This code runs only if the function call was successful
        showNotification(
          notification,
          "Usuário apagado com sucesso!",
          "success",
        );

        // Remove the deleted user from the local state to update the UI
        setUsersData(
          usersData.map((user) =>
            user.uid === key ? { ...user, isActive: false } : user,
          ),
        );
      })
      .catch((error) => {
        // This code runs if the function call fails for any reason
        console.error("Error deleting user:", error);
        showNotification(
          notification,
          "O usuário não pôde ser apagado!\n Verifique e tente novamente.",
          "error",
        );
      })
      .finally(() => {
        // This code runs regardless of success or failure
        setIsLoading(false);
        dispatch(closeWarningOfDeletingUserModal());
      });
  }, [key]);

  // todo: COMMENT REMOVE THIS FUNCTION AFTER MIGRATION IS COMPLETED.
  const migrateUsers = httpsCallable(functions, "migrateUsers");
  const handleMigrateUsers = useCallback(() => {
    setMigratingUsers(true);
    migrateUsers()
      .then((resp) => {
        const data = resp.data as { message?: string };
        console.log("Migrated:", data.message);
        showNotification(
          notification,
          "Usuários migrados com sucesso!",
          "success",
        );
        setMigratedUsers(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setMigratingUsers(false);
        dispatch(closeWarningOfDeletingUserModal());
      });
  }, []);

  return (
    <Container
      fluid
      className="d-flex w-100 h-100 flex-column justify-content-center overflow-y-auto"
    >
      <Container className="shadow rounded-2 p-3">
        <h3>Lista de Usuários</h3>
        <Divider />
        <div className="d-flex justify-content-end gap-3">
          {/* // todo: COMMENT REMOVE THIS BUTTON AFTER MIGRATION COMPLETED */}
          <Button
            className={"px-3 " + (migratedUsers ? "" : "blinking-shadow")}
            onClick={handleMigrateUsers}
            disabled={migratedUsers}
            variant="dark"
          >
            {migratingUsers ? (
              <span>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-3"
                />
                Migrando usuários...
              </span>
            ) : migratedUsers ? (
              <span> Migração concluída! </span>
            ) : (
              <span> Migrar Usuários </span>
            )}
          </Button>
          <Link to="/app/users/add" className="btn btn-dark">
            Adicionar Novo Usuário
          </Link>
        </div>
        <Divider />
        <Table
          rowKey="uid"
          loading={isLoading}
          columns={columns}
          dataSource={usersData}
          scroll={{ x: "max-content", y: 300 }}
        />
        {/* {isLoading && (
          <Stack gap={2}>
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
          </Stack>
        )} */}
      </Container>
      <Modal
        show={isOpened}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <span className="d-flex justify-content-center align-items-center gap-3">
            <DeleteIcon />
            <Modal.Title className="m-0">Atenção</Modal.Title>
          </span>
        </Modal.Header>
        <Modal.Body>
          <p>Você tem certeza de que deseja apagar o usuário:</p>
          <i>{userName}</i>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-dark"
            onClick={() => dispatch(closeWarningOfDeletingUserModal())}
          >
            Não
          </Button>
          <Button className="btn-dark" onClick={handleDeleteUser}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UsersList;
