import React, { useCallback, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ReactInputMask from "react-input-mask";
import Divider from "antd/lib/divider";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { firestore as db } from "../../firebase";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { App } from "antd";
import User from "../../interfaces/user";
import Modal from "react-bootstrap/Modal";
import WarningIcon from "../../assets/icons/WarningIcon";
import { showNotification } from "../../helpers/showNotification";

const UserForm = () => {
  const currentUser = useLoaderData() as User;
  const location = useLocation();
  const [isInputChanged, setIsInputChanged] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    key: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { notification } = App.useApp();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof User,
    ) => {
      setIsInputChanged(true);
      setUser((currentState) => ({
        ...currentState,
        [field]: event.target.value,
      }));
    },
    [],
  );

  const handleOnSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      if (user.key) {
        if (isInputChanged) {
          updateDoc(doc(db, "users", `${user.key}`), {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
          })
            .then(() => {
              showNotification(
                notification,
                "Os dados do usuário foram atualizados com sucesso!",
                "success",
              );
              navigate("/app/users/list");
            })
            .catch(() => {
              showNotification(
                notification,
                "As mudanças não foram salvas!\n Verifique e tente novamente.",
                "error",
              );
            });
        } else {
          showNotification(notification, "Não houve alterações", "warning");
          navigate("/app/users/list");
        }
      } else {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", `${user.email}`));
        const u: User[] = [];
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            u.push(doc.data() as User);
          });
          if (u.length > 0) {
            setIsLoading(false);
            showNotification(
              notification,
              `Não foi possível efetuar o cadastro!\nEmail já cadastrado para o usuário: ${u[0].firstName + " " + u[0].lastName}`,
              "error",
            );
          } else {
            addDoc(usersRef, {
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
              email: user.email,
            })
              .then(() => {
                showNotification(
                  notification,
                  "Usuário cadastrado com sucesso!",
                  "success",
                );
                navigate("/app/users/list");
              })
              .catch(() => {
                showNotification(
                  notification,
                  "O usuário não pode ser adicionado!\n Verifique e tente novamente.",
                  "error",
                );
              });
          }
        });
      }
    },
    [user],
  );
  return (
    <>
      <Form
        onSubmit={handleOnSubmit}
        className="bg-light shadow rounded-2 p-3 d-flex justify-content-center flex-column"
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Nome"
              name="firstName"
              onChange={(event) => handleOnChange(event, "firstName")}
              value={user.firstName}
            />
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Sobrenome</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Sobrenome"
              onChange={(event) => handleOnChange(event, "lastName")}
              value={user.lastName}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(event) => handleOnChange(event, "email")}
              required
              value={user.email}
            />
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustomUsername">
            <Form.Label>Celular</Form.Label>
            <ReactInputMask
              id="formBasicPhone"
              className="form-control"
              mask="(99)99999-9999"
              maskChar="_"
              placeholder="Celular"
              required
              name="phone"
              onChange={(event) => handleOnChange(event, "phone")}
              value={user.phone}
            />
          </Form.Group>
        </Row>
        <Divider />
        <Row>
          <Form.Group
            as={Col}
            md="4"
            className="d-flex gap-2 justify-content-end p-2 w-100"
          >
            <Button type="button" variant="outline-dark" onClick={handleShow}>
              Cancelar
            </Button>
            <Button type="submit" variant="dark" disabled={isLoading}>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className={`me-2 ${isLoading ? "" : "d-none"}`}
              />
              {location.pathname.match("/app/users/edit")
                ? "Salvar"
                : "Adicionar"}
            </Button>
          </Form.Group>
        </Row>
      </Form>
      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header>
          <span className="d-flex justify-content-center align-items-end gap-3">
            <WarningIcon />
            <h3 className="m-0">Atenção</h3>
          </span>
        </Modal.Header>
        <Modal.Body>Os dados serão perdidos. Deseja sair?</Modal.Body>
        <Modal.Footer>
          <Link className="btn btn-outline-dark" to="/app/users/list">
            Sim
          </Link>
          <Button variant="dark" onClick={handleClose}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserForm;
