import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { Outlet, ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  return (
    <Container fluid className="p-0 root-layout__ctn">
      <Header />
      <Container fluid className="root-layout__main">
        <Outlet />
      </Container>
      <Footer />
      <ScrollRestoration />
    </Container>
  );
};

export default RootLayout;
