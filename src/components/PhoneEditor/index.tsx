import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { Telephone, PencilSquare, Check, X } from "react-bootstrap-icons";
import {
  Auth, // Import Auth type
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { App } from "antd"; // For notifications
import { showNotification } from "../../helpers/showNotification"; // Adjust path as needed
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import default styles

// Custom hook copied from UserProfile
const useInitialValue = function <T>(data: T) {
  const [value, setValue] = useState<T>(data);
  useEffect(() => {
    setValue(data);
  }, [data]);
  return [value, setValue] as const;
};

interface PhoneEditorProps {
  phone: string;
  auth: Auth; // Pass the auth instance
  refreshUserData: () => void;
}

const PhoneEditor: React.FC<PhoneEditorProps> = ({
  phone,
  auth,
  refreshUserData,
}) => {
  // Notification
  const { notification } = App.useApp();

  // Editing Input
  const [initialPhone, setInitialPhone] = useInitialValue<string>(phone);
  const [inputValue, setInputValue] = useInitialValue<string>(initialPhone);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // State for Phone Verification
  const [phoneCode, setPhoneCode] = useState("");
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [isVerifyingCode, setIsVerifyingCode] = useState<boolean>(false);
  const codeField = useRef<HTMLInputElement>(null);
  const verifyButton = useRef<HTMLButtonElement>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // --- Function to destroy the verifier ---
  const destroyRecaptchaVerifier = useCallback(() => {
    if (window.recaptchaVerifier) {
      // Calling render with null might help ensure cleanup, though clear is primary
      // window.recaptchaVerifier.render().then(widgetId => {
      //   window.grecaptcha.reset(widgetId); // More explicit reset if available
      // });
      window.recaptchaVerifier.clear(); // Clear the existing widget
      window.recaptchaVerifier = undefined; // Remove instance from window
      console.log("RecaptchaVerifier destroyed.");

      // Remove the container content if necessary, be cautious with this
      const container = document.getElementById("recaptcha-container");
      if (container) container.innerHTML = "";
    }
  }, []);

  // --- Function to initialize the verifier ---
  const initializeRecaptchaVerifier = useCallback(() => {
    // Only initialize if it doesn't exist
    if (!window.recaptchaVerifier) {
      const recaptchaContainer = document.getElementById("recaptcha-container");
      if (recaptchaContainer) {
        try {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            { size: "invisible" },
          );
          console.log("RecaptchaVerifier initialized.");
          // Render it immediately to prepare it
          return window.recaptchaVerifier.render(); // Return the promise
        } catch (error) {
          console.error("Failed to initialize RecaptchaVerifier:", error);
          showNotification(
            notification,
            "Falha ao iniciar verificação reCAPTCHA.",
            "error",
          );
          return Promise.reject(error); // Return a rejected promise
        }
      } else {
        console.error("reCAPTCHA container (#recaptcha-container) not found.");
        return Promise.reject(new Error("reCAPTCHA container not found.")); // Return rejected promise
      }
    }
    // If it already exists, assume it's ready or render it again
    return window.recaptchaVerifier.render(); // Ensure it's rendered for the current attempt
  }, [auth, notification]);

  // --- Effect to cleanup on unmount ---
  useEffect(() => {
    // Cleanup when the component unmounts
    return () => {
      destroyRecaptchaVerifier();
    };
  }, [destroyRecaptchaVerifier]);

  const startEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setInputValue(initialPhone);
    setPhoneError(null);
  }, [initialPhone, setInputValue]);

  const handlePhoneInputChange = useCallback((value?: string | undefined) => {
    const phoneValue = value || "";
    setInputValue(phoneValue);
    // Validate on change
    if (phoneValue && !isValidPhoneNumber(phoneValue)) {
      setPhoneError("Número de telefone inválido.");
    } else {
      setPhoneError(null); // Clear error if valid or empty
    }
  }, []);

  // --- Phone Send Code Logic ---
  const handleSendCode = useCallback(
    async (newPhone: string) => {
      if (!newPhone) {
        setPhoneError("Número de telefone é obrigatório.");
        return;
      }
      if (!isValidPhoneNumber(newPhone)) {
        setPhoneError("Formato do número de telefone inválido.");
        showNotification(
          notification,
          "Corrija o número de telefone.",
          "warning",
        );
        return;
      }
      // Clear error if validation passes now
      setPhoneError(null);

      if (!auth.currentUser) {
        return;
      }

      try {
        showNotification(
          notification,
          "Iniciando verificação SMS...",
          "warning",
        );

        // STEP 1: Ensure verifier is initialized and rendered for this attempt
        await initializeRecaptchaVerifier();
        const appVerifier = window.recaptchaVerifier; // Should exist now

        if (!appVerifier) {
          // Double-check after initialization attempt
          throw new Error("Recaptcha Verifier failed to initialize.");
        }

        // STEP 2: Verify phone number
        const phoneProvider = new PhoneAuthProvider(auth);
        const verifId: string = await phoneProvider.verifyPhoneNumber(
          newPhone,
          appVerifier,
        );

        // STEP 3: Success
        setVerificationId(verifId);
        showNotification(notification, "Código SMS enviado!", "success");
        setIsEditing(false);
      } catch (error) {
        console.error("SMS not sent or reCAPTCHA failed.", error);
        const message = "Erro na verificação ou envio de SMS. Tente novamente.";
        if (error instanceof FirebaseError) {
          /* ... specific error handling ... */
        }
        showNotification(notification, message, "error");

        // STEP 4: Destroy verifier on error to allow retry
        destroyRecaptchaVerifier();
      }
    },
    [auth, notification, initializeRecaptchaVerifier, destroyRecaptchaVerifier], // Added new dependencies
  );

  // --- Phone Verify Code Logic ---
  const handleVerifyCode = useCallback(async () => {
    if (!verificationId || !auth.currentUser) {
      alert("ID de verificação ausente ou usuário não conectado.");
      return;
    }

    const syncAuthToFirestore = httpsCallable(functions, "syncAuthToFirestore");

    try {
      setIsVerifyingCode(true);
      const credential = PhoneAuthProvider.credential(
        verificationId,
        phoneCode,
      );

      await updatePhoneNumber(auth.currentUser, credential);
      await syncAuthToFirestore();

      showNotification(
        notification,
        "Telefone atualizado com sucesso!",
        "success",
      );

      setInitialPhone(inputValue);
      setVerificationId(null); // Close the modal
      setPhoneCode(""); // Reset code
      refreshUserData(); // Refresh user data to show new phone
    } catch (error) {
      console.error("Error updating phone number", error);
      let message = "Verificação falhou. Código inválido ou expirado?";
      if (error instanceof FirebaseError) {
        if (error.code === "auth/invalid-verification-code") {
          message = "Código de verificação inválido.";
        } else if (error.code === "auth/code-expired") {
          message = "Código de verificação expirou.";
        } else if (error.code === "auth/requires-recent-login") {
          message =
            "Esta é uma ação sensível. Por favor, faça login novamente.";
        }
        // Add other specific error codes if needed
      }
      showNotification(notification, message, "error");
    } finally {
      setIsVerifyingCode(false);
    }
  }, [verificationId, auth, phoneCode, notification, refreshUserData]);

  const handleSave = useCallback(() => {
    handleSendCode(inputValue);
  }, [inputValue, handleSendCode]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isEditing) {
        if (e.key === "Enter" && inputValue !== initialPhone) {
          handleSendCode(inputValue);
        } else if (e.key === "Escape") {
          handleCancelEdit();
        }
      }
    },
    [isEditing, inputValue, initialPhone],
  );

  // Function to handle modal closing
  const handleCloseModal = useCallback(() => {
    console.log("closing modal");
    setVerificationId(null);
    setPhoneCode("");
    setIsEditing(false);
    setInputValue(initialPhone);
    destroyRecaptchaVerifier();
  }, [destroyRecaptchaVerifier, initialPhone]);

  useEffect(() => {
    if (phoneCode.length === 6 && verificationId) {
      verifyButton.current?.focus();
    }
  }, [phoneCode, verificationId]);

  const center = "d-flex justify-content-center align-items-center";

  // type SubFormControlProps = React.ComponentProps<typeof Form.Control>;
  // const SubFormControl = React.forwardRef<
  //   HTMLInputElement,
  //   SubFormControlProps
  // >((props, ref) => (
  //   <Form.Control
  //     ref={ref as React.Ref<HTMLInputElement>}
  //     {...props}
  //     placeholder={"+55 (00) 00000 0000"}
  //     value={inputValue}
  //     disabled={!isEditing}
  //   />
  // ));
  // SubFormControl.displayName = "SubFormControl";

  return (
    <>
      <Row className="mb-2">
        <Col>
          <InputGroup>
            <InputGroup.Text>
              <Telephone />
            </InputGroup.Text>

            <PhoneInput
              // international
              withCountryCallingCode // Show "+55" etc.
              defaultCountry="BR" // Default to Brazil
              value={inputValue}
              onChange={handlePhoneInputChange}
              // disabled={!isEditing}
              // Apply Bootstrap styling
              className={`form-control p-1 ${phoneError ? "is-invalid" : ""}`}
              // Pass native input props if needed (e.g., for refs or keydown)
              inputComponent={Form.Control} // Use Form.Control as the base input for styling consistency
              ref={inputRef as React.Ref<any>}
              onKeyDown={handleKeyDown}
              placeholder={"+55 (00) 00000 0000"}
              // Indicate error state for Bootstrap styling
              isInvalid={phoneError}
            />

            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  variant={
                    inputValue === initialPhone
                      ? "outline-secondary"
                      : "outline-success"
                  }
                  className={center}
                  disabled={inputValue === initialPhone}
                >
                  <Check />
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  variant="outline-danger"
                  className={center}
                >
                  <X />
                </Button>
              </>
            ) : (
              <Button
                onClick={startEditing}
                variant="outline-secondary"
                className={center}
              >
                <PencilSquare />
              </Button>
            )}
          </InputGroup>
          <Form.Control.Feedback
            type="invalid"
            tooltip={false}
            style={{ display: phoneError ? "inline-block" : "none" }}
          >
            {phoneError}
          </Form.Control.Feedback>
        </Col>
      </Row>

      {/* Invisible div for reCAPTCHA - MUST be rendered */}
      <div id="recaptcha-container"></div>

      {/* Phone Verification Modal */}
      <Modal
        show={Boolean(verificationId)}
        onHide={handleCloseModal} // Allow user to cancel
        animation={true}
        centered
        onEntered={() => codeField.current?.focus()} // Auto-focus input
      >
        <Modal.Header closeButton>
          <Modal.Title as="h3">Verificar Número de Telefone</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Digite o código de 6 dígitos que enviamos por SMS para completar a
            alteração.
          </p>
          <Form.Group className="mb-3" controlId="phoneCodeInput">
            <Form.Label>Código de Verificação:</Form.Label>
            <Form.Control
              className="text-center fs-5 fw-5"
              style={{ letterSpacing: "2rem", caretColor: "transparent" }}
              autoComplete="off"
              type="text"
              placeholder="______"
              value={phoneCode}
              onChange={(e) => setPhoneCode(e.target.value.replace(/\D/, ""))}
              maxLength={6}
              ref={codeField}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                phoneCode.length === 6 &&
                handleVerifyCode()
              }
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            ref={verifyButton}
            variant="primary"
            onClick={handleVerifyCode}
            disabled={phoneCode.length !== 6 || isVerifyingCode}
          >
            {isVerifyingCode && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2 "
              />
            )}
            Verificar e Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PhoneEditor;
