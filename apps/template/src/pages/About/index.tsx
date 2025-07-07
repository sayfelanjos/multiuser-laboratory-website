import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import image from "../../assets/images/image-800x400.jpg";
import CardsGrid from "../../components/CardsGrid";

const About = () => {
  return (
    <>
      <Container className="about__ctn">
        <h2 className="text-black text-center my-3">
          O Laboratório Multi Usuários - LMU
        </h2>
        <Row xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}>
          <Col>
            <Image src={image} className="w-100 d-block h-auto mb-3"></Image>
          </Col>
          <Col>
            <p className="text-black">
              O LMU Laboratório Multiusuário, de Caracterização de Materiais
              visa o estudo e caracterização de materiais e processos de
              fabricação, nas áreas de Engenharia de Manufatura e Materiais.
              Composto por equipamentos, técnicas e procedimentos de diversos
              laboratórios, possuindo como missão promover pesquisas
              interdisciplinares de ponta, colabora com projetos inovadores,
              apoiar o Plano de Desenvolvimento Institucional da Unicamp,
              potencializando o ensino, a pesquisa, a extensão e as relações
              entre a comunidade universitária e a iniciativa privada.
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <hr className="bg-black border-1 my-5" />
      </Container>
      <CardsGrid />
    </>
  );
};

export default About;
