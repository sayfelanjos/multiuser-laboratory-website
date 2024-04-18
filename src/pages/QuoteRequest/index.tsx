import React from "react";
import Container from "react-bootstrap/Container";
import QuoteRequestForm from "../../components/QuoteRequestForm";

const QuoteRequest = () => {
  // const [validated, setValidated] = useState(false);
  //
  // const handleSubmit = (event: {
  //   currentTarget: any;
  //   preventDefault: () => void;
  //   stopPropagation: () => void;
  // }) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //
  //   setValidated(true);
  // };
  return (
    <Container className="mt-auto">
      <QuoteRequestForm />
    </Container>
  );
};

export default QuoteRequest;
