import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactInputMask from "react-input-mask";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import TooltipIcon from "../../assets/icons/TooltipIcon";
import Button from "react-bootstrap/Button";

interface QuoteRequestOptions {
  subject: FormDataEntryValue;
  html: FormDataEntryValue;
  attachments: FileReader;
}

const sendEmailUrl = process.env.REACT_APP_SENDEMAIL_URL as string;

const QuoteRequest = () => {
  const [requester, setRequester] = useState("RA");
  // const [isQuoteRequestSending, setIsQuoteRequestSending] =
  //   useState<boolean>(false);
  // const [emailQuoteRequestSuccessfully, setQuoteRequestSentSuccessfully] =
  //   useState<boolean>(false);
  // const [showForm, setShowForm] = useState<boolean>(true);
  let requesterIdPlaceholder = "";

  switch (requester) {
    case "RA": {
      requesterIdPlaceholder = "999999";
      break;
    }
    case "CPF": {
      requesterIdPlaceholder = "999.999.999-99";
      break;
    }
    case "Matrícula": {
      requesterIdPlaceholder = "999.999-9";
      break;
    }
  }

  const onSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRequester(event.target.value);
    },
    [],
  );

  const onButtonSubmit = useCallback(
    async (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      // setIsQuoteRequestSending(true);

      const fd: FormData = new FormData(event.target);
      const reader: FileReader = new FileReader();
      const data = Object.fromEntries(fd.entries());
      const file = data["fileInput"] as File;

      reader.onerror = (e) => {
        console.error("FileReader error", e);
      };
      reader.readAsArrayBuffer(file);

      const QuoteRequestOptions: QuoteRequestOptions = {
        subject: "Orçamento",
        html: `<h4>Nome: ${data["fullName"]}</h4><h4>Email: ${data["email"]}</h4><h4>Telefone: ${data["phone"]}</h4><h4>Mensagem</h4><p>${data["msg"]}</p>`,
        attachments: reader,
      };

      const response = await fetch(sendEmailUrl, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(QuoteRequestOptions),
      });
      event.target.reset();
      // setTimeout(function () {
      //   setIsQuoteRequestSending(false);
      // }, 2000);
      // setShowForm(false);
      if (!response.ok) {
        throw Error("Something get wrong!");
        // setQuoteRequestSentSuccessfully(false);
      }
      console.log("Success!!!");
      // setQuoteRequestSentSuccessfully(true);
    },
    [],
  );

  return (
    <Container className="quote-request__ctn">
      <h2 className="text-center my-3">Solicite um Orçamento</h2>
      <Form onSubmit={onButtonSubmit}>
        <Row className="mb-3" xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
          <Col
            lg={{ span: 6, offset: 0 }}
            xl={{ span: 6, offset: 0 }}
            xxl={{ span: 6, offset: 0 }}
          >
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label name="fullName">Nome Completo</Form.Label>
              <Form.Control type="text" placeholder="Nome" className="mb-3" />
            </Form.Group>
          </Col>
          <Col
            lg={{ span: 4, offset: 0 }}
            xl={{ span: 4, offset: 0 }}
            xxl={{ span: 4, offset: 0 }}
          >
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label name="email">Endereço de email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Endereço de email"
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
              <Form.Label name="phone">Celular</Form.Label>
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
        <Row className="mb-3" xs={1} sm={1} md={2} lg={4} xl={4} xxl={4}>
          <Col
            lg={{ span: 2, offset: 0 }}
            xl={{ span: 2, offset: 0 }}
            xxl={{ span: 2, offset: 0 }}
          >
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label name="requester">Solicitante</Form.Label>
              <Form.Select
                aria-label="Select service"
                className="mb-3"
                onChange={onSelectChange}
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
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>{requester}</Form.Label>
              <Form.Control
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
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label name="service">Serviço pretendido</Form.Label>
              <Form.Select aria-label="Select service" className="mb-3">
                <option value="1">Ensaio de Tenacidade</option>
                <option value="1">Ensaio de Compressão</option>
                <option value="1">Ensaio de Tração</option>
                <option value="1">Ensaio de Fadiga</option>
                <option value="1">Ensaio de Flexão</option>
                <option value="1">Ensaio de Impacto Charpy</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col
            lg={{ span: 4, offset: 0 }}
            xl={{ span: 4, offset: 0 }}
            xxl={{ span: 4, offset: 0 }}
          >
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Adicionar arquivo</Form.Label>
              <Form.Control type="file" name="fileInput" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label name="msg">Mensagem</Form.Label>
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
                    <TooltipIcon />
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
        <Button variant="dark" type="submit" className="px-5">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default QuoteRequest;
