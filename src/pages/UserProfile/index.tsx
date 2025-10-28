import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  HTMLInputTypeAttribute,
} from "react";
import { App, Skeleton } from "antd";
import {
  verifyBeforeUpdateEmail,
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
} from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import {
  Spinner,
  Stack,
  Container,
  Button,
  Row,
  Col,
  Card,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import WarningIcon from "../../assets/icons/WarningIcon";
import { firestore as db, functions, auth } from "../../firebase";
import { showNotification } from "../../helpers/showNotification";
import { useAuth } from "../../hooks/useAuth";
import ProfilePicUploader from "../../components/ProfilePicUploader";
import UserDocType from "../../interfaces/userDoc";
import {
  PencilSquare,
  Envelope,
  Telephone,
  Check,
  X,
  type Icon as IconType,
} from "react-bootstrap-icons";
import { FirebaseError } from "firebase/app";
import "./_user-profile-page.scss";

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
  disabled?: boolean;
  Icon?: IconType;
  mask?: [RegExp, string];
  type?: HTMLInputTypeAttribute;
  submitCallback?: (value: string) => void;
};

// Custom hook to handle initial state setup from props
const useInitialValue = function <T>(data: T) {
  const [value, setValue] = useState<T>(data);

  // Reset internal state if the external data prop changes (e.g., after a save)
  useEffect(() => {
    setValue(data);
  }, [data]);

  return [value, setValue] as const;
};

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

const InfoRowEdit = ({
  data,
  label,
  submitCallback,
  Icon,
  disabled = false,
  type = "text",
}: infoType) => {
  const [inputValue, setInputValue] = useInitialValue<string>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  data = data.toLowerCase();
  // Function to start editing (triggers the state change)
  const startEditing = useCallback(() => {
    // 1. Set the state to true. This marks the input as non-disabled.
    // The DOM update (and thus the input becoming focusable) happens AFTER this function returns.
    setIsEditing(true);
  }, []);

  // *** THE FIX IS HERE ***
  // useEffect runs AFTER the component has rendered and the DOM has been updated.
  useEffect(() => {
    if (isEditing && inputRef.current) {
      // 2. Now that isEditing is true, the input is rendered as enabled,
      // and we can safely call focus().
      inputRef.current.focus();
      // Optionally, select all text for easy replacement
      inputRef.current.select();
    }
  }, [isEditing]); // Only run this effect when 'isEditing' changes

  const handleSave = useCallback(() => {
    submitCallback?.(inputValue);
    setIsEditing(false);
  }, [inputValue, submitCallback]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setInputValue(data); // Reset to original data prop value
  }, [data, setInputValue]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isEditing) {
        if (e.key === "Enter" && inputValue !== data) {
          handleSave();
        } else if (e.key === "Escape") {
          handleCancel();
        }
      }
    },
    [isEditing, handleSave, handleCancel],
  );

  const center = "d-flex justify-content-center align-items-center";

  return (
    <Row className="mb-2">
      <Col>
        <InputGroup>
          <InputGroup.Text>{Icon ? <Icon /> : label}</InputGroup.Text>
          <Form.Control
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            onKeyDown={handleKeyDown}
            placeholder={"Não informado"}
            disabled={disabled || !isEditing}
            ref={inputRef}
            type={type}
          />
          {!isEditing && !disabled && (
            <Button
              onClick={startEditing}
              variant="outline-secondary"
              className={center}
            >
              <PencilSquare />
            </Button>
          )}
          {isEditing && (
            <>
              <Button
                onClick={handleSave}
                variant={
                  inputValue === data ? "outline-secondary" : "outline-success"
                }
                className={center}
                disabled={inputValue === data}
              >
                <Check />
              </Button>

              <Button
                onClick={handleCancel}
                variant="outline-danger"
                className={center}
              >
                <X />
              </Button>
            </>
          )}
        </InputGroup>
      </Col>
    </Row>
  );
};

// =============================================================================
// MAIN COMPONENT --------------------------------------------------------------
// =============================================================================

