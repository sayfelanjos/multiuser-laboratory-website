import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import "./_request-to-reset-password.scss";
import Spinner from "react-bootstrap/Spinner";
import Image from "react-bootstrap/Image";
import check from "../../assets/images/check.png";

const RequestToResetPassword = () => {
  const { Formik } = formik;
  const userSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email is required"),
  });
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
  const [isEmailSentSuccessfully, setEmailSentSuccessfully] =
    useState<boolean>(false);

  type User = yup.InferType<typeof userSchema>;

  // Initial form values
  const initialValues: User = { email: "" };

  const onClickEnterButton = useCallback(async (value: User) => {
    sendPasswordResetEmail(auth, value.email)
      .then(() => {
        setIsEmailSending(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    setTimeout(() => {
      setIsEmailSending(false);
      setEmailSentSuccessfully(true);
    }, 1000);
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 request-to-reset-password__ctn"
    >
      <Container className="request-to-reset-password__form-ctn bg-light rounded-3">
        <Formik
          validationSchema={userSchema}
          initialValues={initialValues}
          onSubmit={onClickEnterButton}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Stack gap={3} className="p-3">
                {isEmailSentSuccessfully ? (
                  <Container>
                    <Container className="d-flex justify-content-evenly align-items-center mb-3">
                      <Image
                        className="me-2"
                        src={check}
                        alt="Successful check"
                        width="40"
                        height="40"
                      />
                      <h5 className="m-0">Email enviado com sucesso!</h5>
                    </Container>
                    <p className="text-center m-0 text-bg-secondary p-2">
                      Abra o seu email e click no link para redefinir sua senha.
                    </p>
                  </Container>
                ) : (
                  <>
                    <Row>
                      <Form.Group className="mb-3" controlId="formGroupEmail">
                        <h4 className="mb-3 text-center">
                          Redifinir sua senha
                        </h4>
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          placeholder="Digite o seu email"
                          onChange={handleChange}
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
                      <Container className="request-to-reset-password__button-ctn mb-3">
                        <p className="text-center text-bg-secondary p-2">
                          Nós iremos enviar um email com um link para
                          redefinição de senha.
                        </p>
                        <Button
                          variant="dark"
                          type="submit"
                          data-cy="enter-button"
                        >
                          {isEmailSending ? (
                            <span className="mx-2">
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              <span className="ms-3">Enviando...</span>
                            </span>
                          ) : (
                            <span className="mx-5">Enviar</span>
                          )}
                        </Button>
                      </Container>
                    </Row>
                  </>
                )}
                <Row>
                  <Container className="request-to-reset-password__button-ctn mb-3">
                    <Link
                      to="/signin"
                      className="request-to-reset-password__back-link btn text-decoration-none text-dark d-flex justify-content-center align-items-center"
                    >
                      Voltar para o login
                    </Link>
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

export default RequestToResetPassword;
