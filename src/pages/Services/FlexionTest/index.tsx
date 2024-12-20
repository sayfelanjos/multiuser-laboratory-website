import React from "react";
import Container from "react-bootstrap/Container";
import ServiceHeader from "../../../components/ServiceHeader";
import image from "../../../assets/images/flexion-test.jpeg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import CardsGrid from "../../../components/CardsGrid";

const FlexionTest = () => {
  return (
    <>
      <Container fluid className="svc-page-content p-0">
        <ServiceHeader svcTitle="Ensaio de Flexão" svcImage={image} />
        <Container className="my-5">
          <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2}>
            <Col>
              <p className="text-black">
                Dependendo do material podem ser detectadas diferentes
                características de material. Os resultados e/ou valores
                característicos do ensaio de flexão demonstram especialmente o
                comportamento do material junto à superfície da amostra. Em
                comparação aos ensaios de tração, as deflexões medidas são cerca
                de quatro vezes maiores que as mudanças de comprimento
                registradas no ensaio de tração. Distinguem-se 3 tipos de
                ensaios de flexão: Ensaios de flexão de 2 pontos Ensaios de
                flexão de 3 pontos Ensaios de flexão de 4 pontos No ensaio de
                flexão de 2 pontos, a amostra é fixada em uma extremidade e no
                lado livre, ela é submetida à carga de um pistão de ensaio. O
                dispositivo de flexão de 2 pontos é adequado para o ensaio de
                papel, papelão e películas. Desta forma, a rigidez à flexão é
                determinada de acordo com o método de barras e/ou da resistência
                à flexão em papel, papelão e caixa de papelão, por ex. conforme
                DIN 53121,ISO 5628 e DIN 19304, películas de plástico conforme
                DIN 53350 e têxteis revestidos. Dispositivo de flexão de 3
                pontos O dispositivo de carga consiste de dois apoios paralelos
                para a amostra e um cutelo que aplica a carga sobre a amostra de
                forma centralizada entre os apoios. Tanto os apoios quanto o
                cutelo devem ser alojados em mancais de forma fixa, giratória ou
                basculante, dependendo do requisito de ensaio (norma) de modo
                que o respectivo ensaio pode ser executado em conformidade com
                os requisitos. O ensaio é utilizado principalmente para
                materiais viscosos e elásticos. Para minimizar no ensaio as
                influências por fricção, os apoios podem ser alojados de forma
                giratória ao redor de seu eixo longitudinal. Para assegurar o
                paralelismo do cutelo e do apoio de flexão com a amostra, eles
                podem ser alojados de forma basculante.
              </p>
              <Link to="/contact" className="btn btn-dark">
                Dúvidas? Contate-nos
              </Link>
            </Col>
            <Col>
              <Image
                src={image}
                className="d-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block w-100 h-auto"
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

export default FlexionTest;
