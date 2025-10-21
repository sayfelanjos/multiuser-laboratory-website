import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HouseFill, EmojiFrown } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex flex-column align-items-center p-5">
          <h1 style={{ fontSize: "10rem" }}>
            <EmojiFrown /> 404
          </h1>

          <h2 className="text-uppercase mt-5">Página Não Encontrada!</h2>

          <p className="mt-5 text-center">
            Ooopa! O endereço que você digitou não foi encontrado...
            <br />
            Ele pode ter sido deletado ou não existe. Verifique se você digitou
            corretamente.
          </p>

          <Link
            to="/home"
            className="btn btn-secondary d-flex align-items-center mt-3"
          >
            <HouseFill className="me-2" /> Voltar para o Início
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
