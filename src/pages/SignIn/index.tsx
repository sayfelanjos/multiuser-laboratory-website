import React, { useCallback, useState, useEffect } from "react";
import {
  Form,
  Container,
  Stack,
  Alert,
  Row,
  Col,
  Button,
  InputGroup,
} from "react-bootstrap";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import MicrosoftIcon from "../../assets/icons/MicrosoftIcon";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Divider from "antd/lib/divider";
import { signInUser } from "../../helpers/signInUser";
import { signInWithGoogle } from "../../helpers/signInWithGoogle";
import { signInWithMicrosoft } from "../../helpers/signInWithMicrosoft";
import { Formik } from "formik";
import * as yup from "yup";
import "./_signin-page.scss";
import { FirebaseError } from "firebase/app";
import useBreakpoint from "../../hooks/getCurrentBreakpoint";
import {
  EyeFill,
  EyeSlashFill,
  ExclamationTriangle,
} from "react-bootstrap-icons";

const SignIn = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const previousPage = path.state?.from?.pathname || "/home";
  const breakpoint = useBreakpoint();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((v) => !v);
  const userSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
  });

  type User = yup.InferType<typeof userSchema>;

  // Initial form values
  const initialValues: User = { email: "", password: "" };

  // Verify signin process
  const [isSigningIn, setIsSigningIn] = useState(false);

  const onClickEnterButtonSingInWithPassword = useCallback(
    async (value: User) => {
      setShowAlert(false);
      if (isSigningIn) {
        return;
      }
      setIsSigningIn(true);
      try {
        await signInUser(value.email, value.password);
        navigate(previousPage, { replace: true });
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          // Handle Firebase Auth errors
          switch (error.code) {
            case "auth/invalid-credential": {
              setAlertMessage(
                "Credenciais inválidas! Verifique e tente novamente.",
              );
              setShowAlert(true);
              console.error(error.message);
              break;
            }
            case "auth/too-many-requests": {
              setAlertMessage(
                "O acesso foi bloqueado temporariamente devido a muitas tentativas. Você pode tentar novamente em alguns minutos ou trocar a sua senha para acessar a sua conta.",
              );
              setShowAlert(true);
              console.error(error.message);
              break;
            }
            default: {
              setAlertMessage("Ocorreu um erro inesperado");
              setShowAlert(true);
              console.error("Unknown error:", error.message);
              break;
            }
          }
        } else {
          console.error("Unknown non-Firebase error:", error);
        }
      } finally {
        setIsSigningIn(false);
      }
    },
    [navigate, previousPage, isSigningIn],
  );

  const onClickButtonSignInWithGoogle = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (isSigningIn) {
        return;
      }
      setIsSigningIn(true);
      try {
        await signInWithGoogle();
        navigate(previousPage, { replace: true });
      } catch (error) {
        console.error(error);
      } finally {
        setIsSigningIn(false);
      }
    },
    [navigate, previousPage, isSigningIn],
  );

  const onClickButtonSignInWithMicrosoft = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (isSigningIn) {
        return;
      }
      setIsSigningIn(true);
      try {
        await signInWithMicrosoft();
        navigate(previousPage, { replace: true });
      } catch (error) {
        console.error(error);
      } finally {
        setIsSigningIn(false);
      }
    },
    [navigate, previousPage, isSigningIn],
  );

  // CapsLock Alert Feature
  const [capsLockOn, setCapsLockOn] = useState<boolean>(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.getModifierState && event.getModifierState("CapsLock")) {
        setCapsLockOn(true);
      } else {
        setCapsLockOn(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center signin-page__ctn min-vh-100"
    >
      <Row className="p-0 m-0">
        <Col className="p-0 m-0">
          <Container
            className={`bg-light overflow-hidden ${breakpoint === "xs" || breakpoint === "sm" || breakpoint === "md" ? "min-vw-100 min-vh-100" : "rounded-3 signin-page__form-ctn my-3"}`}
          >
            <Formik
              validationSchema={userSchema}
              initialValues={initialValues}
              onSubmit={onClickEnterButtonSingInWithPassword}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Stack gap={3} className="p-3">
                    {/* Header */}
                    <Row>
                      <Container className="d-flex justify-content-center align-items-center flex-column">
                        <h4>Acessar sua conta</h4>
                        {showAlert && (
                          <Alert
                            variant="warning"
                            className="w-100 mb-0 mt-3"
                            data-cy="alert"
                          >
                            {alertMessage}
                          </Alert>
                        )}
                      </Container>
                    </Row>
                    {/* Email */}
                    <Row>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label column={true}>Email</Form.Label>
                        <Form.Control
                          spellCheck="false"
                          type="text"
                          name="email"
                          value={values.email}
                          placeholder="Digite o seu email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          data-cy="email-feedback"
                        >
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    {/* Password */}
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label column={true}>Senha</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            autoComplete="off"
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            value={values.password}
                            placeholder="Digite a sua senha"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.password && !!errors.password}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={togglePasswordVisibility}
                            tabIndex={-1}
                          >
                            {passwordShown ? <EyeSlashFill /> : <EyeFill />}
                          </Button>
                          <Form.Control.Feedback
                            type="invalid"
                            data-cy="password-feedback"
                          >
                            {errors.password}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Row>

                    {capsLockOn && (
                      <p className="text-danger">
                        <ExclamationTriangle />
                        <i className="text-danger ms-2">CapsLock Ativado!</i>
                      </p>
                    )}

                    {/* Reset Password Link */}
                    <Row>
                      <span className="d-flex justify-content-center align-items-center mb-3">
                        Esqueceu a sua senha?
                        <Link
                          to="/request-to-reset-password"
                          className="ms-2"
                          tabIndex={-1}
                        >
                          Criar nova senha
                        </Link>
                      </span>
                    </Row>
                    {/* Sign In Button */}
                    <Row>
                      <Container className="signin-page__button-ctn mb-3">
                        <Button
                          variant="dark"
                          type="submit"
                          data-cy="enter-button"
                        >
                          Entrar
                        </Button>
                      </Container>
                    </Row>
                    {/* Create Account Page Link */}
                    <Row>
                      <span className="d-flex justify-content-center align-items-center">
                        Não tem uma conta?
                        <Link to="/signup" className="ms-2" tabIndex={-1}>
                          Criar uma conta
                        </Link>
                      </span>
                    </Row>

                    <Divider>ou</Divider>

                    {/* Google Sign-In */}
                    <Row>
                      <Container className="signin-page__button-ctn">
                        <Button
                          variant="light"
                          type="button"
                          className="d-flex justify-content-center align-items-center border-1 border-opacity-10 border-black mb-3"
                          onClick={onClickButtonSignInWithGoogle}
                        >
                          <Stack gap={3} direction="horizontal">
                            <GoogleIcon />
                            Entrar com Google
                          </Stack>
                        </Button>
                      </Container>
                    </Row>

                    {/* Microsoft Sign-In */}
                    <Row>
                      <Container className="signin-page__button-ctn">
                        <Button
                          variant="light"
                          type="submit"
                          className="d-flex justify-content-center align-items-center border-1 border-opacity-10 border-black mb-3"
                          onClick={onClickButtonSignInWithMicrosoft}
                        >
                          <Stack gap={3} direction="horizontal">
                            <MicrosoftIcon />
                            Entrar com Microsoft
                          </Stack>
                        </Button>
                      </Container>
                    </Row>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
