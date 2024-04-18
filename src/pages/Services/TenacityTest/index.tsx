import React from "react";
import Container from "react-bootstrap/Container";
import ServiceHeader from "../../../components/ServiceHeader";
import image from "../../../assets/images/tenacity-test.jpeg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import CardsGrid from "../../../components/CardsGrid";

const TenacityTest = () => {
  return (
    <>
      <Container fluid className="svc-page-content">
        <ServiceHeader svcTitle="Teste de Tenacidade" svcImage={image} />
        <Container className="my-5">
          <Row xs={1} sm={1} md={2} lg={2} xl={2} xxl={2}>
            <Col>
              <h5>Ensaio de tenacidade a fratura CTOD</h5>
              <p className="text-black">
                O ensaio consiste em avaliar um corpo de prova com um entalhe de
                tamanho especificado de acordo com as normas (BS 7448-1, ASTM
                E1290 e ASTM E1820), verificando o quanto ele resiste até sua
                fratura total ocorrer. Em resumo, o ensaio de CTOD consiste no
                carregamento de um corpo de prova, em tração ou flexão,
                dependendo do tipo de corpo de prova, confeccionado com um
                entalhe e uma pré-trinca obtida por fadiga. É utilizado o
                controle de deslocamento com taxa constante. O objetivo é
                determinar o valor de CTOD característico associado ao material.
                Este ensaiado é apropriado para materiais que apresentem
                transição de comportamento dúctil-frágil, como os aços de
                estrutura ferrítica
              </p>
              <h5>Ensaio de tenacidade a fratura K1C</h5>
              <p>
                O fator de intensidade de tensão crítico K1C descreve a
                resistência do material ao crescimento da trinca. O fator de
                intensidade de tensão também é chamado de tenacidade da trinca
                ou tenacidade da fratura. A ASTM E399 descreve a determinação do
                valor característico do material da mecânica da fratura com
                carga cíclica e amplitude constante. O crescimento da fissura de
                uma material é descrito na curva de crescimento da fissura. Essa
                curva é subdivida em três segmentos: Segmento I: baixa
                velocidade de crescimento da trinca, valor inicial dKth onde o
                crescimento da trinca acabou de começar Segmento II: velocidade
                constante de crescimento da trinca, é descrita matematicamente
                por meio da reta de Paris, Crescimento da trinca por fadiga
                da/dN Segmento III: alta velocidade de crescimento da trinca,
                termina com a ruptura forçada, fator crítico de intensidade de
                tensão K1C A ASTM E399 para determinação do fator de intensidade
                de tensão crítico K1C se refere ao segmento III da curva de
                crescimento da trinca. A determinação K1C é normalmente feita
                com materiais quebradiços. Primeiramente é produzida uma trinca
                definida na amostra por meio de alimentação elétrica conforme
                ASTM E399. 2,5% antes de alcançar o comprimento de trinca
                definido a intensidade de tensão será reduzida. No passo
                subsequente, a amostra será puxada constantemente até a ruptura
                e até alcançar o valor KQ. Após o ensaio, o valor KQ apurado é
                colocado em relação à largura da amostra, ao comprimento da
                trinca e ao limite de elasticidade do material. Quando a relação
                está em conformidade com o critério de validade mínimo definido
                na norma, o valor KQ será declarado um valor K1C válido. O
                crescimento da trinca será determinado com o auxílio de um
                extensômetro de propagação de trinca adequado e com o método
                matemático de compliance. Além das amostras compactas (CT) muito
                utilizadas também poderão ser utilizadas amostras de flexão
                (SEB) para determinar a intensidade de tensão crítica K1C.
              </p>
              <Link to="/contact" className="btn btn-dark">
                Dúvidas? Contate-nos
              </Link>
            </Col>
            <Col>
              <Image src={image} className="d-block w-100 h-auto" />
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

export default TenacityTest;