const UserProfile = () => {
  // User Data Variables
  const {
    user,
    isLoading: isLoadingUser,
    role: userRole,
    refreshUserData,
  } = useAuth();
  const [userData, setUserData] = useState<UserDocType | null>(null);
  const [loadingDocStatus, setLoadingDocStatus] = useState<
    "loading" | "migrating" | "error" | "success"
  >("loading");
  const [loadingAccountDeletion, setLoadingAccountDeletion] =
    useState<boolean>(false);
  const { notification } = App.useApp();

  // Confirmation Modal Variables
  const [confirmationText, setConfirmationText] = useState<string>("");
  const [isConfirmationModalShowing, setIsConfirmationModalShowing] =
    useState<boolean>(false);
  const showConfirmationModal = () => setIsConfirmationModalShowing(true);
  const closeConfirmationModal = () => setIsConfirmationModalShowing(false);

  // Deletion Modal variables
  const [isDeletionModalShowing, setIsDeletionModalShowing] =
    useState<boolean>(false);
  const showDeletionModal = () => setIsDeletionModalShowing(true);
  const closeDeletionModal = () => setIsDeletionModalShowing(false);
  const [deletionText, setDeletionText] = useState<string>("");
  const deletionField = useRef<HTMLInputElement>(null);

  // State for Phone Verification (moved from PhoneUpdater)
  const [phoneCode, setPhoneCode] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const codeField = useRef<HTMLInputElement>(null);

  // Load user
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

  // useEffect for reCAPTCHA Verifier
  // This lives in the main component, so its lifecycle is stable.
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container", // We will add this div in the JSX
        { size: "invisible" },
      );
    }

    // Cleanup when UserProfile component unmounts
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = undefined;
      }
    };
  }, []); // Runs once when UserProfile mounts

  const handleAccountDeletion = useCallback(async () => {
    setLoadingAccountDeletion(true);

    // Get a reference to the Cloud Function
    const deleteUserFunction = httpsCallable(functions, "deleteUser");

    // Delete the user from Auth
    if (!user) {
      showNotification(notification, "Dados de usuário ausentes!", "error");
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

  const handleEmailChange = useCallback(
    async (newEmail: string) => {
      if (!user) {
        return;
      }

      // Define where Firebase should redirect back to after the user clicks the link
      const actionCodeSettings = {
        url: `${process.env.REACT_APP_FIREBASE_APP_DOMAIN}/app/users/verify-email`,
        handleCodeInApp: true,
      };

      console.log(process.env.REACT_APP_FIREBASE_APP_DOMAIN);

      try {
        // This sends the verification email to the NEW address.
        await verifyBeforeUpdateEmail(user, newEmail, actionCodeSettings);

        // IMPORTANT: The user's email has NOT changed yet in Firebase Auth.
        setConfirmationText(
          `Email de verificação enviado para ${newEmail}.
          Por favor, verifique sua caixa de correio para completar a alteração.`,
        );
        showConfirmationModal();
      } catch (error) {
        // Common error: 'auth/email-already-in-use'
        if (error instanceof FirebaseError) {
          if (error.message.includes("auth/email-already-in-use")) {
            showNotification(
              notification,
              `Email em uso! Utilize outro.`,
              "error",
            );
          }
        } else {
          console.error("Error sending verification email:", error);
          showNotification(notification, `Erro ao editar email`, "error");
        }
      }
    },
    [user, notification],
  );

  // Phone 'Send Code' Handler
  const handleSendCode = useCallback(
    async (newPhone: string) => {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        console.error("reCAPTCHA Verifier is not initialized.");
        alert("Erro de verificação, por favor recarregue a página.");
        return;
      }

      if (!auth.currentUser) {
        console.error("No user is signed in.");
        return;
      }

      const phoneProvider = new PhoneAuthProvider(auth);

      try {
        // Ensure phone is in E.164 format (e.g., +5511999999999)
        // This is a common source of errors if not formatted correctly.
        // You may need a library or regex to format 'newPhone' properly.
        // For now, let's assume it's correctly formatted.
        const verifId: string = await phoneProvider.verifyPhoneNumber(
          newPhone,
          appVerifier,
        );

        // Save the string ID to state, which will open the modal
        setVerificationId(verifId);
        showNotification(
          notification,
          "Código de verificação enviado por SMS!",
          "success",
        );
      } catch (error) {
        console.error("SMS not sent.", error);
        showNotification(
          notification,
          "Erro ao enviar SMS. Verifique o número ou tente mais tarde.",
          "error",
        );
      }
    },
    [auth, notification],
  );

  // Phone 'Verify Code' Handler
  const handleVerifyCode = useCallback(async () => {
    if (!verificationId || !auth.currentUser) {
      alert("Verification ID is missing or user is not logged in.");
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        phoneCode,
      );

      await updatePhoneNumber(auth.currentUser, credential);

      showNotification(
        notification,
        "Telefone atualizado com sucesso!",
        "success",
      );
      setVerificationId(null); // Close the modal
      setPhoneCode(""); // Reset code
      refreshUserData(); // Refresh user data to show new phone
    } catch (error) {
      console.error("Error updating phone number", error);
      showNotification(
        notification,
        "Verificação falhou. Código inválido?",
        "error",
      );
    }
  }, [verificationId, auth, phoneCode, notification, refreshUserData]); // Added dependencies

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

  const contactDataList: infoType[] = [
    {
      label: "Email",
      Icon: Envelope,
      data: userData?.email || "",
      submitCallback: handleEmailChange,
      type: "email",
    },
    {
      label: "Telefone",
      Icon: Telephone,
      data: userData?.phone || "",
      submitCallback: handleSendCode,
      type: "tel",
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
              {/* <InfoSection md={5} sm={5} {...dataSections[0]} /> */}

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

              {/* <InfoSection md={6} sm={true} {...dataSections[1]} /> */}

              <Col md={6} sm={true} className="mb-3 justify-content-center p-0">
                <h4 className="text-uppercase text-muted mb-2 fw-light mt-sm-4 mb-4">
                  Contato
                </h4>
                <Container>
                  {/* Email Row */}
                  <InfoRowEdit {...contactDataList[0]} />
                  {/* Phone Row */}
                  <InfoRowEdit {...contactDataList[1]} />
                </Container>
              </Col>
            </Row>
          </Container>
        ) : (
          // Error
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
            {/* Edit profile */}
            <Link
              to={isLoadingUser ? "#" : "/app/users/edit/" + user?.uid}
              className={`btn btn-outline-dark ${isLoadingUser ? " disabled" : ""}`}
            >
              Editar Perfil
            </Link>

            {/* Manage Users */}
            {userRole === "admin" && (
              <Link to="/app/users/list" className="btn btn-outline-dark">
                Gerenciar Usuários
              </Link>
            )}

            {/* Delete own account */}
            <Button
              variant="outline-danger"
              onClick={() => {
                setDeletionText("");
                showDeletionModal();
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

      {/* ✅ THIS IS THE FIX: Add the invisible div for reCAPTCHA */}
      <div id="recaptcha-container"></div>

      {/* Modal ============================================== */}

      {/* IMPUT CHANGE MODAL */}
      <Modal
        show={isConfirmationModalShowing}
        onHide={closeConfirmationModal}
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
          <p>{confirmationText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmationModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/* PHONE VERIFICATION MODAL */}
      <Modal
        show={Boolean(verificationId)}
        onHide={() => setVerificationId(null)} // Allow user to cancel
        animation={true}
        centered
        onEntered={() => codeField.current?.focus()} // Auto-focus input
      >
        <Modal.Header closeButton>
          <span className="d-flex justify-content-center align-items-end gap-3">
            <h3 className="m-0">Verificar Número de Telefone</h3>
          </span>
        </Modal.Header>
        <Modal.Body>
          <p>
            Digite o código de 6 dígitos que enviamos por SMS para completar a
            alteração.
          </p>
          <Form.Group className="mb-3" controlId="phoneCodeInput">
            <Form.Label>Código de Verificação:</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="______"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value)}
              maxLength={6}
              ref={codeField}
              onKeyDown={(e) => e.key === "Enter" && handleVerifyCode()}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setVerificationId(null)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleVerifyCode}
            disabled={phoneCode.length !== 6}
          >
            Verificar e Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ACCOUNT DELETION MODAL */}
      <Modal
        show={isDeletionModalShowing}
        onHide={closeDeletionModal}
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
              ref={deletionField}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant={deletionText === "deletar" ? "danger" : "outline-danger"}
            onClick={
              deletionText === "deletar"
                ? handleAccountDeletion
                : () => deletionField.current?.focus()
            }
            // disabled={deletionText !== "deletar"}
          >
            Sim
          </Button>
          <Button variant="outline-dark" onClick={closeDeletionModal}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;
