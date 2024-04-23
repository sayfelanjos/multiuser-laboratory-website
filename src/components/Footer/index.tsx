import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import { Link } from "react-router-dom";
import LinkedInIcon from "../../assets/icons/LinkedInIcon";
import WhatsAppIcon from "../../assets/icons/WhatsAppIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";

const d = new Date();
const year = d.getFullYear();

const Footer = () => {
  return (
    <Container fluid className="footer-container bg-light">
      <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={3}>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 3, offset: 1 }}
          xl={{ span: 3, offset: 1 }}
          xxl={{ span: 3, offset: 1 }}
        >
          <Stack
            gap={1}
            className={
              "pb-3 " +
              "align-items-center " +
              "align-items-sm-center " +
              "align-items-md-start " +
              "align-items-lg-start " +
              "align-items-xl-start " +
              "align-items-xxl-start " +
              "flex-column " +
              "flex-sm-column " +
              "flex-md-column " +
              "flex-lg-column " +
              "flex-xl-column " +
              "flex-xxl-column"
            }
          >
            <h6 className="text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start navbar-text">
              Acesso Rápido
            </h6>
            <Link
              to="http://www.fem.unicamp.br/index.php/pt-br/institucional/diretoria"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Diretoria
            </Link>
            <Link
              to="http://www.fem.unicamp.br/index.php/pt-br/de-sobrenos"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Departamento de Energia
            </Link>
            <Link
              to="http://www.fem.unicamp.br/index.php/pt-br/demm-sobrenos"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Departamento de Engenharia de Manufatura e Materiais
            </Link>
            <Link
              to="http://www.fem.unicamp.br/index.php/pt-br/dmc-sobrenos"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Departamento de Mecânica Computacional
            </Link>
            <Link
              to="http://www.fem.unicamp.br/index.php/pt-br/dsi-sobrenos"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Departamento de Sistemas Integrados
            </Link>
            <Link
              to="http://www.pg.unicamp.br/mostra_norma.php?id_norma=22826"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              POLÍTICA DE SEGURANÇA DA INFORMAÇÃO DA UNICAMP (Deliberação
              CONSU-A-031/2020, de 04/08/2020)
            </Link>
          </Stack>
        </Col>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 3, offset: 1 }}
          xl={{ span: 3, offset: 1 }}
          xxl={{ span: 3, offset: 1 }}
        >
          <Stack
            gap={1}
            className={
              "pb-3 " +
              "align-items-center " +
              "align-items-sm-center " +
              "align-items-md-start " +
              "align-items-lg-start " +
              "align-items-xl-start " +
              "align-items-xxl-start " +
              "flex-column " +
              "flex-sm-column " +
              "flex-md-column " +
              "flex-lg-column " +
              "flex-xl-column " +
              "flex-xxl-column"
            }
          >
            <h6 className="text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start navbar-text">
              Outros Sites
            </h6>
            <Link
              to="https://www.bae.unicamp.br/"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Biblioteca da Área de Engenharia - BAE
            </Link>
            <Link
              to="http://www.dac.unicamp.br/"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Diretoria Acadêmica - DAC
            </Link>
            <Link
              to="http://www.sae.unicamp.br/"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Serviço de Apoio ao Estudante - SAE
            </Link>
            <Link
              to="http://www.sbu.unicamp.br/"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Sistema de Bibliotecas da Unicamp - SBU
            </Link>
            <Link
              to="http://www.unicamp.br/sipex/"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Sistema de Informação de Pesquisa - SiPEx
            </Link>
            <span className="d-inline">
              <Link
                to="http://www.capes.gov.br/"
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
              >
                Fundação Capes
              </Link>{" "}
              |
              <Link
                to="http://www.cnpq.br/"
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
              >
                {" "}
                CNPq
              </Link>{" "}
              |
              <Link
                to="http://www.fapesp.br/"
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
              >
                {" "}
                Fapesp
              </Link>{" "}
              |
              <Link
                to="http://www.finep.gov.br/"
                className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
              >
                {" "}
                Finep
              </Link>{" "}
              |
            </span>
            <Link
              to="https://www.ggte.unicamp.br/"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Ensino Aberto Unicamp
            </Link>
            <Link
              to="http://www.ccuec.unicamp.br/ccuec/rede_sem_fio"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
            >
              Rede sem Fio Unicamp - Eduroam
            </Link>
            <Link
              to="http://www.prefeitura.unicamp.br/"
              className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-dark text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start "
            >
              Prefeitura da Unicamp
            </Link>
          </Stack>
        </Col>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 3, offset: 1 }}
          xl={{ span: 3, offset: 1 }}
          xxl={{ span: 3, offset: 1 }}
        >
          <h6 className="text-center text-md-centertext-lg-start text-xl-start text-xxl-start py text-lg-start mb-3 navbar-text">
            Mídias Sociais
          </h6>
          <Stack
            gap={3}
            className={
              "pb-3 " +
              "justify-content-center " +
              "justify-content-sm-center " +
              "justify-content-md-center " +
              "align-items-lg-start " +
              "align-items-xl-start " +
              "align-items-xxl-start " +
              "flex-row " +
              "flex-sm-row " +
              "flex-md-row " +
              "flex-lg-column " +
              "flex-xl-column " +
              "flex-xxl-column"
            }
          >
            <Link to="#" className="link-dark icon-link-hover">
              <InstagramIcon />
            </Link>
            <Link to="#" className="link-dark icon-link-hover">
              <LinkedInIcon />
            </Link>
            <Link to="#" className="link-dark icon-link-hover">
              <FacebookIcon />
            </Link>
            <Link to="#" className="link-dark icon-link-hover">
              <WhatsAppIcon />
            </Link>
          </Stack>
        </Col>
      </Row>
      <Row xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
        <p className="footer-copyright m-0 border-black border-top border-1 text-bg-light text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start">
          Copyright &copy; {year} Faculdade de Engenharia Mecânica. All Rights
          Reserved
        </p>
      </Row>
    </Container>
  );
};

export default Footer;
