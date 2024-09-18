import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import Alert from "react-bootstrap/Alert";
import "./_reset-password.scss";

const ResetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const { Formik } = formik;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [validated, setValidated] = useState(false);
  const resetPasswordSchema = yup.object().shape({
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&>=])[A-Za-z\d@$!%*?&>=]{8,}$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      )
      .required("Nova senha é obrigatório"),
    newPassword: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&>=])[A-Za-z\d@$!%*?&>=]{8,}$/,
        "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.",
      )
      .required("Confirmar a senha é obrigatório"),
  });

  type ResetPasswordType = yup.InferType<typeof resetPasswordSchema>;

  // Initial form values
  const initialValues: ResetPasswordType = { password: "", newPassword: "" };

  const handleOnSubmit = useCallback((value: ResetPasswordType) => {
    if (value.password !== value.newPassword) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    setValidated(true);
  }, []);

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
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Stack gap={3} className="p-3">
                <Row>
                  <Container className="d-flex justify-content-center align-items-center flex-column">
                    <h4>Acessar sua conta</h4>
                    {showAlert && (
                      <Alert
                        variant="danger"
                        className="w-100 mb-0 mt-3"
                        data-cy="alert"
                      >
                        As senhas devem ser iguais!
                      </Alert>
                    )}
                  </Container>
                </Row>
                <Row>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label column={true}>Nova senha</Form.Label>
                    <Form.Control
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Insira sua nova senha"
                      value={values.password}
                      onChange={handleChange}
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
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label column={true}>Confirmar sua senha</Form.Label>
                    <Form.Control
                      type={passwordVisible ? "text" : "password"}
                      name="newPassword"
                      placeholder="Digite sua senha novamente"
                      onChange={handleChange}
                      value={values.newPassword}
                      isValid={touched.newPassword && !errors.newPassword}
                      isInvalid={touched.newPassword && !!errors.newPassword}
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
                    <Button variant="dark" type="submit" data-cy="enter-button">
                      Mudar senha
                    </Button>
                  </Container>
                </Row>
                <Row>
                  <Container className="reset-password__button-ctn mb-3">
                    <Link
                      to="/signin"
                      className="reset-password__back-link btn text-decoration-none text-dark d-flex justify-content-center align-items-center"
                    >
                      Cancelar
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
