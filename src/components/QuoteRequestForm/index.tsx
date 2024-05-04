import React, { useCallback, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactInputMask from "react-input-mask";

const QuoteRequestForm = () => {
  const [requester, setRequester] = useState("RA");
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
    case "CNPJ": {
      requesterIdPlaceholder = "99.999.999/9999-99";
      break;
    }
  }

  const onSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setRequester(event.target.value);
    },
    [],
  );

  return (
    <Form>
      <Row className="mb-3" xs={1} sm={1} md={1} lg={3} xl={3} xxl={3}>
        <Col
          lg={{ span: 6, offset: 0 }}
          xl={{ span: 6, offset: 0 }}
          xxl={{ span: 6, offset: 0 }}
        >
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="email" placeholder="Nome" className="mb-3" />
          </Form.Group>
        </Col>
        <Col
          lg={{ span: 4, offset: 0 }}
          xl={{ span: 4, offset: 0 }}
          xxl={{ span: 4, offset: 0 }}
        >
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Endereço de email</Form.Label>
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
      <Row className="mb-3" xs={1} sm={1} md={2} lg={4} xl={4} xxl={4}>
        <Col
          lg={{ span: 2, offset: 0 }}
          xl={{ span: 2, offset: 0 }}
          xxl={{ span: 2, offset: 0 }}
        >
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Solicitante</Form.Label>
            <Form.Select
              aria-label="Select service"
              className="mb-3"
              onChange={onSelectChange}
            >
              <option value="RA">Aluno</option>
              <option value="RA">Professor</option>
              <option value="CPF">Pessoa física</option>
              <option value="CNPJ">Pessoa jurídica</option>
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
        <Col>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Serviço pretendido</Form.Label>
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
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Adicionar arquivo</Form.Label>
            <Form.Control type="file" multiple />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Mensagem</Form.Label>
            <Form.Control as="textarea" rows={3} name="msg" />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="dark" type="submit" className="px-5">
        Enviar
      </Button>
    </Form>
  );
};

export default QuoteRequestForm;
