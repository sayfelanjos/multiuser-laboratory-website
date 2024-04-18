import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { cardsData } from "./cardsData";

const CardsGrid = () => {
  return (
    <Container className="cards-grid-container">
      <Row xs={1} sm={2} md={2} xl={3} lg={3} className="g-4">
        {cardsData.map((card) => {
          return (
            <Col key={card.id}>
              <Link to={card.link} className="card-link">
                <Card>
                  <Card.Img variant="top" src={card.image} />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CardsGrid;
