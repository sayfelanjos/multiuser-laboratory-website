import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import EnvelopeIcon from "../../assets/icons/EnvelopeIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";
import ReactInputMask from "react-input-mask";
import Image from "react-bootstrap/Image";
import check from "../../assets/images/check.png";
import cross from "../../assets/images/cross.png";

interface MailOptions {
  subject: FormDataEntryValue;
  html: FormDataEntryValue;
}

const sendEmailUrl = process.env.REACT_APP_SENDEMAIL_URL as string;
const Contact: React.FC = () => {
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);
  const [emailSentSuccessfully, setEmailSentSuccessfully] =
    useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const onButtonSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsEmailSending(true);
      const fd: FormData = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());
      const mailOptions: MailOptions = {
        subject: data["subject"],
        html: `<h4>Nome: ${data["fullName"]}</h4><h4>Email: ${data["email"]}</h4><h4>Telefone: ${data["phone"]}</h4><h4>Mensagem</h4><p>${data["msg"]}</p>`,
      };
      const response = await fetch(sendEmailUrl, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailOptions),
      });
      event.target.reset();
      setTimeout(function () {
        setIsEmailSending(false);
      }, 2000);
      setShowForm(false);
      if (!response.ok) {
        setEmailSentSuccessfully(false);
      }
      setEmailSentSuccessfully(true);
    },
    [],
  );

  return (
    <>
      {!showForm && emailSentSuccessfully && (
        <Container className="contact-page__ctn">
          <span className="contact-page__check-ctn">
            <span className="contact-page__check-image-ctn">
              <Image
                src={check}
                alt="Successful check"
                className="contact-page__check-image"
                width="400"
                height="400"
              ></Image>
            </span>
            <span className="contact-page__check-text-ctn">
              <div>
                <h2 className="contact-page__check-msg">
                  Sua mensagem foi enviada.
                </h2>
                <p className="notranslate">
                  Logo entraremos em contato com você.
                </p>
              </div>
            </span>
          </span>
        </Container>
      )}
      {!showForm && !emailSentSuccessfully && (
        <Container className="contact-page__ctn">
          <span className="contact-page__check-ctn">
            <span className="contact-page__check-image-ctn">
              <Image
                src={cross}
                alt="Fail check"
                className="contact-page__check-image"
                width="400"
                height="400"
              ></Image>
            </span>
            <span className="contact-page__check-text-ctn">
              <div>
                <h2 className="contact-page__check-msg">
                  Sua mensagem não foi enviada.
                </h2>
                <p>Verifique suas informações e tente novamente.</p>
              </div>
            </span>
          </span>
        </Container>
      )}
      {showForm && (
        <Container as="section" id="contact-page" className="contact-page__ctn">
          <h2 className="text-center my-3">Contate-nos</h2>
          <Form onSubmit={onButtonSubmit}>
            <Row xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
              <Col>
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Nome completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome completo"
                    required
                    name="fullName"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Endereço de email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Endereço de email"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPhone" className="mb-3">
                  <Form.Label>Celular</Form.Label>
                  <ReactInputMask
                    className="form-control"
                    mask="(99)99999-9999"
                    maskChar="_"
                    placeholder="Telefone"
                    required
                    name="phone"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
              <Col>
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Assunto</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Assunto"
                    required
                    name="subject"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Mensagem</Form.Label>
                  <Form.Control as="textarea" rows={3} name="msg" />
                </Form.Group>
              </Col>
            </Row>
            <Container className="d-flex p-0 justify-content-center justify-content-sm-center  justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-xxl-start mb-5">
              <Button
                type="submit"
                className="btn-dark btn"
                disabled={isEmailSending}
              >
                {isEmailSending ? (
                  <span className="mx-2">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-3">Enviando...</span>
                  </span>
                ) : (
                  <span className="mx-5">Enviar</span>
                )}
              </Button>
            </Container>
          </Form>
        </Container>
      )}
      <Container fluid className="px-0">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.5597605243443!2d-47.06814512380903!3d-22.818771034732972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c6ac3564aee5%3A0x3fa32a727555a765!2sSchool%20of%20Mechanical%20Engineering!5e0!3m2!1sen!2sbr!4v1713481964778!5m2!1sen!2sbr"
          allowFullScreen={true}
          width="100%"
          height="450px"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Container>
      <Container fluid className="py-5">
        <Row xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
          <Col>
            <Container className="d-flex justify-content-center p-0 mb-3">
              <Link
                to="#"
                className="icon-link-hover link-dark text-decoration-none"
              >
                <Stack gap={3} className="align-items-center icon-link-hover">
                  <EnvelopeIcon />
                  lmu.demm-l@unicamp.br
                </Stack>
              </Link>
            </Container>
          </Col>
          <Col>
            <Container className="d-flex justify-content-center p-0 mb-3">
              <Link
                to="#"
                className="icon-link-hover link-dark text-decoration-none"
              >
                <Stack gap={3} className="align-items-center icon-link-hover">
                  <PhoneIcon />
                  (19)98977-4445
                </Stack>
              </Link>
            </Container>
          </Col>
          <Col>
            <Container className="d-flex justify-content-center p-0 mb-3">
              <Link
                to="https://maps.app.goo.gl/zLxyBTwKUxBtkCBS9"
                className="icon-link-hover link-dark text-decoration-none"
              >
                <Stack gap={3} className="align-items-center icon-link-hover">
                  <LocationIcon />
                  Campinas, São Paulo
                </Stack>
              </Link>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
