import React from "react";
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

const SignUp = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 signup-page__ctn"
    >
      <Container className="signup-page__form-ctn bg-light rounded-3">
        <Form>
          <Stack gap={3} className="p-3">
            <Row>
              <Container className="d-flex justify-content-center align-items-center">
                <h4>Criar uma conta</h4>
              </Container>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Digite seu email" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Crie uma senha</Form.Label>
                <Form.Control type="password" placeholder="Crie uma senha" />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Confirme sua senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirme sua senha"
                />
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
      </Container>
    </Container>
  );
};

export default SignUp;
