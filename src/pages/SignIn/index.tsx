import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import MicrosoftIcon from "../../assets/icons/MicrosoftIcon";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Divider from "antd/lib/divider";
import { signInUser } from "../../helpers/signInUser";
import { signInWithGoogle } from "../../helpers/signInWithGoogle";
import { signInWithMicrosoft } from "../../helpers/signInWithMicrosoft";
import * as formik from "formik";
import * as yup from "yup";
import "./_signin-page.scss";
import { FirebaseError } from "firebase/app";
import useBreakpoint from "../../hooks/getCurrentBreakpoint";

const SignIn = () => {
  const navigate = useNavigate();
  const breakpoint = useBreakpoint();
  const { Formik } = formik;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const userSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&>=._-])[A-Za-z\d#@$!%*?&>=._-]{8,}$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      )
      .required("Senha é obrigatória"),
  });

  type User = yup.InferType<typeof userSchema>;

  // Initial form values
  const initialValues: User = { email: "", password: "" };

  const onClickEnterButton = useCallback(async (value: User) => {
    setShowAlert(false);
    try {
      await signInUser(value.email, value.password);
      navigate("/app/scheduler");
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
            console.error("Unknown error:", error.message);
            break;
          }
        }
      } else {
        console.error("Unknown non-Firebase error:", error);
      }
    }
  }, []);

  const onClickButtonSignInWithGoogle = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await signInWithGoogle();
      navigate("/app/scheduler");
    },
    [],
  );

  const onClickButtonSignInWithMicrosoft = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await signInWithMicrosoft();
      navigate("/app/scheduler");
    },
    [],
  );

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
              onSubmit={onClickEnterButton}
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
                    <Row>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label column={true}>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          placeholder="Digite o seu email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
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
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label column={true}>Senha</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          placeholder="Digite a sua senha"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          data-cy="password-feedback"
                        >
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <span className="d-flex justify-content-center align-items-center mb-3">
                        Esqueceu a sua senha?
                        <Link to="/request-to-reset-password" className="ms-2">
                          Criar nova senha
                        </Link>
                      </span>
                    </Row>
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
                    <Row>
                      <span className="d-flex justify-content-center align-items-center">
                        Não tem uma conta?
                        <Link to="/signup" className="ms-2">
                          Criar uma conta
                        </Link>
                      </span>
                    </Row>
                    <Divider>ou</Divider>
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
