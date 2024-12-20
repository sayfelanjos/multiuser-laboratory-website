import React from "react";
import Container from "react-bootstrap/Container";
import CardsGrid from "../../../components/CardsGrid";
import ServiceHeader from "../../../components/ServiceHeader";
import image from "../../../assets/images/tensile-test.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const TensileTest = () => {
  return (
    <>
      <Container fluid className="p-0">
        <ServiceHeader svcTitle="Ensaio de Tração" svcImage={image} />
        <Container className="my-5">
          <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2}>
            <Col>
              <p className="text-black">
                O ensaio de tração é um método de ensaio para ensaios mecânicos
                de materiais para a determinação de valores característicos de
                materiais. Ele é usado - dependendo do material - como método
                padrão em conformidade com a respectiva norma respectiva norma
                (ASTM, ABNT, DIN etc.) para determinação do limite de
                escoamento, da resistência à tração, da deformação na ruptura e
                outros valores característicos de materiais. Os ensaios de
                tração fazem parte no ensaio mecânico de materiais, ao lado da
                medição da dureza, dos ensaios mais frequentemente executados.
                Eles são utilizados para a caracterização do comportamento de
                resistência e de deformação quando exposto ao estresse por
                tração. No ensaio de tração uma amostra de material é esticada
                até a ruptura. Durante o ensaio de tração é feita a medição da
                força e da extensão da amostra, sendo plotados em um software
                para análises posteriores ou para comparações entre as amostras.
              </p>
              <Link to="/contact" className="btn btn-dark">
                Dúvidas? Contate-nos
              </Link>
            </Col>
            <Col>
              <Image
                src={image}
                className="d-none d-sm-none d-md-block w-100 h-auto"
              />
            </Col>
          </Row>
        </Container>
        {/*<Container>*/}
        {/*  <hr className="bg-black border-1 my-5" />*/}
        {/*</Container>*/}
        {/*<CardsGrid />*/}
      </Container>
    </>
  );
};

export default TensileTest;
