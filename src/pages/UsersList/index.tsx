import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Table, Space, App } from "antd";
import type { TableColumnsType } from "antd";
import { Container, Modal, Button, Image, Spinner } from "react-bootstrap";
import Divider from "antd/lib/divider";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { functions, firestore as db } from "../../firebase";
import UserDocType from "../../interfaces/userDoc";
import {
  setWarningOfDeletingUserModal,
  closeWarningOfDeletingUserModal,
} from "../../redux/reducers/warningOfDeletingUserModalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import { showNotification } from "../../helpers/showNotification";
import "./_users-list-page.scss";
import { TrashFill, PencilSquare } from "react-bootstrap-icons";

const personTypes: { [key: string]: string } = {
  unset: "Não especificado",
  individual: "Pessoa física",
  company: "Pessoa Jurídica",
  student: "Estudante",
};

const roles: { [key: string]: string } = {
  user: "Usuário Comum",
  technician: "Técnico",
  manager: "Gestor",
  admin: "Administrador",
};

const UsersList = () => {
  const [usersData, setUsersData] = useState<Array<UserDocType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { key, userName, isOpened } = useAppSelector(
    (state) => state.warningOfDeletingUserModal,
  );
  const dispatch = useAppDispatch();
  const { notification } = App.useApp();
  // todo: COMMENT OUT OR REMOVE THESE VARIABLES AFTER MIGRATION COMPLETED
  const [migratedUsers, setMigratedUsers] = useState<boolean>(false);
  const [migratingUsers, setMigratingUsers] = useState<boolean>(false);

  const columns = useMemo<TableColumnsType<UserDocType>>(
    () => [
      {
        width: 72,
        dataIndex: "photos",
        render: (photos) => (
          <Image
            src={photos?.smallUrl || userAvatar}
            alt="User"
            style={{ width: "auto", height: "40px" }}
            roundedCircle
          />
        ),
      },
      {
        title: "Nome",
        dataIndex: "names",
        render: (names) => names?.fullName || "",
        sorter: (a, b) =>
          a.names.displayName.localeCompare(b.names.displayName),
      },
      {
        title: "Email",
        sorter: (a, b) => a.email.localeCompare(b.email),
        dataIndex: "email",
      },
      {
        title: "Criação",
        dataIndex: "createdAt",
        sorter: (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis(),
        defaultSortOrder: "ascend",
        width: "15rem",
        render: (creationTime) =>
          new Date(creationTime.toMillis()).toLocaleString("pt-BR"),
      },
      {
        title: "Ultima Modificação",
        dataIndex: "lastUpdated",
        sorter: (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis(),
        defaultSortOrder: "ascend",
        width: "15rem",
        render: (creationTime) =>
          new Date(creationTime.toMillis()).toLocaleString("pt-BR"),
      },
      {
        title: "Tipo",
        dataIndex: "role",
        width: 100,
        render: (r) => roles[r || "user"],
        filters: Object.keys(roles).map((key) => ({
          text: roles[key],
          value: key,
        })),
        onFilter: (value, record) => record.role === value,
      },
      {
        title: "Pessoa",
        dataIndex: "personType",
        render: (p) => personTypes[p || "unset"],
        filters: Object.keys(personTypes).map((key) => ({
          text: personTypes[key],
          value: key,
        })),
        onFilter: (value, record) => record.personType === value,
      },
      {
        title: "Documento",
        dataIndex: "documents",
        render: (value, user) => {
          if (user.personType === "individual") {
            return `cpf: ${value.cpf}`;
          } else if (user.personType === "company") {
            return `cnpj: ${value.cnpj}`;
          } else if (user.personType === "student") {
            return `studentId: ${value.studentId}`;
          }
          return "N/A";
        },
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
        hidden: true,
      },
      {
        title: "Telefone",
        width: 120,
        dataIndex: "phoneNumber",
        render: (v) => v || "-",
      },
      {
        title: "Ações",
        key: "operation",
        fixed: "right",
        width: 70,
        render: (record) => (
          <Space size="middle">
            <Link
              to={`/app/users/edit/${record.uid}`}
              className="users-list__action-btn"
            >
              <PencilSquare />
            </Link>
            <Button
              type="button"
              className="btn btn-link text-danger users-list__action-btn"
              onClick={() =>
                // Now using the dispatch from the component's hook
                dispatch(
                  setWarningOfDeletingUserModal({
                    isOpened: true,
                    key: record.uid,
                    userName: `${record.names.displayName}`,
                  }),
                )
              }
            >
              <TrashFill />
            </Button>
          </Space>
        ),
      },
    ],
    [dispatch],
  );

  // Get users list from firestore database.
  useEffect(() => {
    setIsLoading(true);
    const users: Array<UserDocType> = [];
    const usersCollectionRef = collection(db, "users");
    const q = query(usersCollectionRef, where("isActive", "==", true));

    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          users.push(user as UserDocType);
        });
        setUsersData(users);
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
        setUsersData((currentUsers) =>
          currentUsers.filter((user) => user.uid !== key),
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
  }, [key, dispatch, notification]);

  // todo: COMMENT or REMOVE THIS FUNCTION AFTER MIGRATION IS COMPLETED.
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
  }, [dispatch, notification]);

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
          {/* <Link to="/app/users/add" className="btn btn-dark" >
            Adicionar Novo Usuário
          </Link> */}
        </div>
        <Divider />
        <Table
          rowKey="uid"
          loading={isLoading}
          columns={columns}
          dataSource={usersData}
          scroll={{ x: "max-content", y: 300 }}
        />
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
