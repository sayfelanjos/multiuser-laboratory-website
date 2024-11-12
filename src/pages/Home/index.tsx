import React from "react";
import Hero from "../../components/Hero";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import placeholder from "../../assets/images/pexels-mikhail-nilov-9242841.jpg";

const Home = () => {
  return (
    <>
      <Hero />
      <Container fluid className="p-0">
        <Row
          className="justify-content-evenly bg-light"
          xs={12}
          sm={8}
          md={8}
          lg={12}
          xl={12}
          xxl={12}
        >
          <Col className="d-flex justify-content-center p-0 p-md-3">
            <Image
              src={placeholder}
              alt="Mechanical Laboratory"
              height="500px"
              rounded
            />
          </Col>
          <Col className="p-3 m-auto">
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                maiores molestias nulla officiis quas suscipit ullam voluptas.
                Blanditiis commodi consectetur dolorum eligendi fugit illum
                molestias, natus necessitatibus non, ratione, vel!
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                maiores molestias nulla officiis quas suscipit ullam voluptas.
                Blanditiis commodi consectetur dolorum eligendi fugit illum
                molestias, natus necessitatibus non, ratione, vel!
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                maiores molestias nulla officiis quas suscipit ullam voluptas.
                Blanditiis commodi consectetur dolorum eligendi fugit illum
                molestias, natus necessitatibus non, ratione, vel!
              </p>
            </Col>
          </Container>
        </Row>
        <Row
          className="justify-content-evenly bg-light"
          xs={12}
          sm={8}
          md={8}
          lg={12}
          xl={12}
          xxl={12}
        >
          <Col className="p-3 mx-5 my-auto">
            <h2>Setores Atendidos</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              maiores molestias nulla officiis quas suscipit ullam voluptas.
              Blanditiis commodi consectetur dolorum eligendi fugit illum
              molestias, natus necessitatibus non, ratione, vel!
            </p>
          </Col>
          <Col className="d-flex justify-content-center p-0 p-md-3">
            <Image src={placeholder} rounded height="500px" />
          </Col>
        </Row>
        {/*<Row>*/}
        {/*  <Container*/}
        {/*    fluid*/}
        {/*    className="flex-grow-1 bg-light text-dark d-flex align-items-center p-0"*/}
        {/*    style={{ height: "600px" }}*/}
        {/*  >*/}
        {/*    <Col>*/}
        {/*      <Image*/}
        {/*        src={placeholder}*/}
        {/*        // style={{ minWidth: "300px", minHeight: "300px" }}*/}
        {/*        width="300"*/}
        {/*        height="300"*/}
        {/*      />*/}
        {/*    </Col>*/}
        {/*    <Col>*/}
        {/*      <h1>Galeria de fotos</h1>*/}
        {/*      <p>*/}
        {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad*/}
        {/*        maiores molestias nulla officiis quas suscipit ullam voluptas.*/}
        {/*        Blanditiis commodi consectetur dolorum eligendi fugit illum*/}
        {/*        molestias, natus necessitatibus non, ratione, vel!*/}
        {/*      </p>*/}
        {/*    </Col>*/}
        {/*  </Container>*/}
        {/*</Row>*/}
        {/*<Row>*/}
        {/*  <Container*/}
        {/*    fluid*/}
        {/*    className="flex-grow-1 bg-dark text-white d-flex align-items-center p-0"*/}
        {/*    style={{ height: "600px" }}*/}
        {/*  >*/}
        {/*    <Col>*/}
        {/*      <Image*/}
        {/*        src={placeholder}*/}
        {/*        // style={{ minWidth: "300px", minHeight: "300px" }}*/}
        {/*        width="300"*/}
        {/*        height="300"*/}
        {/*      />*/}
        {/*    </Col>*/}
        {/*    <Col>*/}
        {/*      <h1>Contatos</h1>*/}
        {/*      <p>*/}
        {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad*/}
        {/*        maiores molestias nulla officiis quas suscipit ullam voluptas.*/}
        {/*        Blanditiis commodi consectetur dolorum eligendi fugit illum*/}
        {/*        molestias, natus necessitatibus non, ratione, vel!*/}
        {/*      </p>*/}
        {/*    </Col>*/}
        {/*  </Container>*/}
        {/*</Row>*/}
        {/*<Row>*/}
        {/*  <Container*/}
        {/*    fluid*/}
        {/*    className="flex-grow-1 bg-white text-dark d-flex align-items-center p-3"*/}
        {/*  >*/}
        {/*    <CardsGrid />*/}
        {/*  </Container>*/}
        {/*</Row>*/}
      </Container>
    </>
  );
};

export default Home;
