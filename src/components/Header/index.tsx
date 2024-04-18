import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from "../../assets/images/FEM_monocromatica.png";
import React from "react";

const navbarBrandStyle = {
  width: "auto",
  height: "40px",
};

const Header = () => {
  return (
    <Navbar
      expand="lg"
      id="navbar"
      bg="light"
      data-bs-theme="light"
      className="navbar"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} style={navbarBrandStyle} alt="FEM Unicamp Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/">Home</Nav.Link>
                <NavDropdown title="Serviços" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/service/tenacity-test">
                    Ensaio de Tenacidade
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/service/compression-test">
                    Ensaio de Compressão
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/service/tensile-test">
                    Ensaio de Tração
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/service/fatigue-test">
                    Ensaio de Fadiga
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/service/flexion-test">
                    Ensaio de Flexão
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/service/charpy-impact-test">
                    Ensaio de Impacto Charpy
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/quote-request">Cotação</Nav.Link>
                <Nav.Link href="/about">Sobre o LEM</Nav.Link>
                <Nav.Link href="/contact">Contato</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="dark">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
