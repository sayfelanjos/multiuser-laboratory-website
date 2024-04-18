import React from "react";
import Container from "react-bootstrap/Container";
import CardsGrid from "../../../components/CardsGrid";
import ServiceHeader from "../../../components/ServiceHeader";
import image from "../../../assets/images/image-1600x500.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TensileTest = () => {
  return (
    <>
      <Container fluid className="svc-page-content">
        <ServiceHeader svcTitle="Welcome to our Service!" svcImage={image} />
        <Row>
          <Col>
            <h1>Teste de Tração</h1>
            <p>This is the service page.</p>
          </Col>
        </Row>
      </Container>
      <CardsGrid />
    </>
  );
};

export default TensileTest;
