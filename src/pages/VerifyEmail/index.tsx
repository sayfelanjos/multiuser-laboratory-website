import React, { useEffect, useState, useRef } from "react";
import { Container, Stack, Alert } from "react-bootstrap";
import { applyActionCode } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions, auth } from "../../firebase";
import { CheckCircle, XCircle, Person } from "react-bootstrap-icons";
import { showNotification } from "../../helpers/showNotification";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { App } from "antd";
import { FirebaseError } from "firebase/app";
import { Spin } from "antd";
import "./_verify-email.scss";

type Status = "loading" | "success" | "error";

const VerifyEmail: React.FC = () => {
  const { refreshUserData } = useAuth();
  const [status, setStatus] = useState<Status>("loading");
  const [countDown, setCountDown] = useState(7);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { notification } = App.useApp();
  const navigate = useNavigate();

  // This ref will prevent the effect from running twice in Strict Mode
  const hasFinalized = useRef(false);

  useEffect(() => {
    // Check if we've already run the finalization logic
    if (hasFinalized.current) {
      return;
    }
    // Set the ref to true immediately so the 2nd run in Strict Mode stops
    hasFinalized.current = true;

    const params = new URLSearchParams(window.location.search);
    const oobCode = params.get("oobCode");
    const mode = params.get("mode");

    console.log("Verifying action code...");

    // Check for a valid action code
    if (oobCode && mode === "verifyAndChangeEmail") {
      // We have a code, so let's run the full process.
      finalizeEmailChange(oobCode);

      // Clean the URL (optional, for aesthetics)
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // No code was found, so we can fail immediately
      setErrorMessage(
        "Link inválido ou ausente. Por favor, tente o processo novamente.",
      );
      setStatus("error");
    }
  }, [navigate, notification]); // Removed finalizeEmailChange from deps

  // This is your main logic function
  const finalizeEmailChange = async (oobCode: string) => {
    // Get the callable function from your logs
    const syncAuthToFirestore = httpsCallable(functions, "syncAuthToFirestore");

    try {
      // ----------------------------------------------------------------
      // STEP 1: FINALIZE AUTH CHANGE
      // ----------------------------------------------------------------
      await applyActionCode(auth, oobCode);

      // --- Auth is now updated! ---

      // ----------------------------------------------------------------
      // STEP 2: GUARANTEE FIREBASE UPDATE
      // ----------------------------------------------------------------
      await syncAuthToFirestore();

      // --- Firestore is now updated! ---

      // ----------------------------------------------------------------
      // STEP 3: REFRESH!
      // ----------------------------------------------------------------
      await refreshUserData();

      // --- Firestore is now updated! ---

      // ----------------------------------------------------------------
      // STEP 4: ALL SUCCESS!
      // ----------------------------------------------------------------
      setStatus("success");
      showNotification(
        notification,
        "Email atualizado e perfil sincronizado!",
        "success",
      );

      // ----------------------------------------------------------------
      // STEP 5: Navigate back to the profile page after a delay
      // ----------------------------------------------------------------
      const counterId = setInterval(() => {
        setCountDown((c) => {
          c = c - 1;
          if (c <= 0) {
            clearInterval(counterId);
            navigate("/app/users/profile", { replace: true });
          }
          return c;
        });
      }, 1000);
    } catch (error) {
      console.error("Error finalizing email change:", error);
      let msg = "Ocorreu um erro desconhecido. Por favor, tente novamente.";

      // ----------------------------------------------------------------
      // STEP 6: Error Handling
      // ----------------------------------------------------------------
      if (error instanceof FirebaseError) {
        if (error.code === "auth/expired-action-code") {
          msg =
            "Este link de verificação expirou. Por favor, solicite a alteração de email novamente.";
        } else if (error.code === "auth/invalid-action-code") {
          msg =
            "Este link é inválido ou já foi usado. Por favor, solicite a alteração de email novamente.";
        }
      }

      setErrorMessage(msg);
      setStatus("error");
    }
  };

  // --- Render Logic ---
  // I've kept your style but used <Stack> for cleaner centering and layout

  if (status === "loading") {
    return (
      <Container
        fluid
        className="d-flex vh-100 justify-content-center align-items-center"
      >
        <Stack gap={3} className="text-center mt-5">
          <Spin size="large" />
          <h3 className="fw-light">Verificando seu email...</h3>
          <p className="text-muted">
            Por favor, aguarde. Estamos finalizando a alteração.
          </p>
        </Stack>
      </Container>
    );
  }

  if (status === "success") {
    return (
      <Container
        fluid
        className="d-flex vh-100 justify-content-center align-items-center"
      >
        <Stack gap={3} className="text-center d-flex align-items-center mt-5">
          <h1 className="text-secondary verify-email__alert d-flex align-items-center">
            <CheckCircle className="text-success me-3" /> Email Atualizado!
          </h1>
          <p className="text-muted">
            Seu perfil foi sincronizado. <br />
            Redirecionando você de volta em <b>{countDown}s</b> ...
          </p>
          <Link
            to="/app/users/profile"
            className="btn btn-outline-secondary d-flex align-items-center"
          >
            <Person className="me-2" /> Voltar para o Perfil agora
          </Link>
        </Stack>
      </Container>
    );
  }

  // This will only show if status === 'error'
  return (
    <Container
      fluid
      className="d-flex vh-100 justify-content-center align-items-center"
    >
      <Stack gap={5} className="text-center d-flex align-items-center mt-5">
        <h1 className="text-secondary verify-email__alert d-flex align-items-center">
          <XCircle className="text-danger me-3" /> Erro na Verificação
        </h1>
        <Alert variant="danger">{errorMessage}</Alert>
        <Link
          to="/app/users/profile"
          className="btn btn-outline-secondary  d-flex align-items-center"
        >
          <Person className="me-2" /> Voltar para o Perfil
        </Link>
      </Stack>
    </Container>
  );
};

export default VerifyEmail;
