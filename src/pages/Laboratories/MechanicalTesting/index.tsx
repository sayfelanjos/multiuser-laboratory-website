import React from "react";
import Container  from "react-bootstrap/Container";
import InfoPage from "../../../components/InfoPageLayout";

const lemData = [
  {
    title: "Controle de Qualidade",
    content:
      "Os testes mecânicos ajudam a garantir que materiais e componentes atendam às especificações e padrões exigidos. Isso é crucial para manter a qualidade e a consistência nos processos de fabricação.",
    img: require("../../../assets/images/lmu-images/quality-control-1024x393.jpg"),
    alt: "",
  },
  {
    title: "Segurança",
    content:
      "Ao entender as propriedades mecânicas dos materiais, os engenheiros podem projetar produtos que sejam seguros para uso. Os testes ajudam a prevenir falhas que poderiam levar a lesões ou acidentes.",
    img: require("../../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Avaliação de Desempenho",
    content:
      "Os testes mecânicos fornecem dados sobre como os materiais se comportarão sob diferentes cargas, tensões e condições ambientais. Essas informações são essenciais para projetar componentes que funcionarão corretamente em suas aplicações pretendidas.",
    img: require("../../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Seleção de Materiais",
    content:
      "Os testes ajudam na seleção do material adequado para uma aplicação específica. Diferentes materiais possuem propriedades mecânicas distintas, e escolher o material apropriado garante a durabilidade e o desempenho do produto final.",
    img: require("../../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Pesquisa e Desenvolvimento",
    content:
      "Os testes mecânicos são utilizados em P&D para desenvolver novos materiais e melhorar os existentes. Eles ajudam os pesquisadores a entender o comportamento dos materiais e tomar decisões informadas no design e processamento de materiais.",
    img: require("../../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Conformidade",
    content:
      "Muitas indústrias possuem normas regulatórias que materiais e produtos devem atender. Os testes mecânicos garantem que os produtos cumpram com essas regulamentações, o que pode ser essencial para a aceitação legal e no mercado.",
    img: require("../../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Análise de Falhas",
    content:
      "Quando um componente falha, os testes mecânicos podem ajudar a determinar a causa da falha. Essas informações são valiosas para prevenir falhas futuras e melhorar o design do produto.",
    img: require("../../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Manutenção Preditiva",
    content:
      "Para componentes que já estão em uso, os testes mecânicos podem prever falhas potenciais e permitir que a manutenção seja realizada antes que uma falha real ocorra, reduzindo assim o tempo de inatividade e os custos. De forma geral, os testes mecânicos são uma parte fundamental dos processos de engenharia e fabricação, pois garantem a confiabilidade, a segurança e o desempenho dos materiais e produtos.",
    img: require("../../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
];

const lemText = {
    name: "Laboratório de Ensaios mecânicos",
    description: "Descrição do Laboratório",
    whyLaboratory: `Os testes mecânicos são uma prática essencial utilizada para
              determinar as propriedades físicas e o comportamento de materiais
              e componentes sob várias condições.`
}

const MechanicalTesting = () => {
    return(
        <Container fluid className="p-5">
            <InfoPage  laboratoryText={lemText} sectionsData={lemData}/>
        </Container>
    );
};

export default MechanicalTesting