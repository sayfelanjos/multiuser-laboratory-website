import React from "react";
import Hero from "../../components/Hero";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import CardsGrid from "../../components/CardsGrid";
import Divider from "antd/lib/divider";
import { laboratoryCardEnum } from "../../components/CardsGrid/cardsData";
import InfoPage from "../../components/InfoPageLayout";

const lmuData = [
  {
    title: "Missão",
    content:
      "O LMU Laboratório Multiusuário, de Caracterização de Materiais visa o estudo e caracterização de materiais e processos de fabricação, nas áreas de Engenharia de Manufatura e Materiais. Composto por equipamentos, técnicas e procedimentos de diversos laboratórios, possuindo como missão promover pesquisas interdisciplinares de ponta, colabora com projetos inovadores, apoiar o Plano de Desenvolvimento Institucional da Unicamp, potencializando o ensino, a pesquisa, a extensão e as relações entre a comunidade universitária e a iniciativa privada.",
    img: require("../../assets/images/lmu-images/quality-control-1024x393.jpg"),
    alt: "",
  },
  {
    title: "Visão",
    content:
      "Nosso objetivo é nos destacar no ensino e na pesquisa em tecnologia e ciências de materiais, manufatura, mecânicas, ao mesmo tempo em que nos esforçamos para ser um laboratório conhecido por fornecer serviços que priorizam as pessoas e impulsionam transformações sociais, inclusivas e tecnológicas.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Valores",
    content:
      "Conduta ética e respeito às normas institucionais. Busca da excelência através da melhoria contínua e competência técnica. Compromisso com relacionamentos, comunicação e cooperação respeitosos e responsáveis. Consciência socioambiental, empatia, proatividade. Manter a institucionalidade, a credibilidade, a flexibilidade e o foco na racionalidade e na simplicidade.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
     title: "Princípios",
    content:
      "Princípios de governança: Democrática, Eficiência, Igualdade, Impessoalidade, Legalidade, Moralidade, Transparência. Responsabilidade Socioambiental: Proteção Ambiental, Respeito à Vida em Todas as Formas, Sustentabilidade. Foco Estratégico: Planejamento, Prevenção, Internacionalização, Interdisciplinaridade, Otimização de Recursos. Envolvimento comunitário: Incentivo à participação, criatividade, inovação, comprometimento, ensino de qualidade. Melhoria Contínua: Autoavaliação, Certificação de Qualidade, Renovação de Pessoal.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
];

const lmuText = {
    name: "LMU",
    description: `O LMU (Laboratório Multiusuário de Caracterização de Materiais) da Unicamp é uma laboratório focado no estudo de materiais e processos de fabricação. 
                  Sua principal missão é promover pesquisas interdisciplinares, apoiar projetos inovadores e fortalecer a conexão entre a universidade (no ensino e pesquisa) e a iniciativa privada.`,
    whyLaboratory: `O LMU serve como um centro de referência focado exatamente nesse estudo e caracterização, atuando nas áreas vitais de Engenharia de Manufatura e Materiais. 
                    O propósito do laboratório, no entanto, vai além de simplesmente gerar dados; ele existe para usar essas informações como um motor de desenvolvimento.
                    O laboratório serve para promover pesquisas interdisciplinares de ponta, permitindo que projetos inovadores ganhem vida com base em uma compreensão profunda das propriedades dos materiais.`
};

const Home = () => {
  return (
    <>
      <Hero />
       return(
        <Container fluid className="p-5">
            <InfoPage  laboratoryText={lmuText} sectionsData={lmuData} laboratoryName={laboratoryCardEnum.LMU}/>
        </Container>
    );
    </>
  );
};

export default Home;
