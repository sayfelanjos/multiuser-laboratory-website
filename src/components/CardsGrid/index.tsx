import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import image from "../../assets/images/istockphoto-682025038-1024x1024.jpg";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const CardsGrid = () => {
  return (
    <Container className="cards-grid-container">
      <Row xs={1} sm={2} md={2} xl={3} lg={3} gap={3} className="g-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Button variant="dark">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardsGrid;
