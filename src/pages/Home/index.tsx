import React, { useRef, useState } from "react";
import Hero from "../../components/Hero";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "react-bootstrap/Image";
import placeholder from "../../assets/images/pexels-mikhail-nilov-9242841.jpg";
import CardsGrid from "../../components/CardsGrid";
import Carousel from "../../components/Carousel";

// TODO Section options: Norms, KPIs

const Home = () => {
  return (
    <>
      <Hero />
      <Container fluid className="p-0">
        <Row sm={12} lg={12} xl={12} xxl={12}>
          <Col
            className="home__section_ctn p-0 flex-grow-1"
            sm={{ span: 10, offset: 1 }}
            lg={{ span: 10, offset: 1 }}
            xl={{ span: 10, offset: 1 }}
            xxl={{ span: 8, offset: 2 }}
          >
            <h1 className="mb-3">Laboratório Multi Usuários - LMU</h1>
            <p className="fs-6">
              O LMU, Laboratório Multiusuário de Caracterização de Materiais,
              visa o estudo e caracterização de materiais e processos de
              fabricação, nas áreas de Engenharia de Manufatura e Materiais.
              Composto por equipamentos, técnicas e procedimentos de diversos
              laboratórios, possuindo como missão promover pesquisas
              interdisciplinares de ponta, colabora com projetos inovadores,
              apoiando o Plano de Desenvolvimento Institucional da Unicamp,
              potencializando o ensino, a pesquisa, a extensão e as relações
              entre a comunidade universitária e a iniciativa privada.
            </p>
          </Col>
        </Row>
        {/*<Row sm={8} lg={12} xl={12} xxl={12}>*/}
        {/*  <Col*/}
        {/*    sm={{ span: 6, offset: 1 }}*/}
        {/*    md={{ span: 10, offset: 1 }}*/}
        {/*    lg={{ span: 10, offset: 1 }}*/}
        {/*    xl={{ span: 10, offset: 1 }}*/}
        {/*    xxl={{ span: 8, offset: 2 }}*/}
        {/*  >*/}
        {/*    <Swiper*/}
        {/*      style={{*/}
        {/*        "--swiper-navigation-color": "#fff",*/}
        {/*        "--swiper-pagination-color": "#fff",*/}
        {/*      }}*/}
        {/*      speed={600}*/}
        {/*      parallax={true}*/}
        {/*      pagination={{*/}
        {/*        clickable: true,*/}
        {/*      }}*/}
        {/*      navigation={true}*/}
        {/*      modules={[Parallax, Pagination, Navigation]}*/}
        {/*      className="mySwiper"*/}
        {/*    >*/}
        {/*      /!*<div*!/*/}
        {/*      /!*  slot="container-start"*!/*/}
        {/*      /!*  className="parallax-bg"*!/*/}
        {/*      /!*  data-swiper-parallax="-23%"*!/*/}
        {/*      /!*>*!/*/}
        {/*      /!*</div>*!/*/}
        {/*      <SwiperSlide>*/}
        {/*        <div className="title" data-swiper-parallax="-300">*/}
        {/*          Slide 1*/}
        {/*        </div>*/}
        {/*        <div className="subtitle" data-swiper-parallax="-200">*/}
        {/*          Subtitle*/}
        {/*        </div>*/}
        {/*        <div className="text" data-swiper-parallax="-100">*/}
        {/*          <p>*/}
        {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
        {/*            Aliquam dictum mattis velit, sit amet faucibus felis iaculis*/}
        {/*            nec. Nulla laoreet justo vitae porttitor porttitor.*/}
        {/*            Suspendisse in sem justo. Integer laoreet magna nec elit*/}
        {/*            suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem*/}
        {/*            at elit facilisis rutrum. Ut at ullamcorper velit. Nulla*/}
        {/*            ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.*/}
        {/*            Aenean feugiat non eros quis feugiat.*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*        <Image*/}
        {/*          src={*/}
        {/*            "../../../assets/images/lmu-images/ens.cmprss-corp.prov.JPG"*/}
        {/*          }*/}
        {/*        />*/}
        {/*      </SwiperSlide>*/}
        {/*      <SwiperSlide>*/}
        {/*        <div className="title" data-swiper-parallax="-300">*/}
        {/*          Slide 2*/}
        {/*        </div>*/}
        {/*        <div className="subtitle" data-swiper-parallax="-200">*/}
        {/*          Subtitle*/}
        {/*        </div>*/}
        {/*        <div className="text" data-swiper-parallax="-100">*/}
        {/*          <p>*/}
        {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
        {/*            Aliquam dictum mattis velit, sit amet faucibus felis iaculis*/}
        {/*            nec. Nulla laoreet justo vitae porttitor porttitor.*/}
        {/*            Suspendisse in sem justo. Integer laoreet magna nec elit*/}
        {/*            suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem*/}
        {/*            at elit facilisis rutrum. Ut at ullamcorper velit. Nulla*/}
        {/*            ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.*/}
        {/*            Aenean feugiat non eros quis feugiat.*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*      </SwiperSlide>*/}
        {/*      <SwiperSlide>*/}
        {/*        <div className="title" data-swiper-parallax="-300">*/}
        {/*          Slide 3*/}
        {/*        </div>*/}
        {/*        <div className="subtitle" data-swiper-parallax="-200">*/}
        {/*          Subtitle*/}
        {/*        </div>*/}
        {/*        <div className="text" data-swiper-parallax="-100">*/}
        {/*          <p>*/}
        {/*            Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
        {/*            Aliquam dictum mattis velit, sit amet faucibus felis iaculis*/}
        {/*            nec. Nulla laoreet justo vitae porttitor porttitor.*/}
        {/*            Suspendisse in sem justo. Integer laoreet magna nec elit*/}
        {/*            suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem*/}
        {/*            at elit facilisis rutrum. Ut at ullamcorper velit. Nulla*/}
        {/*            ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.*/}
        {/*            Aenean feugiat non eros quis feugiat.*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*      </SwiperSlide>*/}
        {/*    </Swiper>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row className="bg-dark text-white p-0 p-lg-5 flex-column-reverse">
          <Col className="p-0">
            <h1 className="mb-3">Para que Ensaios Mecânicos?</h1>
            <p className="fs-6">
              Os testes mecânicos são uma prática essencial utilizada para
              determinar as propriedades físicas e o comportamento de materiais
              e componentes sob várias condições.
            </p>
          </Col>
          <Col className="p-0">
            <Image
              width="375px"
              height="100%"
              srcSet={`${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg")} 375w,
      ${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg")} 768w,
      ${require("../../assets/images/Pachymeter-1280x720.jpeg")} 992w,
      ${require("../../assets/images/Pachymeter-1280x720.jpeg")} 1200w,
      ${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-500x375.jpg")} 1440w`}
            />
          </Col>
        </Row>
        <Row>
          <Col className="p-3 mx-5 my-auto">
            <h2> Controle de Qualidade</h2>
            <p>
              Os testes mecânicos ajudam a garantir que materiais e componentes
              atendam às especificações e padrões exigidos. Isso é crucial para
              manter a qualidade e a consistência nos processos de fabricação.
            </p>
          </Col>
        </Row>
        <Row>
          <Container>
            <Col>
              <h1> Segurança</h1>
              <p>
                Ao entender as propriedades mecânicas dos materiais, os
                engenheiros podem projetar produtos que sejam seguros para uso.
                Os testes ajudam a prevenir falhas que poderiam levar a lesões
                ou acidentes.
              </p>
            </Col>
          </Container>
        </Row>
        <Row>
          <Container>
            <Col>
              <h1> Avaliação de Desempenho</h1>
              <p>
                Os testes mecânicos fornecem dados sobre como os materiais se
                comportarão sob diferentes cargas, tensões e condições
                ambientais. Essas informações são essenciais para projetar
                componentes que funcionarão corretamente em suas aplicações
                pretendidas.
              </p>
            </Col>
          </Container>
        </Row>
        <Row>
          <Col>
            <h1>Seleção de Materiais</h1>
            <p>
              Os testes ajudam na seleção do material adequado para uma
              aplicação específica. Diferentes materiais possuem propriedades
              mecânicas distintas, e escolher o material apropriado garante a
              durabilidade e o desempenho do produto final.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Pesquisa e Desenvolvimento</h1>
            <p>
              Os testes mecânicos são utilizados em P&D para desenvolver novos
              materiais e melhorar os existentes. Eles ajudam os pesquisadores a
              entender o comportamento dos materiais e tomar decisões informadas
              no design e processamento de materiais.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Conformidade</h1>
            <p>
              Muitas indústrias possuem normas regulatórias que materiais e
              produtos devem atender. Os testes mecânicos garantem que os
              produtos cumpram com essas regulamentações, o que pode ser
              essencial para a aceitação legal e no mercado.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Análise de Falhas</h1>
            <p>
              Quando um componente falha, os testes mecânicos podem ajudar a
              determinar a causa da falha. Essas informações são valiosas para
              prevenir falhas futuras e melhorar o design do produto.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Manutenção Preditiva</h1>
            <p>
              Para componentes que já estão em uso, os testes mecânicos podem
              prever falhas potenciais e permitir que a manutenção seja
              realizada antes que uma falha real ocorra, reduzindo assim o tempo
              de inatividade e os custos. De forma geral, os testes mecânicos
              são uma parte fundamental dos processos de engenharia e
              fabricação, pois garantem a confiabilidade, a segurança e o
              desempenho dos materiais e produtos.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
