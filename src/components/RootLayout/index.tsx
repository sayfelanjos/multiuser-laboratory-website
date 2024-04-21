import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Container from "react-bootstrap/Container";
import { Outlet, ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Container fluid className="p-0">
        <Header />
        <Container fluid className="main p-0 position-relative top-0 bottom-0">
          <Outlet />
        </Container>
        <Footer />
      </Container>
      <ScrollRestoration />
    </>
  );
};

export default RootLayout;
