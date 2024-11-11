import React from "react";
import Hero from "../../components/Hero";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import placeholder from "../../assets/images/pexels-mikhail-nilov-9242841.jpg";
import CardsGrid from "../../components/CardsGrid";
import Carousel from "../../components/Carousel";

// TODO Section options: Norms, KPIs

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
              O LMU, Laboratório Multiusuário de Caracterização de Materiais,
              visa o estudo e caracterização de materiais e processos de
              fabricação, nas áreas de Engenharia de Manufatura e Materiais.
              Composto por equipamentos, técnicas e procedimentos de diversos
              laboratórios, possuindo como missão promover pesquisas
              interdisciplinares de ponta, colabora com projetos inovadores,
              apoiando o Plano de Desenvolvimento Institucional da Unicamp,
              potencializando o ensino, a pesquisa, a extensão e as relações
              entre a comunidade universitária e a iniciativa privada.
            </p>
          </Col>
        </Row>
        <Carousel />
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
