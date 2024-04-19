import React from "react";
import Container from "react-bootstrap/Container";
import QuoteRequestForm from "../../components/QuoteRequestForm";

const QuoteRequest = () => {
  return (
    <Container>
      <h2 className="text-center my-5">Solicite uma Cotação</h2>
      <QuoteRequestForm />
    </Container>
  );
};

export default QuoteRequest;
