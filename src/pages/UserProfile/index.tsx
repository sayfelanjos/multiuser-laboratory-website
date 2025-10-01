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
import UserDocType from "../../interfaces/userDoc";
import "./_user-profile-page.scss";
import { getDoc, doc } from "firebase/firestore";
import { firestore as db } from "../../firebase";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";
import WarningIcon from "../../assets/icons/WarningIcon";
import { MaskedPattern } from "imask";

const personsData: Record<string, string> = {
  individual: "Pessoa Física",
  company: "Pessoa Jurídica",
  student: "Estudante",
};

const rolesData: Record<string, string> = {
  admin: "Administrador",
  manager: "Gestor",
  student: "Estudante",
  user: "Usuário Comum",
};

type infoType = {
  data: string;
  label: string;
  mask?: MaskedPattern<string>;
};

type sectionType = {
  title: string;
  itemsList: infoType[];
  sm?: number | boolean | "auto";
  md?: number | boolean | "auto";
};

const InfoSection = ({ title, itemsList, sm, md }: sectionType) => {
  return (
    <Col {...{ sm, md }} className="mb-3 justify-content-center p-0">
      <h4 className="text-uppercase text-muted mb-2 fw-light mt-sm-4 mb-4">
        {title}
      </h4>
      <Container>
        {itemsList
          .filter(({ data }) => Boolean(data))
          .map((props, i) => (
            <InfoRow key={i} {...props} />
          ))}
      </Container>
    </Col>
  );
};

const InfoRow = ({ data, label }: infoType) => {
  return (
    <Row className="mb-2">
      <Col xs={3} className="p-0">
        <span className="fw-lighter"> {label}: </span>
      </Col>
      <Col xs={9} className="p-0 ps-2">
        <span className="fs-6 fw-light d-inline-block mw-100 text-truncate">
          {label.toLocaleLowerCase() === "cpf"
            ? data.replace(/^(\d{1,3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
            : label.toLocaleLowerCase() === "cnpj"
              ? data.replace(
                  /^(\d{1,2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
                  "$1.$2.$3/$4-$5",
                )
              : data}
        </span>
      </Col>
    </Row>
  );
};

const UserProfile = () => {
  const {
    user,
    isLoading: loadingUser,
    role: userRole,
    refreshUserData,
  } = useAuth();
  const [loadingAccountDeletion, setLoadingAccountDeletion] =
    useState<boolean>(false);
  const { notification } = App.useApp();
  const [userData, setUserData] = useState<UserDocType | null>(null);
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);
  const [loadingDocStatus, setLoadingDocStatus] = useState<
    "loading" | "migrating" | "error" | "success"
  >("loading");
  const showModal = () => setIsModalShowing(true);
  const closeModal = () => setIsModalShowing(false);
  const [deletionText, setDeletionText] = useState<string>("");

  useEffect(() => {
    const migrateSelf = httpsCallable(functions, "migrateSelf");

    if (user) {
      setLoadingDocStatus("loading");
      const userDocRef = doc(db, "users", user.uid);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as UserDocType;
            setUserData(data);
            setLoadingDocStatus("success");
          } else {
            console.info(
              `Couldn't find the user document for user: ${user.email}. Trying self migration...`,
            );
            migrateSelf()
              .then(() => {
                new Promise((resolve) => {
                  setLoadingDocStatus("migrating");
                  setTimeout(() => resolve(refreshUserData()), 500);
                });
              })
              .catch((error) => {
                setLoadingDocStatus("error");
                console.error("Error: Could not create self document.", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error when accessing document:", error);
        });
    }
  }, [user]);

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
        console.error("Error when deleting user:", error.message);
      })
      .finally(() => {
        setLoadingAccountDeletion(false);
      });
  }, [notification, user]);

  const dataSections: sectionType[] = [
    {
      title: "Dados Básicos",
      itemsList: [
        { label: "Nome", data: userData?.names.fullName || "" },
        {
          label: "Pessoa",
          data: personsData[userData?.personType || ""] || "Não especificado",
        },
        { label: "CPF", data: userData?.documents.cpf || "" },
        { label: "CNPJ", data: userData?.documents.cnpj || "" },
        { label: "RA", data: userData?.documents.studentId || "" },
      ],
    },
    {
      title: "Contato",
      itemsList: [
        { label: "Email", data: userData?.email || "" },
        { label: "Telefone", data: userData?.phone || "Não informado" },
      ],
    },
  ];

  return (
    <Container fluid className="user-profile-page__ctn">
      <Card
        className="mt-3 mb-5 shadow rounded-3 bg-white p-3 w-100"
        style={{ maxWidth: "800px" }}
      >
        {/* Header */}
        <Row className="mb-4 text-center">
          <Col>
            <Image
              src={user?.photoURL || userAvatar}
              alt="User"
              roundedCircle
              style={{ width: "180px", objectFit: "cover" }}
              className="mb-3"
            />
            {user ? (
              <>
                <h4 className="fw-semibold">
                  {user.displayName || "loading..."}
                </h4>
                <p className="text-muted mb-0">{user.email}</p>
                <small className="text-muted">
                  <i>{rolesData[userRole || "user"]}</i>
                </small>
              </>
            ) : (
              <Stack gap={2}>
                <Skeleton.Input active size="small" />
                <Skeleton.Input active size="small" />
                <Skeleton.Input active size="small" />
              </Stack>
            )}
          </Col>
        </Row>

        {loadingDocStatus === "error" ? (
          <>
            <h2 className="text-center">Ooops! Dados Não Encontrados...</h2>
            <p className="text-center text-muted">
              Tivemos um erro ao encontrar os dados do usuário.
            </p>
          </>
        ) : loadingDocStatus === "loading" ? (
          <Stack gap={2}>
            <h2 className="text-center">
              <Spinner className="me-3" as="span" animation="border" />{" "}
              Carregado Dados...
            </h2>
            <br />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <br />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
            <Skeleton.Input active size="small" block />
          </Stack>
        ) : loadingDocStatus === "migrating" ? (
          <h2 className="text-center">
            <Spinner className="me-3" as="span" animation="border" /> Criando
            Documento de usuário...
          </h2>
        ) : loadingDocStatus === "success" && userData ? (
          <Container fluid>
            <Row className="gap-3 justify-content-center px-3">
              <InfoSection md={5} sm={5} {...dataSections[0]} />
              <InfoSection md={6} sm={true} {...dataSections[1]} />
            </Row>
          </Container>
        ) : (
          <>
            <h2 className="text-center">Ooops! Algo inesperado ocorreu...</h2>
            <p className="text-center text-muted">
              Tivemos um erro ao encontrar os dados do usuário.
            </p>
          </>
        )}

        {/* Actions */}
        <Row className="mt-4">
          <Col className="d-flex flex-wrap gap-2 justify-content-center">
            <Link
              to={loadingUser ? "#" : "/app/users/edit/" + user?.uid}
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
