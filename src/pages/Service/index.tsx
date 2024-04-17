import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardsGrid from "../../components/CardsGrid";
import ServiceBanner from "../../components/ServiceBanner";

const Service = () => {
  return (
    <>
      <Container fluid className="service-page-content">
        <ServiceBanner />
        <Row>
          <Col>
            <h1>Service Page</h1>
            <p>This is the service page.</p>
          </Col>
        </Row>
      </Container>
      <CardsGrid />
    </>
  );
};

export default Service;
