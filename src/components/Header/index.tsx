import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../../assets/images/FEM_monocromatica.png";

const navbarBrandStyle = {
  width: "auto",
  height: "40px",
};

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      id="navbar"
      bg="light"
      data-bs-theme="light"
      className="navbar"
      fixed="top"
    >
      <Container fluid="lg">
        <Navbar.Brand href="/" className="py-0">
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
                <Nav.Link
                  href="/"
                  active={
                    location.pathname === "/home" || location.pathname === "/"
                  }
                  className="text-truncate"
                >
                  Início
                </Nav.Link>
                <NavDropdown title="Serviços" id="basic-nav-dropdown">
                  <NavDropdown.Item
                    href="/service/tenacity-test"
                    className={`${location.pathname === "/service/tenacity-test" ? "active bg-dark" : ""} text-truncate`}
                  >
                    Ensaio de Tenacidade
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/service/compression-test"
                    className={`${location.pathname === "/service/compression-test" ? "active bg-dark" : ""} text-truncate`}
                  >
                    Ensaio de Compressão
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/service/tensile-test"
                    className={`${location.pathname === "/service/tensile-test" ? "active bg-dark" : ""} text-truncate`}
                  >
                    Ensaio de Tração
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/service/fatigue-test"
                    className={`${location.pathname === "/service/fatigue-test" ? "active bg-dark" : ""} text-truncate`}
                  >
                    Ensaio de Fadiga
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/service/flexion-test"
                    className={`${location.pathname === "/service/flexion-test" ? "active bg-dark" : ""} text-truncate`}
                  >
                    Ensaio de Flexão
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/service/charpy-impact-test"
                    className={`${location.pathname === "/service/charpy-impact-test" ? "active bg-dark" : ""} text-truncate`}
                  >
                    Ensaio de Impacto Charpy
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  href="/quote-request"
                  active={location.pathname === "/quote-request"}
                  className="text-truncate"
                >
                  Orçamento
                </Nav.Link>
                <NavDropdown title="Agendamentos">
                  <NavDropdown.Item className="" href="/calendar/durometer">
                    Durômetro
                  </NavDropdown.Item>
                  <NavDropdown.Item className="" href="/calendar/mechanic-test">
                    Ensaio Mecânico
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    className=""
                    href="/calendar/scanning-electron-microscopy"
                  >
                    Microscopia Eletrônica de Varredura
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className=""
                    href="/calendar/impact-pendulum"
                  >
                    Pêndulo de Impacto
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  href="/about"
                  active={location.pathname === "/about"}
                  className="text-truncate"
                >
                  Sobre o LMU
                </Nav.Link>
                <Nav.Link
                  href="/contact"
                  active={location.pathname === "/contact"}
                  className="text-truncate"
                >
                  Contato
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
