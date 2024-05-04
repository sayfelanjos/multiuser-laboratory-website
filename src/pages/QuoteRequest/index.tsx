import React from "react";
import Container from "react-bootstrap/Container";
import QuoteRequestForm from "../../components/QuoteRequestForm";

const QuoteRequest = () => {
  return (
    <Container className="quote-request__ctn">
      <h2 className="text-center my-3">Solicite um Orçamento</h2>
      <QuoteRequestForm />
    </Container>
  );
};

export default QuoteRequest;
