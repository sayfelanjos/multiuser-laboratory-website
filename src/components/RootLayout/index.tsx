import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Container fluid className="main-content">
        <Outlet />
      </Container>

      <Footer />
    </>
  );
};

export default RootLayout;
