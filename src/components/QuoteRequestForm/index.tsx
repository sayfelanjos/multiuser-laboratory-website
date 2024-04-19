import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const QuoteRequestForm = () => {
  return (
    <Form>
      <Row className="mb-3" xs={1} sm={1} md={1} lg={2} xl={2} xxl={2}>
        <Col>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type="email" placeholder="Nome" className="mb-3" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="tel" placeholder="Telefone" className="mb-3" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3" xs={1} sm={1} md={2} lg={3} xl={3} xxl={3}>
        <Col>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Cep</Form.Label>
            <Form.Control className="mb-3" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Rua</Form.Label>
            <Form.Control className="mb-3" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>Complemento</Form.Label>
            <Form.Control
              placeholder="Casa, Apartamento, Kitnet e etc"
              className="mb-3"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3" xs={1} sm={1} md={2} lg={3} xl={3} xxl={3}>
        <Col>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Bairro</Form.Label>
            <Form.Control
              placeholder="Rua Santos Dumont 123"
              className="mb-3"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              placeholder="Rua Santos Dumont 123"
              className="mb-3"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Estado</Form.Label>
            <Form.Select defaultValue="Choose..." className="mb-3">
              <option>Choose...</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row></Row>

      <Button variant="dark" type="submit" className="px-5">
        Enviar
      </Button>
    </Form>
  );
};

export default QuoteRequestForm;
