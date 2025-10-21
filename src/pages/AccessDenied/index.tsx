import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Ban, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const AccessDenied: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex flex-column align-items-center p-5">
          <h1 className="text-danger" style={{ fontSize: "10rem" }}>
            <Ban /> 403
          </h1>

          <h2 className="text-uppercase mt-5">Acesso Negado!</h2>

          <p className="mt-5 text-center">
            Desculpe... Você não tem as permissões necessárias para acessar essa
            página.
            <br />
            Se você acredita que isso é um erro, procure um administrador.
          </p>

          <Link
            to="/home"
            className="btn btn-secondary d-flex align-items-center mt-3"
          >
            <ArrowLeft className="me-2" /> Voltar para o Início
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessDenied;
