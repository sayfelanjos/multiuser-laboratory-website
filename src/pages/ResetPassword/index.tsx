import React, { useCallback } from "react";
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

const ResetPassword = () => {
  const { Formik } = formik;
  const userSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Email is required"),
  });

  type User = yup.InferType<typeof userSchema>;

  // Initial form values
  const initialValues: User = { email: "" };

  const onClickEnterButton = useCallback(async (value: User) => {
    sendPasswordResetEmail(auth, value.email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 signin-page__ctn"
    >
      <Container className="signin-page__form-ctn bg-light rounded-3">
        <Formik
          validationSchema={userSchema}
          initialValues={initialValues}
          onSubmit={onClickEnterButton}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Stack gap={3} className="p-3">
                <Row>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <h4 className="mb-3">Solicitar nova senha</h4>
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
                  <Container className="signin-page__button-ctn mb-3">
                    <Button variant="dark" type="submit" data-cy="enter-button">
                      Enviar
                    </Button>
                  </Container>
                </Row>
                <Row>
                  <Container className="signin-page__button-ctn mb-3">
                    <Link
                      to="/signin"
                      className="text-decoration-none text-dark d-flex justify-content-center align-items-center"
                    >
                      Voltar
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

export default ResetPassword;
