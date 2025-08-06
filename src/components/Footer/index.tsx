import React, { ComponentType } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { quickAccessLinks, otherLinks, mediaLinks } from "./linksData";

const d = new Date();
const year = d.getFullYear();

const LinkText = ({ url, text }: { url: string; text: string }) => (
  <a
    href={url}
    className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-light text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start"
  >
    {text}
  </a>
);

const LinkIcon = ({ url, Icon }: { url: string; Icon: ComponentType }) => (
  <a href={url} className="link-light icon-link-hover">
    <Icon />
  </a>
);

const Footer = () => {
  return (
    <Container fluid className="footer-container bg-dark">
      <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={3}>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 4, offset: 1 }}
          xl={{ span: 4, offset: 1 }}
          xxl={{ span: 4, offset: 1 }}
        >
          <Stack gap={1} className={"pb-3 " + "align-items-center "}>
            <h6 className="text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start navbar-text text-light">
              Acesso Rápido
            </h6>

            {quickAccessLinks.map((link, index) => (
              <LinkText key={index} url={link.url} text={link.text} />
            ))}
          </Stack>
        </Col>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 5, offset: 1 }}
          lg={{ span: 4, offset: 0 }}
          xl={{ span: 4, offset: 0 }}
          xxl={{ span: 4, offset: 0 }}
        >
          <Stack
            gap={1}
            className={"pb-3 " + "align-items-center " + "flex-column "}
          >
            <h6 className="text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start navbar-text text-light">
              Outros Sites
            </h6>

            {otherLinks.map((link, index) => (
              <LinkText key={index} url={link.url} text={link.text} />
            ))}
          </Stack>
        </Col>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 3, offset: 0 }}
          xl={{ span: 3, offset: 0 }}
          xxl={{ span: 3, offset: 0 }}
        >
          <h6 className="text-center mb-3 navbar-text text-light">
            Mídias Sociais
          </h6>
          <Stack
            gap={3}
            className={
              "pb-3 " +
              "justify-content-center " +
              "align-items-center " +
              "flex-row "
            }
          >
            {mediaLinks.map((link, index) => (
              <LinkIcon key={index} url={link.url} Icon={link.Icon} />
            ))}
          </Stack>
        </Col>
      </Row>
      <Row xs={1} sm={1} md={1} lg={1} xl={1} xxl={1} className="bg-dark">
        <p className="footer-copyright m-0 border-light border-top border-1  text-center text-sm-center text-md-start text-lg-start text-xl-start text-xxl-start text-light">
          Copyright &copy; {year} Faculdade de Engenharia Mecânica. Todos os
          direitos reservados
        </p>
      </Row>
    </Container>
  );
};

export default Footer;
