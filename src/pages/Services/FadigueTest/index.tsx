import React from "react";
import Container from "react-bootstrap/Container";
import ServiceHeader from "../../../components/ServiceHeader";
import image from "../../../assets/images/tensile-test.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import CardsGrid from "../../../components/CardsGrid";

const FadigueTest = () => {
  return (
    <>
      <Container fluid className="svc-page-content p-0">
        <ServiceHeader svcTitle="Ensaio de Fadiga" svcImage={image} />
        <Container className="my-5">
          <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2}>
            <Col>
              <h5>Ensaio de Fadiga de baixo ciclo</h5>
              <p className="text-black">
                O ensaio de Low Cycle Fatigue (LCF) conforme ISO 12106 e ASTM
                E606 é um ensaio de fadiga no qual uma carga cíclica é simulada
                até a falha. O estresse no ensaio de Low Cycle Fatigue é
                composto por uma fase de deformação elástica e uma fase de
                deformação plástica. Enquanto na faixa elástica existe uma
                correlação linear entre tensão e deformação (Lei de Hook), na
                faixa plástica ela não é linear. A consequência disso é um loop
                de histerese. Os ensaios de Low Cycle Fatigue conforme ISO 12106
                / ASTM E606 são realizados com amplitude constante.
                Adicionalmente, tempos de espera podem ser inseridos para
                analisar também processos de fluência/ de relaxação. Como valor
                definido é utilizado um triângulo ou ou trapézio para tempos de
                espera. Para a simulação de cargas operacionais específicas
                também outros intervalos de deformação são possíveis. Dessa
                forma, também ensaios de Low Cycle Fatigue são realizados com
                uma vibração superimposta de frequência maior. A frequência do
                ensaio é normalmente inferior a / igual a 1 Hz.
              </p>
              <h5>Ensaio de Fadiga de Alto ciclo</h5>
              <p>
                No ensaio de fadiga são determinados o limite de fadiga e a
                resistência à fadiga de materiais ou componentes. Para tal,
                várias amostras são expostas à carga cíclica. O ensaio Wöhler é
                executado até que ocorra uma falha definida da amostra (ruptura,
                trinca). No ensaio Wöhler um número de ciclos (número limite de
                ciclos) é definido. Quando uma amostra alcança o número de
                ciclos limite sem falha detectável, ela será considerada como
                durável ou como amostra aprovada. Tensão média, tensão máxima e
                tensão mínima da carga cíclica são constantes para todos os
                ensaios de fadiga. Nos ensaios com a mesma curva de Wöhler é
                modificada apenas a tensão média ou apenas a relação entre a
                tensão máxima e a tensão mínima. Flexão
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
    </>
  );
};

export default FadigueTest;
