import React from "react";
import Hero from "../../components/Hero";
import CardsGrid from "../../components/CardsGrid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import placeholder from "../../assets/images/image-placeholder-500x500.svg";

const Home = () => {
  return (
    <>
      <Hero />
      <Container className="p-0">
        <Row
          className="justify-content-evenly bg-light"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
        >
          <Col
            className="d-flex justify-content-center p-0 p-md-3"
            // xs={{ span: 5, offset: 0 }}
            // sm={{ span: 5, offset: 0 }}
            md={{ span: 5 }}
            // lg={{ span: 5, offset: 0 }}
            // xl={{ span: 5, offset: 0 }}
            // xxl={{ span: 5, offset: 0 }}
          >
            <Image
              src={placeholder}
              // style={{ minWidth: "300px", minHeight: "300px" }}
              width="300"
              height="300"
            />
          </Col>
          <Col
            className="p-3"
            // xs={{ span: 7, offset: 5 }}
            // sm={{ span: 7, offset: 6 }}
            md={{ span: 7 }}
            // lg={{ span: 7, offset: 6 }}
            // xl={{ span: 7, offset: 6 }}
            // xxl={{ span: 7, offset: 6 }}
          >
            <h2>Nosso Laboratório</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              maiores molestias nulla officiis quas suscipit ullam voluptas.
              Blanditiis commodi consectetur dolorum eligendi fugit illum
              molestias, natus necessitatibus non, ratione, vel!
            </p>
          </Col>
        </Row>
        <Row>
          <Container
            fluid
            className="bg-light text-dark"
            style={{ height: "600px" }}
          >
            <Row>
              <Col>
                <h1>Setores Atendidos</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Image
                  src={placeholder}
                  // style={{ minWidth: "300px", minHeight: "300px" }}
                  width="300"
                  height="300"
                />
              </Col>
              <Col>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                  maiores molestias nulla officiis quas suscipit ullam voluptas.
                  Blanditiis commodi consectetur dolorum eligendi fugit illum
                  molestias, natus necessitatibus non, ratione, vel!
                </p>
              </Col>
            </Row>
          </Container>
        </Row>
        <Row>
          <Container
            fluid
            className="flex-grow-1 bg-dark text-white d-flex align-items-center p-0"
            style={{
              height: "600px",
            }}
          >
            <Col>
              <Image
                src={placeholder}
                // style={{ minWidth: "300px", minHeight: "300px" }}
                width="300"
                height="300"
              />
            </Col>
            <Col>
              <h1>Serviços</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                maiores molestias nulla officiis quas suscipit ullam voluptas.
                Blanditiis commodi consectetur dolorum eligendi fugit illum
                molestias, natus necessitatibus non, ratione, vel!
              </p>
            </Col>
          </Container>
        </Row>

        <Row>
          <Container
            fluid
            className="flex-grow-1 bg-light text-dark d-flex align-items-center p-0"
            style={{ height: "600px" }}
          >
            <Col>
              <Image
                src={placeholder}
                // style={{ minWidth: "300px", minHeight: "300px" }}
                width="300"
                height="300"
              />
            </Col>
            <Col>
              <h1>Galeria de fotos</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                maiores molestias nulla officiis quas suscipit ullam voluptas.
                Blanditiis commodi consectetur dolorum eligendi fugit illum
                molestias, natus necessitatibus non, ratione, vel!
              </p>
            </Col>
          </Container>
        </Row>
        <Row>
          <Container
            fluid
            className="flex-grow-1 bg-dark text-white d-flex align-items-center p-0"
            style={{ height: "600px" }}
          >
            <Col>
              <Image
                src={placeholder}
                // style={{ minWidth: "300px", minHeight: "300px" }}
                width="300"
                height="300"
              />
            </Col>
            <Col>
              <h1>Contatos</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                maiores molestias nulla officiis quas suscipit ullam voluptas.
                Blanditiis commodi consectetur dolorum eligendi fugit illum
                molestias, natus necessitatibus non, ratione, vel!
              </p>
            </Col>
          </Container>
        </Row>
        <Row>
          <Container
            fluid
            className="flex-grow-1 bg-white text-dark d-flex align-items-center p-0"
          >
            <CardsGrid />
          </Container>
        </Row>
      </Container>
    </>
  );
};

export default Home;
