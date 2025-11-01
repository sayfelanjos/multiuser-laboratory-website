import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button, Row, Col, Modal, Form, InputGroup } from "react-bootstrap";
import { Envelope, PencilSquare, Check, X } from "react-bootstrap-icons";
import { User, verifyBeforeUpdateEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import WarningIcon from "../../assets/icons/WarningIcon";
import { showNotification } from "../../helpers/showNotification";
import { App } from "antd"; // For notifications

const useInitialValue = function <T>(data: T) {
  const [value, setValue] = useState<T>(data);
  useEffect(() => {
    setValue(data);
  }, [data]);
  return [value, setValue] as const;
};

interface EmailEditorProps {
  initialEmail: string;
  user: User | null;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ initialEmail, user }) => {
  const [inputValue, setInputValue] = useInitialValue<string>(initialEmail);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const okButtonRef = useRef<HTMLButtonElement>(null);
  const { notification } = App.useApp();

  // State for the confirmation modal
  const [confirmationText, setConfirmationText] = useState<string>("");
  const [isConfirmationModalShowing, setIsConfirmationModalShowing] =
    useState<boolean>(false);
  const showConfirmationModal = useCallback(
    () => setIsConfirmationModalShowing(true),
    [],
  );
  const closeConfirmationModal = useCallback(
    () => setIsConfirmationModalShowing(false),
    [],
  );

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isConfirmationModalShowing && okButtonRef.current) {
      okButtonRef.current.focus();
    }
  }, [isConfirmationModalShowing]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setInputValue(initialEmail); // Reset to original prop value
  }, [initialEmail, setInputValue]);

  // --- Main Email Change Logic ---
  const handleEmailChange = useCallback(
    async (newEmail: string) => {
      if (!user) {
        showNotification(notification, "Usuário não autenticado.", "error");
        return;
      }
      // Simple email format validation (optional but recommended)
      if (!/\S+@\S+\.\S+/.test(newEmail)) {
        showNotification(notification, "Formato de email inválido.", "warning");
        return;
      }

      // Define where Firebase should redirect back
      const actionCodeSettings = {
        // Make sure this matches your environment variable setup
        url: `${process.env.REACT_APP_FIREBASE_APP_DOMAIN}/app/users/verify-email`,
        handleCodeInApp: true,
      };

      console.log("Using redirect URL:", actionCodeSettings.url);

      try {
        await verifyBeforeUpdateEmail(user, newEmail, actionCodeSettings);

        setConfirmationText(
          `Email de verificação enviado para ${newEmail}. ` +
            `Por favor, verifique sua caixa de correio para completar a alteração.`,
        );
        showConfirmationModal();
        setIsEditing(false); // Exit editing mode after successfully sending
      } catch (error) {
        console.error("Error sending verification email:", error);
        let message = "Erro desconhecido ao solicitar alteração de email.";
        // Improved Error Handling
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case "auth/email-already-in-use":
              message = "Este email já está em uso por outra conta.";
              break;
            case "auth/invalid-email":
              message = "O formato do novo email é inválido.";
              break;
            case "auth/requires-recent-login":
              message =
                "Esta é uma ação sensível. Por favor, faça login novamente antes de alterar seu email.";
              // Consider triggering a re-authentication flow here
              break;
            case "auth/too-many-requests":
              message =
                "Muitas tentativas. Por favor, tente novamente mais tarde.";
              break;
            default:
              message = `Erro ao editar email (${error.code})`;
          }
        }
        showNotification(notification, message, "error");
      }
    },
    [user, notification, showConfirmationModal],
  );
  // --- End Email Change Logic ---

  const handleSave = useCallback(() => {
    handleEmailChange(inputValue);
    // setIsEditing(false) is now handled within handleEmailChange on success
  }, [inputValue, handleEmailChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isEditing) {
        if (
          e.key === "Enter" &&
          inputValue.toLowerCase() !== initialEmail.toLowerCase()
        ) {
          handleSave();
        } else if (e.key === "Escape") {
          handleCancel();
        }
      }
    },
    [isEditing, handleSave, handleCancel, inputValue, initialEmail],
  );

  const center = "d-flex justify-content-center align-items-center";
  const currentNormalizedEmail = initialEmail.toLowerCase();
  const inputNormalizedEmail = inputValue.toLowerCase();

  return (
    <>
      <Row className="mb-2">
        <Col>
          <InputGroup>
            <InputGroup.Text>
              <Envelope />
            </InputGroup.Text>
            <Form.Control
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Don't force lowercase during input
              onKeyDown={handleKeyDown}
              placeholder={"Não informado"}
              disabled={!isEditing}
              ref={inputRef}
              type="email"
            />
            {!isEditing && (
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
                    inputNormalizedEmail === currentNormalizedEmail
                      ? "outline-secondary"
                      : "outline-success"
                  }
                  className={center}
                  disabled={inputNormalizedEmail === currentNormalizedEmail}
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

      {/* Confirmation Modal */}
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
          <Button
            ref={okButtonRef}
            variant="secondary"
            onClick={closeConfirmationModal}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmailEditor;
