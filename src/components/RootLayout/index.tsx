import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Container from "react-bootstrap/Container";
import { Outlet, ScrollRestoration } from "react-router-dom";
const RootLayout = () => {
  return (
    <Container fluid className="p-0 root-layout__ctn bg-light h-100">
      <Header />
      <Container fluid className="p-0 root-layout__main">
        <Outlet />
      </Container>
      <Footer />
      <ScrollRestoration />
    </Container>
  );
};

export default RootLayout;
