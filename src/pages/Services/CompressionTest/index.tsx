import React from "react";
import Container from "react-bootstrap/Container";
import ServiceHeader from "../../../components/ServiceHeader";
import image from "../../../assets/images/compression-text.jpeg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardsGrid from "../../../components/CardsGrid";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

const CompressionTest = () => {
  return (
    <>
      <Container fluid className="svc-page-content p-0">
        <ServiceHeader svcTitle="Teste de Compressão" svcImage={image} />
        <Container className="p-0">
          <Container className="my-5">
            <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2}>
              <Col>
                <p className="text-black">
                  Ensaios de compressão são executados para caracterizar o
                  comportamento de um material quando exposto à pressão. Durante
                  o ensaio, uma amostra é submetida a uma carga de compressão
                  com o auxílio de placas de compressão ou ferramentas
                  específicas montadas sobre uma máquina universal para ensaios
                  para determinar diferentes características do material sendo
                  testado. Os dados do ensaio fornecem resultados em forma de um
                  diagrama tensão-deformação o qual demonstra, entre outros o
                  limite de elasticidade, o limite de proporcionalidade, o
                  limite de escoamento e, em alguns casos, a resistência à
                  compressão. Um ensaio de compressão no qual a amostra é
                  comprimida é no fundo o oposto de um ensaio de tração, no qual
                  a amostra é puxada pela força até a ruptura. Os ensaios podem
                  ser feitos em amostras de materiais preparadas ou nos próprios
                  componentes de tamanho original e/ou componentes feitos à
                  escala. Tipos comuns de ensaios de compressão são o ensaio de
                  recalcamento, o ensaio de flexão e o ensaio de mola.
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
          <Container>
            <hr className="bg-black border-1 my-5" />
          </Container>
          <CardsGrid />
        </Container>
      </Container>
    </>
  );
};

export default CompressionTest;
