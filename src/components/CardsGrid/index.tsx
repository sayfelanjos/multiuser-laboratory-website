import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { cardsData } from "./cardsData";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import Divider from "antd/lib/divider";

const CardsGrid = () => {
  return (
    <Container>
      <Row
        xs={1}
        sm={2}
        md={2}
        lg={3}
        xl={3}
        xxl={3}
        className="g-4 justify-content-evenly"
      >
        {cardsData.map((card) => {
          return (
            <Col key={card.id} className="w-auto">
              <Link to={card.link} className="text-decoration-none">
                <Card style={{ width: "18rem" }} body={true}>
                  <Card.Img variant="top" src={card.image} />
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title className="link-primary fs-6">
                        {card.title}
                      </Card.Title>
                      <span className="link-primary">
                        <ArrowRightIcon />
                      </span>
                    </div>
                    <Divider className="border-primary" />
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card&apos;s content.
                    </Card.Text>
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
