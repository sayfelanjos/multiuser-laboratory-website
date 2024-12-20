import React from "react";
import Container from "react-bootstrap/Container";
import ServiceHeader from "../../../components/ServiceHeader";
import image from "../../../assets/images/charpy-impact-test.jpeg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import CardsGrid from "../../../components/CardsGrid";

const CharpyImpactTest = () => {
  return (
    <>
      <Container fluid className="svc-page-content p-0">
        <ServiceHeader svcTitle="Ensaio de Impacto Charpy" svcImage={image} />
        <Container className="my-5">
          <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2}>
            <Col>
              <p className="text-black">
                O ensaio mede a quantidade de energia absorvida pelo impacto de
                um martelo/pêndulo de energia total conhecida, contra um corpo
                de prova padronizado em determinada temperatura. A energia
                absorvida até o rompimento do corpo de prova está relacionada à
                tenacidade do material e pode ser medida em diferentes
                temperaturas. A posição do corpo de prova e do entalhe devem ser
                criticamente avaliadas, para que o ensaio forneça resultados
                adequados e condizentes com a aplicação do componente. O ensaio
                de resistência ao impacto, além de determinar a energia
                absorvida, pode ser utilizado para se obter a curva de transição
                frágil-dúctil em materiais que apresentam esse fenômeno. Também
                pode ser utilizado para se obter estimativas indiretas da
                tenacidade do material.
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
          <hr className="bg-black border-1 my-5" />
          <CardsGrid />
        </Container>
      </Container>
    </>
  );
};

export default CharpyImpactTest;
