import React, { useCallback, useState, useEffect, ReactElement } from "react";
import {
  InputGroup,
  Container,
  Form,
  Row,
  Button,
  Stack,
  Alert,
  ListGroup,
} from "react-bootstrap";
import "./_signup-page.scss";
import { useNavigate, useLocation, Link } from "react-router-dom";
import MicrosoftIcon from "../../assets/icons/MicrosoftIcon";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import Divider from "antd/lib/divider";
import { signUpUserByEmailAndPassword } from "../../helpers/signUpUserByEmailAndPassword";
import { Formik } from "formik";
import * as yup from "yup";
import { FirebaseError } from "firebase/app";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { signInWithGoogle } from "../../helpers/signInWithGoogle";
import { signInWithMicrosoft } from "../../helpers/signInWithMicrosoft";

type passwordTestType = { text: string; testingRegEx: RegExp };
type alertTypes = "warning" | "success" | "danger" | "info" | "light" | "dark";

const passwordTests: passwordTestType[] = [
  { text: "8 caracteres", testingRegEx: /.{8,}/ },
  {
    text: "uma letra minúscula (a-z)",
    testingRegEx: /[a-z]/,
  },
  {
    text: "uma letra maiúscula (A-Z)",
    testingRegEx: /[A-Z]/,
  },
  { text: "um número (0-9)", testingRegEx: /\d/ },
  {
    text: "um caractere especial",
    testingRegEx: /[@#$%&`~^§><(){}[\].,;:!?_+*/|\\=-]/,
  },
];

const SignUp = () => {
  // Forms states:
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<ReactElement | string>("");
  const [alertVariant, setAlertVariant] = useState<alertTypes>("warning");
  const [isAccountCreatedSucessfully, setIsAccountCreatedSucessfully] =
    useState<boolean>(false);

  // Routing:
  const path = useLocation();
  const navigate = useNavigate();
  const previousPage = path.state?.from?.pathname || "/home";

  // Password visibility:
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((v) => !v);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordShown((v) => !v);

  // Rules for inputs filling.
  const userSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: passwordTests
      .reduce<yup.StringSchema>(
        (acc, { text, testingRegEx }) => acc.matches(testingRegEx, text),
        yup.string(),
      )
      .required("A senha é obrigatória"),
    confirmPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&>=._-])[A-Za-z\d#@$!%*?&>=._-]{8,}$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      )
      .required("Confirmar a senha é obrigatório.")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais."),
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

  type PassErr = string[];
  const [passwordErrors, setPasswordErrors] = useState<PassErr>([]);

  // Additional error treatment for passwords for allowing a list of unmatched
  // requirements instead of single error.
  const validatePassword = async (value: string) => {
    try {
      await userSchema.validate({ password: value }, { abortEarly: false });
      setPasswordErrors([]);
    } catch (err) {
      console.log(err);
      const newErrors: PassErr = [];
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((e) => {
          if (e.path === "password") {
            newErrors.push(e.message);
          }
        });
      }
      setPasswordErrors(newErrors);
    }
  };

  const onClickButtonSignInWithGoogle = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        await signInWithGoogle();
        navigate(previousPage, { replace: true });
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const onClickButtonSignInWithMicrosoft = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      try {
        await signInWithMicrosoft();
        navigate(previousPage, { replace: true });
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const [capsLockOn, setCapsLockOn] = useState<boolean>(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.getModifierState && event.getModifierState("CapsLock")) {
        setCapsLockOn(true);
      } else {
        setCapsLockOn(false);
      }
      console.log("hit:", event.key);
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
      className="d-flex justify-content-center align-items-center min-vh-100 signup-page__ctn"
    >
      <Container className="signup-page__form-ctn bg-light rounded-3 my-3">
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
            <Form
              onSubmit={(e) => {
                validatePassword(values.password);
                handleSubmit(e);
              }}
            >
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
                    {/* Email */}
                    <Row>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label column={true}>Email</Form.Label>
                        <Form.Control
                          spellCheck="false"
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
                    {/* Create Password */}
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label column={true}>Crie uma senha</Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            autoComplete="off"
                            type={passwordShown ? "text" : "password"}
                            placeholder="Crie uma senha"
                            name="password"
                            value={values.password}
                            onChange={(e) => {
                              validatePassword(e.target.value);
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            isValid={touched.password && !errors.password}
                            isInvalid={touched.password && !!errors.password}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={togglePasswordVisibility}
                            tabIndex={-1}
                          >
                            {passwordShown ? <EyeSlashFill /> : <EyeFill />}
                          </Button>
                          <Form.Control.Feedback type="invalid">
                            <ListGroup>
                              {passwordErrors?.map((message, index) => (
                                <li key={index}>
                                  <span>{message}</span>
                                </li>
                              ))}
                            </ListGroup>
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Row>
                    {/* Confirm Password */}
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPasswordConfirm"
                      >
                        <Form.Label column={true}>
                          Confirme sua senha
                        </Form.Label>
                        <InputGroup hasValidation>
                          <Form.Control
                            autoComplete="off"
                            type={confirmPasswordShown ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            isValid={
                              touched.confirmPassword && !errors.confirmPassword
                            }
                            isInvalid={
                              touched.confirmPassword &&
                              !!errors.confirmPassword
                            }
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={toggleConfirmPasswordVisibility}
                            tabIndex={-1}
                          >
                            {confirmPasswordShown ? (
                              <EyeSlashFill />
                            ) : (
                              <EyeFill />
                            )}
                          </Button>
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                    </Row>

                    {capsLockOn && (
                      <i className="text-danger">* CapsLock Ativado!</i>
                    )}

                    {/* Create Account Button */}
                    <Row>
                      <Container className="signup-page__button-ctn">
                        <Button variant="dark" type="submit" className="mb-3">
                          Criar
                        </Button>
                      </Container>
                    </Row>
                    {/* Sign-in page Link */}
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

                {/* Google Sign-Up */}
                <Row>
                  <Container className="signup-page__button-ctn">
                    <Button
                      variant="light"
                      type="submit"
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

                {/* Microsoft Sign-Up */}
                <Row>
                  <Container className="signup-page__button-ctn">
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
    </Container>
  );
};

export default SignUp;
