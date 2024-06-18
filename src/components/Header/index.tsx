import React, { useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import logo from "../../assets/images/FEM_monocromatica.png";
import Stack from "react-bootstrap/Stack";
import SignInIcon from "../../assets/icons/SignInIcon";
import SiginIcon from "../../assets/icons/SignInIcon";
import HomeIcon from "../../assets/icons/HomeIcon";
import ServicesIcon from "../../assets/icons/ServicesIcon";
import EstimateIcon from "../../assets/icons/EstimateIcon";
import ScheduleIcon from "../../assets/icons/ScheduleIcon";
import AboutIcon from "../../assets/icons/AboutIcon";
import ContactIcon from "../../assets/icons/ContactIcon";
import { useAuth } from "../../hooks/useAuth";
import Button from "react-bootstrap/Button";
import { signOutUser } from "../../helpers/signOutUser";

const navbarBrandStyle = {
  width: "auto",
  height: "40px",
};

const Header = () => {
  const authState = useAuth();
  const onButtonClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      try {
        await signOutUser();
      } catch (error) {
        throw new Error("Error while signing out");
      }
    },
    [],
  );

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
      <Container fluid className="px-3">
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
                Menu
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
                  <Stack gap={1} direction="horizontal" className="d-lg-none">
                    <HomeIcon />
                    Início
                  </Stack>
                </Nav.Link>
                <NavDropdown
                  title={
                    <Stack
                      gap={1}
                      direction="horizontal"
                      className="d-inline-flex"
                    >
                      <ServicesIcon />
                      Serviços
                    </Stack>
                  }
                  id="basic-nav-dropdown"
                >
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
                  className={`text-truncate ${authState.user ? "" : "d-none"}`}
                >
                  <Stack gap={1} direction="horizontal">
                    <EstimateIcon />
                    Orçamento
                  </Stack>
                </Nav.Link>
                <NavDropdown
                  title={
                    <Stack
                      gap={1}
                      direction="horizontal"
                      className="d-inline-flex"
                    >
                      <ScheduleIcon />
                      Agendamentos
                    </Stack>
                  }
                >
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
                  <Stack gap={1} direction="horizontal">
                    <AboutIcon />
                    Sobre o LMU
                  </Stack>
                </Nav.Link>
                <Nav.Link
                  href="/contact"
                  active={location.pathname === "/contact"}
                  className="text-truncate"
                >
                  <Stack gap={1} direction="horizontal">
                    <ContactIcon />
                    Contato
                  </Stack>
                </Nav.Link>
                <hr />
                {authState.user ? (
                  <Button variant="light">
                    <Stack
                      gap={2}
                      direction="horizontal"
                      onClick={onButtonClick}
                    >
                      <SignInIcon />
                      Sair
                    </Stack>
                  </Button>
                ) : (
                  <Nav.Link href="/signin" className="text-truncate d-lg-none">
                    <Stack gap={2} direction="horizontal">
                      <SiginIcon />
                      Entrar
                    </Stack>
                  </Nav.Link>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar.Collapse>
        {authState.user ? (
          <Button variant="dark">
            <Stack gap={2} direction="horizontal" onClick={onButtonClick}>
              Sair
              <SignInIcon />
            </Stack>
          </Button>
        ) : (
          <Link to="/signin" className="btn btn-dark d-none d-lg-block">
            <Stack gap={2} direction="horizontal">
              Entrar
              <SignInIcon />
            </Stack>
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
