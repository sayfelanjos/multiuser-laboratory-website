import React from "react";
import { Spinner, Container } from "react-bootstrap";

const ApprovalReq = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Spinner animation="border" role="status" variant="primary" style={{ width: "4rem", height: "4rem" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <h3 className="mt-4">Aguardando aprovação</h3>
    </Container>
  );
};

export default ApprovalReq;
