import React, { useCallback, useEffect, useState } from "react";
import { Table, Space, App, Skeleton } from "antd";
import type { TableColumnsType } from "antd";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Divider from "antd/lib/divider";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { firestore as db } from "../../firebase";
import User from "../../interfaces/user";
import store from "../../redux/store/store";
import { setWarningOfDeletingUserModal } from "../../redux/reducers/warningOfDeletingUserModalSlice";
import "./_users-list-page.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import DeleteIcon from "../../assets/icons/DeleteIcon";
import { showNotification } from "../../helpers/showNotification";

const columns: TableColumnsType<User> = [
  {
    title: "ID",
    dataIndex: "key",
  },
  {
    title: "Nome",
    dataIndex: "firstName",
  },
  {
    title: "Sobrenome",
    dataIndex: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Celular",
    dataIndex: "phone",
  },
  {
    title: "Ações",
    key: "operation",
    fixed: "right",
    width: 132,
    render: (record) => (
      <Space size="middle">
        <Link
          to={`/app/users/edit/${record.key}`}
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
                key: record.key,
                userName: record.firstName + " " + record.lastName,
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
  const [data, setData] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { key, userName, isOpened } = useAppSelector(
    (state) => state.warningOfDeletingUserModal,
  );
  const dispatch = useAppDispatch();
  const { notification } = App.useApp();

  useEffect(() => {
    setIsLoading(true);
    const users: Array<User> = [];
    getDocs(collection(db, "users"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { firstName, lastName, email, phone } = doc.data() as User;
          users.push({
            key: doc.id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
          });
        });
        setData(users);
      })
      .catch((error) => {
        console.error(error.message);
      });
    setIsLoading(false);
  }, [key]);

  const onButtonClick = useCallback(() => {
    setIsLoading(true);
    deleteDoc(doc(db, "users", `${key}`))
      .then(() => {
        showNotification(
          notification,
          "Usuário apagado com sucesso!",
          "success",
        );
        setIsLoading(false);
        return dispatch(
          setWarningOfDeletingUserModal({
            isOpened: false,
            key: "",
            userName: "",
          }),
        );
      })
      .catch(() => {
        showNotification(
          notification,
          "Usuário não pode ser apagado!\n Verifique e tente novamente.",
          "error",
        );
        setIsLoading(false);
        return dispatch(
          setWarningOfDeletingUserModal({
            isOpened: false,
            key: "",
            userName: "",
          }),
        );
      });
  }, [key]);

  return (
    <Container className="d-flex h-100 flex-column justify-content-center">
      <div className="shadow rounded-2 p-3">
        <h3>Lista de Usuários</h3>
        <Divider />
        <div className="d-flex justify-content-end">
          <Link to="/app/users/add" className="btn btn-dark">
            Novo
          </Link>
        </div>
        <Divider />
        {isLoading ? (
          <Stack gap={2}>
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
          </Stack>
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 1500, y: 300 }}
          />
        )}
      </div>
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
            onClick={() =>
              dispatch(
                setWarningOfDeletingUserModal({
                  isOpened: false,
                  key: "",
                  userName: "",
                }),
              )
            }
          >
            Não
          </Button>
          <Button className="btn-dark" onClick={onButtonClick}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UsersList;
