import React, { useCallback, useState, useEffect, useRef } from "react";
import { App, Skeleton } from "antd";
import { verifyBeforeUpdateEmail } from "firebase/auth";
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
  Image,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  Link,
  // useNavigate,
  // useLoaderData,
} from "react-router-dom";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import WarningIcon from "../../assets/icons/WarningIcon";
import { firestore as db, functions } from "../../firebase";
import { showNotification } from "../../helpers/showNotification";
import { useAuth } from "../../hooks/useAuth";
import UserDocType from "../../interfaces/userDoc";
import "./_user-profile-page.scss";
import {
  PencilSquare,
  Envelope,
  Telephone,
  Check,
  X,
} from "react-bootstrap-icons";
import type { Icon as IconType } from "react-bootstrap-icons";

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
  submitCallback?: (value: string) => void;
};

type sectionType = {
  title: string;
  itemsList: Array<infoType>;
  sm?: number | boolean | "auto";
  md?: number | boolean | "auto";
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

const InfoSection = ({ title, itemsList, sm, md }: sectionType) => {
  return (
    <Col {...{ sm, md }} className="mb-3 justify-content-center p-0">
      <h4 className="text-uppercase text-muted mb-2 fw-light mt-sm-4 mb-4">
        {title}
      </h4>
      <Container>
        {itemsList
          .filter(({ data }) => Boolean(data))
          .map((info, i) =>
            info.submitCallback ? (
              <InfoRowEdit key={i} {...info} />
            ) : (
              <InfoRow key={i} {...info} />
            ),
          )}
      </Container>
    </Col>
  );
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
}: infoType) => {
  const [inputValue, setInputValue] = useInitialValue<string>(data);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
        if (
          e.key === "Enter" &&
          inputValue.toLowerCase() !== data.toLowerCase()
        ) {
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
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"Não informado"}
            disabled={disabled && !isEditing}
            ref={inputRef}
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
                variant="outline-success"
                className={center}
                disabled={inputValue.toLowerCase() === data.toLowerCase()}
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

// frontend/src/components/PhoneUpdater.tsx
// import {
//   getAuth,
//   updatePhoneNumber,
//   RecaptchaVerifier,
//   PhoneAuthProvider,
//   ConfirmationResult,
// } from "firebase/auth";

// const auth = getAuth();

/* / You need a component to handle the flow
const PhoneUpdater = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  // 1. Set up the reCAPTCHA verifier once on component mount
  useEffect(() => {
    // 'recaptcha-container' must match a DOM element ID.
    // We set 'size: "invisible"' to keep the UI clean.
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );
    }
    // Cleanup function (optional but good practice)
    return () => {
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
        }
    };
  }, [auth]);

  // 2. Send the verification code to the new number
  const handleSendCode = async () => {
    if (!auth.currentUser) return;
    
    const appVerifier = window.recaptchaVerifier;
    const phoneProvider = new PhoneAuthProvider(auth);

    try {
      const result = await phoneProvider.verifyPhoneNumber(
        phoneNumber, // Must be in E.164 format, e.g., '+16505551234'
        appVerifier,
      );
      setConfirmationResult(result);
      alert("Verification code sent! Please check your SMS.");
    } catch (error) {
      console.error("SMS not sent. Did reCAPTCHA fail?", error);
    }
  };

  // 3. Verify the code and update the phone number
  const handleVerifyCode = async () => {
    if (!confirmationResult || !auth.currentUser) return;
    try {
      // Create a secure credential from the code
      const credential = PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        code,
      );
      
      // Use the credential to update the signed-in user's phone number
      await updatePhoneNumber(auth.currentUser, credential);
      alert("Phone number updated successfully!");
      setConfirmationResult(null); // Reset the state
      setCode("");
    } catch (error) {
      console.error("Error updating phone number or bad code", error);
      alert("Verification failed. Check your code or try again.");
    }
  };

  return (
    <div>
      {
        // This invisible element is required for the reCAPTCHA widget to attach
      }
      <div id="recaptcha-container"></div>

      {!confirmationResult ? (
        <>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="New phone number (+15551234567)"
          />
          <button onClick={handleSendCode}>Send Verification Code</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="6-digit code from SMS"
          />
          <button onClick={handleVerifyCode}>Verify and Update</button>
        </>
      )}
    </div>
  );
};
/* */

// =============================================================================
// MAIN COMPONENT --------------------------------------------------------------
// =============================================================================

const UserProfile = () => {
  // User Data Variabl es
  const {
    user,
    isLoading: loadingUser,
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

  const handleEmailChange = async (newEmail: string) => {
    const currentUser = user;
    if (!currentUser) {
      return;
    }

    // Define where Firebase should redirect back to after the user clicks the link
    const actionCodeSettings = {
      url: "https://your-app-domain.com/profile",
      handleCodeInApp: true,
    };

    try {
      // This sends the verification email to the NEW address.
      await verifyBeforeUpdateEmail(currentUser, newEmail, actionCodeSettings);

      // IMPORTANT: The user's email has NOT changed yet in Firebase Auth.
      setConfirmationText(
        `Email de verificação enviado para ${newEmail}.
        Por favor, verifique sua caixa de correio para completar a alteração.`,
      );
      showConfirmationModal();
    } catch (error) {
      // Common error: 'auth/email-already-in-use'
      console.error("Error sending verification email:", error);
      showNotification(notification, `Erro ao editar email`, "error");
    }
  };

  const dataSections: sectionType[] = [
    {
      title: "Dados Básicos",
      itemsList: [
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
      ],
    },
    {
      title: "Contato",
      itemsList: [
        {
          label: "Email",
          Icon: Envelope,
          data: userData?.email || "",
          submitCallback: handleEmailChange,
        },
        {
          label: "Telefone",
          Icon: Telephone,
          data: userData?.phone || "",
          submitCallback: () => null,
        },
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

              {/* <InfoSection md={6} sm={true} {...dataSections[1]} /> */}

              <Col md={6} sm={true} className="mb-3 justify-content-center p-0">
                <h4 className="text-uppercase text-muted mb-2 fw-light mt-sm-4 mb-4">
                  {dataSections[1].title}
                </h4>
                <Container>
                  <Row className="mb-2">
                    <InfoRowEdit {...dataSections[1].itemsList[0]} />
                    <InfoRowEdit
                      {...dataSections[1].itemsList[1]}
                      disabled={true}
                    />
                  </Row>
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
              to={loadingUser ? "#" : "/app/users/edit/" + user?.uid}
              className={`btn btn-outline-dark ${loadingUser ? " disabled" : ""}`}
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
