import React, { ChangeEvent, useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactInputMask from "react-input-mask";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
// import TooltipIcon from "../../assets/icons/TooltipIcon";
import Button from "react-bootstrap/Button";
// import Image from "react-bootstrap/Image";
// import check from "../../assets/images/check.png";
// import cross from "../../assets/images/cross.png";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
// import "./_quote-request.scss";
import { useLocation } from "react-router-dom";

interface MailOptions {
  subject: string;
  html: string;
}

const sendEmailUrl = process.env.REACT_APP_SENDEMAIL_URL as string;

const QuoteRequest = () => {
  const [requesterId, setRequesterId] = useState("RA");
  const [showForm, setShowForm] = useState<boolean>(true);
  const [isQuoteRequestSending, setIsQuoteRequestSending] =
    useState<boolean>(false);
  const [sentQuoteRequestSuccessfully, setQuoteRequestSentSuccessfully] =
    useState<boolean>(false);
  let requesterIdPlaceholder = "";
  let requesterType = "";

  switch (requesterId) {
    case "RA": {
      requesterIdPlaceholder = "999999";
      requesterType = "Aluno";
      break;
    }
    case "CPF": {
      requesterIdPlaceholder = "999.999.999-99";
      requesterType = "Externo";
      break;
    }
    case "Matrícula": {
      requesterIdPlaceholder = "999.999-9";
      requesterType = "Professor";
      break;
    }
  }

  const onSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      event.preventDefault();
      setRequesterId(event.target.value);
    },
    [],
  );

  const onButtonSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsQuoteRequestSending(true);

      const fd: FormData = new FormData(event.target);
      const data = Object.fromEntries(fd.entries());

      const mailOptions: MailOptions = {
        subject: "Orçamento",
        html: `<h4>Nome: ${data["fullName"]}</h4>
               <h4>Email: ${data["email"]}</h4>
               <h4>Solicitante: ${requesterType}</h4>
               <h4>${requesterId}: ${data["requesterId"]}</h4>
               </h4><h4>Telefone: ${data["phone"]}</h4>
               <h4>Mensagem</h4><p>${data["msg"]}</p>`,
      };
      const response = await fetch(sendEmailUrl, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "Application/Json",
        },
        body: JSON.stringify(mailOptions),
      });

      setTimeout(function () {
        setIsQuoteRequestSending(false);
      }, 2000);
      setShowForm(false);
      if (!response.ok) {
        setQuoteRequestSentSuccessfully(false);
      }
      setQuoteRequestSentSuccessfully(true);
      event.target.reset();
    },
    [],
  );
  const onLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setShowForm(true);
    },
    [],
  );
  const location = useLocation();
  const calendarName = location.state?.calendarName;
  return (
    <>
      {!showForm && sentQuoteRequestSuccessfully && (
        <Container className="quote-request__ctn">
          <div className="d-flex flex-column justify-content-evenly h-100">
            <span className="contact-page__check-ctn">
              <span className="contact-page__check-image-ctn">
                {/* <Image
                  src={check}
                  alt="Successful check"
                  className="contact-page__check-image"
                  width="400"
                  height="400"
                ></Image> */}
              </span>
              <span className="contact-page__check-text-ctn">
                <div>
                  <h2 className="contact-page__check-msg">
                    Sua mensagem foi enviada.
                  </h2>
                  <p className="notranslate">
                    Logo entraremos em contato com você.
                  </p>
                  <h6>Obrigado!</h6>
                </div>
              </span>
            </span>
            <div className="d-flex justify-content-evenly">
              <Link
                to="/app/quote-request"
                className="link-dark"
                onClick={onLinkClick}
              >
                Novo Orçamento
              </Link>
              <Link to="/app/scheduler" className="link-dark">
                Agenda
              </Link>
            </div>
          </div>
        </Container>
      )}
      {!showForm && !sentQuoteRequestSuccessfully && (
        <Container className="quote-request__ctn">
          <span className="contact-page__check-ctn">
            <span className="contact-page__check-image-ctn">
              {/* <Image
                src={cross}
                alt="Fail check"
                className="contact-page__check-image"
                width="400"
                height="400"
              ></Image> */}
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
        <Container className="quote-request__ctn">
          <div className="shadow rounded-2 p-3">
            <h2 className="text-center my-3">Solicite um Orçamento em {calendarName || ""}</h2>
            <Form onSubmit={onButtonSubmit}>
              <Row className="mb-3" xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
                <Col
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 6, offset: 0 }}
                  xxl={{ span: 6, offset: 0 }}
                >
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label column={true}>Nome Completo</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Nome"
                      className="mb-3"
                    />
                  </Form.Group>
                </Col>
                <Col
                  lg={{ span: 4, offset: 0 }}
                  xl={{ span: 4, offset: 0 }}
                  xxl={{ span: 4, offset: 0 }}
                >
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label column={true}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Endereço de email"
                      name="email"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col
                  lg={{ span: 2, offset: 0 }}
                  xl={{ span: 2, offset: 0 }}
                  xxl={{ span: 2, offset: 0 }}
                >
                  <Form.Group controlId="formBasicPhone" className="mb-3">
                    <Form.Label column={true}>Celular</Form.Label>
                    <ReactInputMask
                      id="formBasicPhone"
                      className="form-control"
                      mask="(99)99999-9999"
                      maskChar="_"
                      placeholder="Celular"
                      required
                      name="phone"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3" xs={1} sm={1} md={2} lg={4} xl={4} xxl={4}>
                <Col
                  lg={{ span: 2, offset: 0 }}
                  xl={{ span: 2, offset: 0 }}
                  xxl={{ span: 2, offset: 0 }}
                >
                  <Form.Group as={Col} controlId="requester">
                    <Form.Label column={true}>Solicitante</Form.Label>
                    <Form.Select
                      aria-label="Select service"
                      className="mb-3"
                      onChange={onSelectChange}
                      name="requester"
                    >
                      <option value="RA">Aluno</option>
                      <option value="Matrícula">Professor</option>
                      <option value="Matrícula">Funcionário</option>
                      <option value="CPF">Pessoa física</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col
                  lg={{ span: 2, offset: 0 }}
                  xl={{ span: 2, offset: 0 }}
                  xxl={{ span: 2, offset: 0 }}
                >
                  <Form.Group className="mb-3" controlId="requesterId">
                    <Form.Label column={true}>{requesterId}</Form.Label>
                    <Form.Control
                      name="requesterId"
                      placeholder={requesterIdPlaceholder}
                      className="mb-3"
                    />
                  </Form.Group>
                </Col>
                <Col
                  lg={{ span: 4, offset: 0 }}
                  xl={{ span: 4, offset: 0 }}
                  xxl={{ span: 4, offset: 0 }}
                >
                  <Form.Group as={Col} controlId="services">
                    <Form.Label name="service" column={true}>
                      Serviço pretendido
                    </Form.Label>
                    <Form.Select
                      aria-label="Select service"
                      className="mb-3"
                      id="services"
                    >
                      <option value="1">Ensaio de Tenacidade</option>
                      <option value="1">Ensaio de Compressão</option>
                      <option value="1">Ensaio de Tração</option>
                      <option value="1">Ensaio de Fadiga</option>
                      <option value="1">Ensaio de Flexão</option>
                      <option value="1">Ensaio de Impacto Charpy</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label name="msgToolTip" column={true}>
                      Mensagem
                    </Form.Label>
                    <OverlayTrigger
                      overlay={
                        <Tooltip id="1">
                          {"Qual a temperatura? (ex: ambiente, aquecida, resfriada)\n" +
                            "Qual a atmosfera? (ex: não monitorada oxidativa, inerte)\n" +
                            "Qual a técnica? (ex: análise espectroscópica)"}
                        </Tooltip>
                      }
                    >
                      {
                        <span className="m-2">
                          {/* <TooltipIcon /> */}
                        </span>
                      }
                    </OverlayTrigger>

                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="msg"
                      placeholder={"Mensagem"}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  className="btn-dark btn"
                  disabled={isQuoteRequestSending}
                >
                  {isQuoteRequestSending ? (
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
              </div>
            </Form>
          </div>
        </Container>
      )}
    </>
  );
};

export default QuoteRequest;
