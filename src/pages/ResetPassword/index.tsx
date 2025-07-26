import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import Alert from "react-bootstrap/Alert";
import "./_reset-password.scss";
import { useSearchParams } from "react-router-dom";
import { auth } from "../../firebase";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import Image from "react-bootstrap/Image";
import check from "../../assets/images/check.png";
import { signInUser } from "../../helpers/signInUser";

const ResetPassword = () => {
  const route = useLocation();
  const previousPage = route.state?.from?.pathname || "/home";
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [searchParams] = useSearchParams();
  const [accountEmail, setAccountEmail] = useState("");
  const [count, setCount] = useState<number>(10);
  const [showCount, setShowCount] = useState<boolean>(false);
  const actionCode = searchParams.get("oobCode");
  const [isButtonActive, setIsButtonActive] = useState<boolean>(true);
  const navigate = useNavigate();
  const [isPasswordChangedSucessfully, setIsPasswordChangedSucessfully] =
    useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [alertMessage, setAlertMessage] = useState<string>("");
  const { Formik } = formik;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [validated, setValidated] = useState(false);
  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&>=._-])[A-Za-z\d#@$!%*?&>=._-]{8,}$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      )
      .required("Nova senha é obrigatório"),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&>=._-])[A-Za-z\d#@$!%*?&>=._-]{8,}$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      )
      .required("Confirmar a senha é obrigatório"),
  });

  type ResetPasswordType = yup.InferType<typeof resetPasswordSchema>;

  // Initial form values
  const initialValues: ResetPasswordType = { password: "", newPassword: "" };
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    verifyPasswordResetCode(auth, actionCode as string)
      .then((email) => {
        setAccountEmail(email);
      })
      .catch((error) => {
        console.error(error.message);
        setAlertMessage(
          "Usuário não encontrado! Tente novamente com um email válido.",
        );
        setShowAlert(true);
        setIsButtonActive(false);
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
      });
  }, [actionCode]);

  const handleOnSubmit = useCallback(
    (value: ResetPasswordType) => {
      setValidated(true);
      if (value.password !== value.newPassword) {
        setAlertMessage("As senhas devem ser iguais!");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        // Save the new password.
        confirmPasswordReset(auth, actionCode as string, value.password)
          .then(async (resp) => {
            setIsPasswordChangedSucessfully(true);
            if(isSigningIn){ 
              return ;
            }
            setIsSigningIn(true);
            // Password reset has been confirmed and new password updated.
            try {
              await signInUser(accountEmail, value.password);
              setShowCount(true);
              const timer = setInterval(() => {
                setCount((prevCount) => {
                  prevCount--;
                  if (prevCount === 0) {
                    clearInterval(timer);
                    navigate(previousPage, {replace: true});
                  }
                  return prevCount;
                });
              }, 1000);
            } catch(error) {
              console.error(error);
            } finally {
              setIsSigningIn(false);
            }
          })
          .catch(function (error) {
            console.error(error.message);
            setAlertMessage(
              "Usuário não encontrado! Tente novamente com um email válido.",
            );
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
            // Error occurred during confirmation. The code might have expired or the
            // password is too weak.
          });
      }
    },
    [accountEmail, count],
  );

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 reset-password__ctn"
    >
      <Container className="reset-password__form-ctn bg-light rounded-3">
        <Formik
          validationSchema={resetPasswordSchema}
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
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Stack gap={3} className="p-3">
                {isPasswordChangedSucessfully ? (
                  <Row>
                    <Container>
                      <Container className="d-flex justify-content-evenly align-items-center mb-3">
                        <Image
                          className="me-2"
                          src={check}
                          alt="Successful check"
                          width="40"
                          height="40"
                        />
                        <h5 className="m-0">
                          Sua senha foi atualizada com sucesso!
                        </h5>
                      </Container>
                    </Container>
                  </Row>
                ) : (
                  <>
                    <Row>
                      <Container className="d-flex justify-content-center align-items-center flex-column">
                        <h4 className="m-3">Criar nova senha</h4>
                        {accountEmail && (
                          <p className="text-center text-bg-secondary p-1 mb-0 w-100">
                            {accountEmail}
                          </p>
                        )}
                        {showAlert && (
                          <Alert
                            variant="danger"
                            className="w-100 mb-0 mt-3"
                            data-cy="alert"
                          >
                            {alertMessage}
                          </Alert>
                        )}
                      </Container>
                    </Row>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupPassword"
                      >
                        <Form.Label column={true}>Nova senha</Form.Label>
                        <Form.Control
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          placeholder="Insira sua nova senha"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          data-cy="newPassword-feedback"
                        >
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group
                        className="mb-3"
                        controlId="formGroupNewPassword"
                      >
                        <Form.Label column={true}>
                          Confirme sua senha
                        </Form.Label>
                        <Form.Control
                          type={passwordVisible ? "text" : "password"}
                          name="newPassword"
                          placeholder="Digite sua senha novamente"
                          onChange={handleChange}
                          value={values.newPassword}
                          isValid={touched.newPassword && !errors.newPassword}
                          isInvalid={
                            touched.newPassword && !!errors.newPassword
                          }
                          onBlur={handleBlur}
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          data-cy="newPassword-feedback"
                        >
                          {errors.newPassword}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Container className="reset-password__button-ctn mb-3">
                        <Button
                          variant="dark"
                          type="submit"
                          data-cy="enter-button"
                          disabled={!isButtonActive}
                        >
                          Mudar senha
                        </Button>
                      </Container>
                    </Row>
                  </>
                )}
                <Row>
                  <Container className="reset-password__button-ctn mb-3">
                    <Link
                      to="#"
                      onClick={() => {
                        isPasswordChangedSucessfully
                          ? "/home"
                          : "/signin"
                      }}
                      className={`${isPasswordChangedSucessfully ? "btn-dark" : "reset-password__back-link text-dark"} btn text-decoration-none d-flex justify-content-center align-items-center mb-3`}
                    >
                      {isPasswordChangedSucessfully
                        ? `Continuar para o LMU`
                        : "Voltar para o login"}
                    </Link>
                    {showCount && (
                      <span className="w-100 text-center text-bg-info rounded-2 p-1">
                        Redirecionando para a aplicação em {count}
                      </span>
                    )}
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

export default ResetPassword;
