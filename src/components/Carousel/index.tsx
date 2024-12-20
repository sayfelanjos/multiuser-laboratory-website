import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import placeholder from "../../assets/images/pexels-mikhail-nilov-9242841.jpg";
import Row from "react-bootstrap/Row";

const Carousel = () => {
  return (
    <Row>
      <Container
        fluid
        className="flex-grow-1 bg-dark text-white d-flex align-items-center p-0"
        style={{
          height: "600px",
        }}
      >
        <Col className="text-center p-5">
          <Image
            src={placeholder}
            // style={{ minWidth: "300px", minHeight: "300px" }}
            width="196px"
            height="196px"
            roundedCircle
          />
          <h1>Serviços</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad maiores
            molestias nulla officiis quas suscipit ullam voluptas. Blanditiis
            commodi consectetur dolorum eligendi fugit illum molestias, natus
            necessitatibus non, ratione, vel!
          </p>
        </Col>
        <Col className="text-center p-5">
          <Image
            src={placeholder}
            // style={{ minWidth: "300px", minHeight: "300px" }}
            width="196px"
            height="196px"
            roundedCircle
          />
          <h1>Serviços</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad maiores
            molestias nulla officiis quas suscipit ullam voluptas. Blanditiis
            commodi consectetur dolorum eligendi fugit illum molestias, natus
            necessitatibus non, ratione, vel!
          </p>
        </Col>
        <Col className="text-center p-5">
          <Image
            src={placeholder}
            // style={{ minWidth: "300px", minHeight: "300px" }}
            width="196px"
            height="196px"
            roundedCircle
          />
          <h1>Serviços</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad maiores
            molestias nulla officiis quas suscipit ullam voluptas. Blanditiis
            commodi consectetur dolorum eligendi fugit illum molestias, natus
            necessitatibus non, ratione, vel!
          </p>
        </Col>
      </Container>
    </Row>
  );
};

export default Carousel;
