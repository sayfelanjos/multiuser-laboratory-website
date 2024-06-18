import React, { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import GoogleIcon from "../../assets/icons/GoogleIcon";
import MicrosoftIcon from "../../assets/icons/MicrosoftIcon";
import { useNavigate } from "react-router-dom";
import "./_signin-page.scss";
import { Link } from "react-router-dom";
import Divider from "antd/lib/divider";
import { signInUser } from "../../helpers/signInUser";

const SignIn = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const navigate = useNavigate();

  const onButtonClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        await signInUser(emailValue, passwordValue);
        navigate("/home");
      } catch (error) {
        throw new Error("Error on signing in!!!");
      }
    },
    [],
  );

  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailValue(event.target.value);
    },
    [],
  );

  const onPasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordValue(event.target.value);
    },
    [],
  );

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 signin-page__ctn"
    >
      <Container className="signin-page__form-ctn bg-light rounded-3">
        <Form>
          <Stack gap={3} className="p-3">
            <Row>
              <Container className="d-flex justify-content-center align-items-center">
                <h4>Acessar sua conta</h4>
              </Container>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Digite o seu email"
                  onChange={onEmailChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a sua senha"
                  onChange={onPasswordChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <span className="d-flex justify-content-center align-items-center mb-3">
                Esqueceu a sua senha?
                <Link to="#" className="ms-2">
                  Criar nova senha
                </Link>
              </span>
            </Row>
            <Row>
              <Container className="signin-page__button-ctn mb-3">
                <Button
                  variant="dark"
                  type="button"
                  disabled={!emailValue || !passwordValue}
                  onClick={onButtonClick}
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
              <Container className="signin-page__button-ctn">
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
      </Container>
    </Container>
  );
};

export default SignIn;
