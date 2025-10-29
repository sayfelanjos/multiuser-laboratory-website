import React from "react";
import { Skeleton } from "antd";
// Removed Firebase Auth imports related to email/phone update
import {
  Spinner,
  Stack,
  Container,
  Row,
  Col,
  Card,
  // Removed InputGroup as it's now in child components
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../../firebase"; // Keep auth import
import { useAuth } from "../../hooks/useAuth";
import ProfilePicUploader from "../../components/ProfilePicUploader"; // Assuming path
import EmailEditor from "../../components/EmailEditor"; // Import new component
import PhoneEditor from "../../components/PhoneEditor"; // Import new component
import { useUserDocument } from "../../hooks/useUserDocument"; // Import new hook
import { Envelope, PencilSquare } from "react-bootstrap-icons"; // Keep needed icons
import DeleteAccountButton from "../../components/DeleteAccountButton";
import "./_user-profile-page.scss";

// --- Constants ---
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

// --- Helper Types & Components (Only InfoRow is kept) ---
type infoType = {
  data: string;
  label: string;
  mask?: [RegExp, string];
};

// InfoRow remains as it displays basic data
const InfoRow = ({ data, label, mask }: infoType) => {
  return (
    <Row className="mb-2">
      <Col xs={3} className="p-0">
        <span className="fw-lighter"> {label}: </span>
      </Col>
      <Col xs={9} className="p-0 ps-2">
        <span className="fs-6 fw-light d-inline-block mw-100 text-truncate">
          {mask ? data.replace(...mask) : data}
        </span>
      </Col>
    </Row>
  );
};

// =============================================================================
// MAIN COMPONENT --------------------------------------------------------------
// =============================================================================

const UserProfile = () => {
  // --- Hooks ---
  const {
    user,
    isLoading: isLoadingUser,
    role: userRole,
    refreshUserData,
  } = useAuth();

  // Use the custom hook to get user data and loading status
  const { userData, loadingDocStatus } = useUserDocument(user, refreshUserData);

  // --- Data Definitions (for InfoRow) ---
  const basicDataList: infoType[] = [
    { label: "Nome", data: userData?.names.fullName || "" },
    {
      label: "Pessoa",
      data: personsData[userData?.personType || ""] || "Não especificado",
    },
    {
      label: "CPF",
      data: userData?.documents.cpf || "",
      mask: [/^(\d{1,3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4"],
    },
    {
      label: "CNPJ",
      data: userData?.documents.cnpj || "",
      mask: [/^(\d{1,2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5"],
    },
    { label: "RA", data: userData?.documents.studentId || "" },
  ];

  // --- Render Logic ---
  return (
    <Container fluid className="user-profile-page__ctn">
      <Card
        className="mt-3 mb-5 shadow rounded-3 bg-white p-3 w-100"
        style={{ maxWidth: "800px" }}
      >
        {/* Header */}
        <Row className="mb-4 text-center">
          <Col>
            <ProfilePicUploader
              photoURL={user?.photoURL || ""}
              userUid={user?.uid || ""}
            />
            <div className="mt-3">
              {user ? (
                <>
                  <h4 className="fw-semibold">
                    {user.displayName || "loading..."}
                  </h4>
                  <p className="text-muted mb-0">
                    <Envelope /> {user.email}
                  </p>
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
            </div>
          </Col>
        </Row>

        {/* Loading/Error/Migrating States (using loadingDocStatus from hook) */}
        {loadingDocStatus === "error" ? (
          <>
            <h2 className="text-center">Ooops! Dados Não Encontrados...</h2>
            <p className="text-center text-muted">
              Tivemos um erro ao encontrar os dados do usuário.
            </p>
          </>
        ) : loadingDocStatus === "loading" || isLoadingUser ? ( // Combine loading states
          <Stack gap={2}>
            <h2 className="text-center">
              <Spinner className="me-3" as="span" animation="border" />{" "}
              Carregando Dados...
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
          // --- Main Content: Sections ---
          <Container fluid>
            <Row className="gap-3 justify-content-center px-3">
              {/* Basic Data Section (using InfoRow) */}
              <Col md={5} sm={5} className="mb-3 justify-content-center p-0">
                <h4 className="text-uppercase d-flex align-items-center text-muted mb-2 fw-light mt-sm-4 mb-4">
                  Dados Básicos
                  <Link
                    to={isLoadingUser ? "#" : "/app/users/edit/" + user?.uid}
                    className={`ms-3 p-2 d-flex align-items-center btn btn-secondary ${isLoadingUser ? " disabled" : ""}`}
                  >
                    <PencilSquare />
                  </Link>
                </h4>
                <Container>
                  {basicDataList
                    .filter(({ data }) => Boolean(data))
                    .map((info, i) => (
                      <InfoRow key={i} {...info} />
                    ))}
                </Container>
              </Col>

              {/* Contact Section (using new Editor components) */}
              <Col md={6} sm={true} className="mb-3 justify-content-center p-0">
                <h4 className="text-uppercase text-muted mb-2 fw-light mt-sm-4 mb-4">
                  Contato
                </h4>
                <Container>
                  <EmailEditor
                    initialEmail={userData?.email || ""}
                    user={user} // Pass the user object
                  />
                  <PhoneEditor
                    phone={userData?.phone || ""}
                    auth={auth} // Pass the auth instance
                    refreshUserData={refreshUserData}
                  />
                </Container>
              </Col>
            </Row>
          </Container>
        ) : (
          // Fallback Error
          <>
            <h2 className="text-center">Ooops! Algo inesperado ocorreu...</h2>
            <p className="text-center text-muted">
              Tivemos um erro ao encontrar os dados do usuário.
            </p>
          </>
        )}

        {/* Action Buttons */}
        <Row className="mt-4">
          <Col className="d-flex flex-wrap gap-2 justify-content-center">
            {/* {userRole === "admin" && (
              <Link to="/app/users/list" className="btn btn-outline-dark">
                Gerenciar Usuários
              </Link>
            )} */}
            <DeleteAccountButton user={user} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default UserProfile;
