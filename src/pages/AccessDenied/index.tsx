import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Ban, ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./_access-denied.scss";

const AccessDenied: React.FC = () => {
  return (
    <Container className="overflow-auto h-100 pb-5">
      <Row>
        <Col className="d-flex flex-column align-items-center p-3 p-md-5">
          <h1 className="text-danger access-denied__alert">
            <Ban /> 403
          </h1>

          <h2 className="text-uppercase mt-5">Acesso Restrito</h2>

          <p className="mt-5 text-center">
            Você não possui as permissões necessárias para visualizar esta
            página.
            <br />
            Caso acredite que isso seja um erro, por favor, contate um
            administrador do sistema.
          </p>

          <Link
            to="/home"
            className="btn btn-secondary d-flex align-items-center mt-3"
          >
            <ArrowLeft className="me-2" /> Ir para a Página Inicial
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessDenied;
