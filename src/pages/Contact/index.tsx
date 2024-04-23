import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EnvelopeIcon from "../../assets/icons/EnvelopeIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import LocationIcon from "../../assets/icons/LocationIcon";
import Stack from "react-bootstrap/Stack";
import { Link } from "react-router-dom";

interface MailOptions {
  subject: string;
  text: string;
  html: string;
}

const Contact = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const onFullNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFullName(event.currentTarget.value);
    },
    [],
  );
  const onEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.currentTarget.value);
    },
    [],
  );
  const onPhoneChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(event.currentTarget.value);
    },
    [],
  );
  const onSubjectChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubject(event.currentTarget.value);
    },
    [],
  );
  const onMsgChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMsg(event.currentTarget.value);
    },
    [],
  );
  const onButtonSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const mailOptions: MailOptions = {
        subject: subject,
        text: msg,
        html: `
        <h1>Você recebeu uma nova mensagem de ${fullName}</h1>
        <h2>Detalhes do Contato</h2>
        <ul>
          <li>Nome: ${fullName}</li>
          <li>Assunto: ${subject}</li>
          <li>Email: ${email}</li>
          <li>Telefone: ${phone}</li>
        </ul>
        <h2>Mensagem</h2>
        <p>${msg}</p>`,
      };
      const response = await fetch(
        "https://emailsender-qpkecm37va-uc.a.run.app",
        {
          mode: "cors",
          method: "POST",
          cache: "default",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailOptions),
        },
      );
      if (!response.ok) {
        throw new Error("Mensagem não enviada, tente novamente.");
      }
      return (
        <div>Sua mensagem foi enviada com Sucesso! Aguarde nosso contato!</div>
      );
    },
    [],
  );

  return (
    <>
      <Container as="section" id="contact">
        <h2 className="text-center my-5">Contate-nos</h2>
        <Form onSubmit={onButtonSubmit}>
          <Row xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
            <Col>
              <Form.Group controlId="formBasicName" className="mb-3">
                <Form.Label>Nome completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nome completo"
                  required
                  onChange={onFullNameChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Endereço de email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Endereço de email"
                  required
                  onChange={onEmailChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicPhone" className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Telefone"
                  required
                  onChange={onPhoneChange}
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
                  placeholder="Nome completo"
                  required
                  onChange={onSubjectChange}
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
                <Form.Control as="textarea" rows={3} onChange={onMsgChange} />
              </Form.Group>
            </Col>
          </Row>
          <Container className="d-flex justify-content-center mb-5">
            <Button type="submit" className="btn-dark btn px-5">
              Enviar
            </Button>
          </Container>
        </Form>
      </Container>
      <Container fluid>
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.5597605243443!2d-47.06814512380903!3d-22.818771034732972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c6ac3564aee5%3A0x3fa32a727555a765!2sSchool%20of%20Mechanical%20Engineering!5e0!3m2!1sen!2sbr!4v1713481964778!5m2!1sen!2sbr"
          allowFullScreen={true}
          width="100%"
          height="450px"
          // style={{ border: "0", padding: "0", margin: "0" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Container>
      <Container fluid className="py-5">
        <Row xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
          <Col
          // xs={{ span: 1, offset: 3 }}
          // sm={{ span: 1, offset: 3 }}
          // md={{ span: 1, offset: 3 }}
          // lg={{ span: 1, offset: 3 }}
          // xl={{ span: 1, offset: 3 }}
          // xxl={{ span: 1, offset: 3 }}
          // className="p-0"
          >
            <Container className="d-flex justify-content-center p-0 mb-3">
              <Link
                to="#"
                className="icon-link-hover link-dark text-decoration-none"
              >
                <Stack gap={3} className="align-items-center icon-link-hover">
                  <EnvelopeIcon />
                  lemfem@unicamp.br
                </Stack>
              </Link>
            </Container>
          </Col>
          <Col
          // xs={{ span: 2, offset: 2 }}
          // sm={{ span: 2, offset: 2 }}
          // md={{ span: 2, offset: 2 }}
          // lg={{ span: 2, offset: 2 }}
          // xl={{ span: 2, offset: 2 }}
          // xxl={{ span: 2, offset: 2 }}
          // className="p-0"
          >
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
          <Col
          // xs={{ span: 2, offset: 1 }}
          // sm={{ span: 2, offset: 1 }}
          // md={{ span: 2, offset: 1 }}
          // lg={{ span: 2, offset: 1 }}
          // xl={{ span: 2, offset: 1 }}
          // xxl={{ span: 2, offset: 1 }}
          // className="p-0"
          >
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
