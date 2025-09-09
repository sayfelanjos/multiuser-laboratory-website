import React, { useCallback, useState, useEffect } from "react";
import { showNotification } from "../../helpers/showNotification";
import { App } from "antd";
import { useAuth } from "../../hooks/useAuth";
import {
  Link,
  // useNavigate,
  // useLoaderData,
} from "react-router-dom";
import { Skeleton } from "antd";
import {
  Spinner,
  Stack,
  Container,
  Button,
  Row,
  Col,
  Card,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import UserType from "../../interfaces/user";
import "./_user-profile-page.scss";
import { getDoc, doc } from "firebase/firestore";
import { firestore as db } from "../../firebase";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";
import WarningIcon from "../../assets/icons/WarningIcon";

const personsData: Record<string, string> = {
  individual: "Pessoa Física",
  company: "Pessoa Jurídica",
  student: "Estudante",
};

const rolesData: Record<string, string> = {
  admin: "Administrador",
  manager: "Gestor",
  student: "Estudante",
  user: "Usuário",
};

const UserProfile = () => {
  const { user, isLoading: loadingUser, role: userRole } = useAuth();
  const [loadingAccountDeletion, setLoadingAccountDeletion] =
    useState<boolean>(false);
  const { notification } = App.useApp();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const showModal = () => setIsModalShowing(true);
  const closeModal = () => setIsModalShowing(false);
  const [deletionText, setDeletionText] = useState<string>("");

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as UserType;
          console.log("Document data:", data);
          setUserData(data);
        }
      });
    } else {
      console.log("User not loaded yet.");
    }
  }, [loadingUser, user]);

  const handleAccountDeletion = useCallback(async () => {
    setLoadingAccountDeletion(true);

    // Get a reference to the Cloud Function
    const deleteUserFunction = httpsCallable(functions, "deleteUser");

    // Delete the user from Auth
    if (!user) {
      showNotification(notification, `Dados de usuário ausentes!.`, "error");
      return;
    }
    console.log("Deleting user with UID:", user.uid);
    deleteUserFunction({ uid: user?.uid })
      .then(() => {
        showNotification(
          notification,
          `Usuário ${user.email} deletado com sucesso!`,
          "success",
        );
        console.log(`Usuário ${user.email} deletado com sucesso!`);
      })
      .catch((error) => {
        showNotification(
          notification,
          `Usuário ${user.email} não pode ser deletado! Você precisa sair e entrar novamente na aplicação.`,
          "error",
        );
        console.error(error.message);
      })
      .finally(() => {
        setLoadingAccountDeletion(false);
      });
  }, []);

  if (!userData) {
    return (
      <Container
        fluid
        className="user-profile-page__ctn d-flex justify-content-center align-items-start p-4"
      >
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
      </Container>
    );
  }

  // const sections: sectionType[] = [
  //   {
  //     title: "Dados Básicos",
  //     itemsList: [{ label: "Nome", data: userData.fullName || "" }],
  //   },
  // ];

  return (
    <Container
      fluid
      className="user-profile-page__ctn shadow rounded-2 p-3 d-flex justify-content-center flex-column"
    >
      <Card
        className="shadow rounded-3 bg-white p-4 w-100"
        style={{ maxWidth: "800px" }}
      >
        {/* Header */}
        <Row className="mb-4 text-center">
          <Col>
            <Image
              src={userData.photoURL || userAvatar}
              alt="User"
              roundedCircle
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
              className="mb-3"
            />
            <h4 className="fw-bold">
              {userData.fullName || userData.displayName}
            </h4>
            <p className="text-muted mb-0">{userData.email}</p>
            <small className="text-muted">
              {rolesData[userData.role] || "Usuário"}
            </small>
          </Col>
        </Row>

        {/* Basic Info */}
        <Row className="mb-3">
          <Col>
            <h6 className="text-uppercase text-muted mb-2">Dados Básicos</h6>
            <p>
              <strong>Nome: </strong>
              {userData.firstName} {userData.allLastNames}
            </p>
            <p>
              <strong>Pessoa: </strong>
              {personsData[userData.personType || ""] || "Não especificado"}
            </p>
            {userData.cpf && (
              <p>
                <strong>CPF: </strong> {userData.cpf}
              </p>
            )}
            {userData.cnpj && (
              <p>
                <strong>CNPJ: </strong> {userData.cnpj}
              </p>
            )}
            {userData.studentId && (
              <p>
                <strong>RA: </strong> {userData.studentId}
              </p>
            )}
          </Col>
        </Row>

        {/* Contact Info */}
        <Row className="mb-3">
          <Col>
            <h6 className="text-uppercase text-muted mb-2">Contato</h6>
            <Card.Text>
              <strong> Email: </strong> {userData.email}
            </Card.Text>
            <p>
              <strong>Telefone: </strong> {userData.phone || "Não informado"}
            </p>
          </Col>
        </Row>

        {/* Actions */}
        <Row className="mt-4">
          <Col className="d-flex flex-wrap gap-2 justify-content-center">
            <Link
              to={loadingUser ? "#" : "/app/users/edit/" + userData.uid}
              className={`btn btn-outline-dark ${loadingUser ? " disabled" : ""}`}
            >
              Editar Perfil
            </Link>

            {userRole === "admin" && (
              <Link to="/app/users/list" className="btn btn-outline-dark">
                Gerenciar Usuários
              </Link>
            )}

            <Button
              variant="outline-danger"
              onClick={() => {
                setDeletionText("");
                showModal();
              }}
              disabled={loadingAccountDeletion}
            >
              {loadingAccountDeletion ? (
                <span className="d-flex align-items-center gap-2">
                  <Spinner as="span" animation="border" size="sm" />
                  Apagando conta...
                </span>
              ) : (
                "Apagar conta"
              )}
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Modal ============================================== */}

      <Modal
        show={isModalShowing}
        onHide={closeModal}
        animation={true}
        centered
      >
        <Modal.Header>
          <span className="d-flex justify-content-center align-items-end gap-3">
            <WarningIcon />
            <h3 className="m-0">Atenção</h3>
          </span>
        </Modal.Header>
        <Modal.Body>
          <p>
            A sua conta de usuário será apagada. Deseja realmente prosseguir?
          </p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>
              Digite &quot;<span className="text-danger">deletar</span>&quot;
              para confirmar:
            </Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              className="text-danger"
              value={deletionText}
              placeholder="digite aqui..."
              onChange={(e) => setDeletionText(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={handleAccountDeletion}
            disabled={deletionText !== "deletar"}
          >
            Sim
          </Button>
          <Button variant="outline-dark" onClick={closeModal}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;

// type infoType = { data: string; label: string };
// type sectionType = { title: string; itemsList: infoType[] };

// const InfoSection = ({ title, itemsList }: sectionType) => {
//   return (
//     <Row className="mb-3">
//       <Col>
//         <h6 className="text-uppercase text-muted mb-2">{title}</h6>
//         {itemsList.map((props, i) => (
//           <InfoRow key={i} {...props} />
//         ))}
//       </Col>
//     </Row>
//   );
// };

// const InfoRow = ({ data, label }: infoType) => {
//   return (
//     <p>
//       <span className="text-uppercase text-muted">{label}: </span> {data}
//     </p>
//   );
// };
