import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HouseFill, EmojiFrown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "./_not-found.scss";

const NotFound: React.FC = () => {
  return (
    <Container className="overflow-auto h-100 pb-5">
      <Row>
        <Col className="d-flex flex-column align-items-center p-3 p-md-5">
          <h1 className="text-secondary not-found__alert">
            <EmojiFrown /> 404
          </h1>

          <h2 className="text-uppercase mt-5">Página Não Encontrada!</h2>

          <p className="mt-5 text-center">
            Oops! O endereço que você digitou não foi encontrado...
            <br />
            Ele pode ter sido deletado ou não existe. Verifique se você digitou
            corretamente.
          </p>

          <Link
            to="/home"
            className="btn btn-secondary d-flex align-items-center mt-3"
          >
            <HouseFill className="me-2" /> Ir para a Página Inicial
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
