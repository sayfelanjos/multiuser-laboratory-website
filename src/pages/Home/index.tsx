import React from "react";
import Hero from "../../components/Hero";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import CardsGrid from "../../components/CardsGrid";
import Divider from "antd/lib/divider";

const sectionsData = [
  {
    title: "Controle de Qualidade",
    content:
      "Os testes mecânicos ajudam a garantir que materiais e componentes atendam às especificações e padrões exigidos. Isso é crucial para manter a qualidade e a consistência nos processos de fabricação.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Segurança",
    content:
      "Ao entender as propriedades mecânicas dos materiais, os engenheiros podem projetar produtos que sejam seguros para uso. Os testes ajudam a prevenir falhas que poderiam levar a lesões ou acidentes.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Avaliação de Desempenho",
    content:
      "Os testes mecânicos fornecem dados sobre como os materiais se comportarão sob diferentes cargas, tensões e condições ambientais. Essas informações são essenciais para projetar componentes que funcionarão corretamente em suas aplicações pretendidas.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Seleção de Materiais",
    content:
      "Os testes ajudam na seleção do material adequado para uma aplicação específica. Diferentes materiais possuem propriedades mecânicas distintas, e escolher o material apropriado garante a durabilidade e o desempenho do produto final.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Pesquisa e Desenvolvimento",
    content:
      "Os testes mecânicos são utilizados em P&D para desenvolver novos materiais e melhorar os existentes. Eles ajudam os pesquisadores a entender o comportamento dos materiais e tomar decisões informadas no design e processamento de materiais.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Conformidade",
    content:
      "Muitas indústrias possuem normas regulatórias que materiais e produtos devem atender. Os testes mecânicos garantem que os produtos cumpram com essas regulamentações, o que pode ser essencial para a aceitação legal e no mercado.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Análise de Falhas",
    content:
      "Quando um componente falha, os testes mecânicos podem ajudar a determinar a causa da falha. Essas informações são valiosas para prevenir falhas futuras e melhorar o design do produto.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
  {
    title: "Manutenção Preditiva",
    content:
      "Para componentes que já estão em uso, os testes mecânicos podem prever falhas potenciais e permitir que a manutenção seja realizada antes que uma falha real ocorra, reduzindo assim o tempo de inatividade e os custos. De forma geral, os testes mecânicos são uma parte fundamental dos processos de engenharia e fabricação, pois garantem a confiabilidade, a segurança e o desempenho dos materiais e produtos.",
    img: require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg"),
    alt: "",
  },
];

const Home = () => {
  return (
    <>
      <Hero />
      <Container
        fluid={"lg"}
        className="p-0 d-flex flex-column my-3 bg-white rounded-3 shadow"
      >
        <div
          className="d-flex justify-content-center rounded-3 align-items-center px-3 pt-3 bg-white my-3"
          style={{ backgroundColor: "" }}
        >
          <h1 className="m-auto text-center">LMU</h1>
          <p
            className="fs-6 border-start border-4 border-light ps-3 mb-0"
            style={{ width: "80%" }}
          >
            O LMU, Laboratório Multiusuário de Caracterização de Materiais, visa
            o estudo e caracterização de materiais e processos de fabricação,
            nas áreas de Engenharia de Manufatura e Materiais. Composto por
            equipamentos, técnicas e procedimentos de diversos laboratórios,
            possuindo como missão promover pesquisas interdisciplinares de
            ponta, colabora com projetos inovadores, apoiando o Plano de
            Desenvolvimento Institucional da Unicamp, potencializando o ensino,
            a pesquisa, a extensão e as relações entre a comunidade
            universitária e a iniciativa privada.
          </p>
        </div>
        <div className="d-flex bg-dark text-white p-0">
          <Image
            className=""
            width="500px"
            height="100%"
            srcSet={`${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg")} 375w,
      ${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg")} 768w,
      ${require("../../assets/images/Pachymeter-1280x720.jpeg")} 992w,
      ${require("../../assets/images/Pachymeter-1280x720.jpeg")} 1200w,
      ${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-500x375.jpg")} 1440w`}
          />
          <div className="d-flex flex-column justify-content-center align-items-start p-3">
            <h1 className="mb-3">Para que Ensaios Mecânicos?</h1>
            <p className="fs-6">
              Os testes mecânicos são uma prática essencial utilizada para
              determinar as propriedades físicas e o comportamento de materiais
              e componentes sob várias condições.
            </p>
          </div>
        </div>
        <div className="bg-info">
          {sectionsData.map((section, index) => (
            <>
              <Divider
                className={`border-dark m-0 ${index === 0 ? "border-0" : ""}`}
              />
              <div
                key={index}
                className="d-flex gap-3 py-3 align-items-center justify-content-start text-dark"
                style={{ height: "180px" }}
              >
                {/*<Image*/}
                {/*  src={section.img}*/}
                {/*  alt={section.alt}*/}
                {/*  width="300px"*/}
                {/*  height="260px"*/}
                {/*/>*/}
                <h3 className="text-center" style={{ width: "300px" }}>
                  {section.title}
                </h3>
                <p
                  className="border-start border-1 border-dark ps-3"
                  style={{ width: "60%" }}
                >
                  {section.content}
                </p>
              </div>
            </>
          ))}
        </div>
        <div className="pb-3">
          <div className="d-flex justify-content-center">
            <h1 className="bg-dark w-100 text-center py-3 text-white">
              Tipos de Ensaios Mecânicos
            </h1>
          </div>
          <CardsGrid />
        </div>
      </Container>
    </>
  );
};

export default Home;
