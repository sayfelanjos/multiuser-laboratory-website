import React, { useCallback, useState, ReactElement } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "./_signup-page.scss";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import MicrosoftIcon from "../../assets/icons/MicrosoftIcon";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import Divider from "antd/lib/divider";
import { signUpUserByEmailAndPassword } from "../../helpers/signUpUserByEmailAndPassword";
import * as formik from "formik";
import * as yup from "yup";
import { FirebaseError } from "firebase/app";
import Alert from "react-bootstrap/Alert";

const SignUp = () => {
  const { Formik } = formik;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<ReactElement | string>("");
  const [alertVariant, setAlertVariant] = useState<
    "warning" | "success" | "danger" | "info" | "light" | "dark"
  >("warning");
  const [isAccountCreatedSucessfully, setIsAccountCreatedSucessfully] =
    useState<boolean>(false);
  const userSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&>=._-])[A-Za-z\d#@$!%*?&>=._-]{8,}$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      )
      .required("Senha é obrigatória"),
    confirmPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&>=._-])[A-Za-z\d#@$!%*?&>=._-]{8,}$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      )
      .required("Confirmar a senha é obrigatório"),
  });

  type User = yup.InferType<typeof userSchema>;

  // Initial form values
  const initialValues: User = { email: "", password: "", confirmPassword: "" };

  const handleOnSubmit = useCallback(async (values: User) => {
    try {
      if (values.password !== values.confirmPassword) {
        setAlertMessage("As senhas devem ser iguais!");
        setShowAlert(true);
      } else {
        await signUpUserByEmailAndPassword(values.email, values.password);
        setAlertMessage("Sua conta foi criada com sucesso!");
        setAlertVariant("success");
        setIsAccountCreatedSucessfully(true);
        setShowAlert(true);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        // Handle Firebase Auth errors
        switch (error.code) {
          case "auth/email-already-in-use": {
            setShowAlert(true);
            setAlertVariant("warning");
            setAlertMessage(
              <p>
                Email já cadastrado! Caso tenha esquecido sua senha, click{" "}
                <Link to="/request-to-reset-password" className="link-warning">
                  aqui
                </Link>{" "}
                para criar uma nova senha.
              </p>,
            );
            console.error(error.message);
            break;
          }
          default: {
            console.error("Unknown error:", error.message);
            break;
          }
        }
      }
    }
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 signup-page__ctn"
    >
      <Container className="signup-page__form-ctn bg-light rounded-3">
        <Formik
          validationSchema={userSchema}
          initialValues={initialValues}
          onSubmit={handleOnSubmit}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Stack gap={3} className="p-3">
                <Row>
                  <Container className="d-flex justify-content-center align-items-center flex-column">
                    <h4>Criar uma conta</h4>
                    {showAlert && (
                      <Alert
                        variant={alertVariant}
                        className="w-100 mb-0 mt-3"
                        data-cy="alert"
                      >
                        {alertMessage}
                      </Alert>
                    )}
                  </Container>
                </Row>
                {isAccountCreatedSucessfully ? (
                  <Link to="/signin" className="btn btn-dark">
                    Voltar para login
                  </Link>
                ) : (
                  <>
                    <Row>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label column={true}>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Digite seu email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label column={true}>Crie uma senha</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Crie uma senha"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label column={true}>
                          Confirme sua senha
                        </Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirme sua senha"
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={
                            touched.confirmPassword && !errors.confirmPassword
                          }
                          isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Container className="signup-page__button-ctn">
                        <Button variant="dark" type="submit" className="mb-3">
                          Criar
                        </Button>
                      </Container>
                    </Row>
                    <Row>
                      <span className="d-flex justify-content-center align-items-center">
                        Já tem uma conta?
                        <Link to="/signin" className="ms-2">
                          Entre aqui
                        </Link>
                      </span>
                    </Row>
                  </>
                )}
                <Divider>ou</Divider>
                <Row>
                  <Container className="signup-page__button-ctn">
                    <Button
                      variant="light"
                      type="submit"
                      className="d-flex justify-content-center align-items-center border-1 border-opacity-10 border-black mb-3"
                    >
                      <Stack gap={3} direction="horizontal">
                        <GoogleIcon />
                        Entrar com Google
                      </Stack>
                    </Button>
                  </Container>
                </Row>
                <Row>
                  <Container className="signup-page__button-ctn">
                    <Button
                      variant="light"
                      type="submit"
                      className="d-flex justify-content-center align-items-center border-1 border-opacity-10 border-black mb-3"
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
    </Container>
  );
};

export default SignUp;
