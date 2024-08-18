import React, { useCallback } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/FEM_monocromatica.png";
import Stack from "react-bootstrap/Stack";
import SignInIcon from "../../assets/icons/SignInIcon";
import SiginIcon from "../../assets/icons/SignInIcon";
import HomeIcon from "../../assets/icons/HomeIcon";
import ServicesIcon from "../../assets/icons/ServicesIcon";
import AboutIcon from "../../assets/icons/AboutIcon";
import ContactIcon from "../../assets/icons/ContactIcon";
import { useAuth } from "../../hooks/useAuth";
import Button from "react-bootstrap/Button";
import { signOutUser } from "../../helpers/signOutUser";
import SignOutIcon from "../../assets/icons/SignOutIcon";
import { useLocation } from "react-router-dom";
import "./_header.scss";
import ScheduleIcon from "../../assets/icons/ScheduleIcon";

const navbarBrandStyle = {
  width: "auto",
  height: "40px",
};

const Header = () => {
  const { user } = useAuth();
  const path = useLocation();
  const navigate = useNavigate();

  const onButtonClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      try {
        await signOutUser();
        navigate("/home");
      } catch (error) {
        throw new Error("Error while signing out");
      }
    },
    [],
  );

  return (
    <Container fluid className="d-block p-0">
      <Container fluid className="p-0">
        <Navbar
          collapseOnSelect
          expand="lg"
          id="navbar"
          bg="light"
          data-bs-theme="light"
          className="navbar d-block"
        >
          <Container fluid className="px-3">
            <Nav.Link href="/home" className="py-0 px-3">
              <img src={logo} style={navbarBrandStyle} alt="FEM Unicamp Logo" />
            </Nav.Link>
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
                        path.pathname === "/home" || path.pathname === "/"
                      }
                      className="text-truncate"
                    >
                      <Stack gap={1} direction="horizontal">
                        <HomeIcon />
                        Início
                      </Stack>
                    </Nav.Link>
                    <NavDropdown
                      title={
                        <Stack
                          gap={1}
                          direction="horizontal"
                          className={`d-inline-flex nav-link p-0 ${path.pathname.startsWith("/service") ? "header__nav-active-color" : ""}`}
                        >
                          <ServicesIcon />

                          <span>Serviços</span>
                        </Stack>
                      }
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item
                        href="/service/tenacity-test"
                        className={`${path.pathname === "/service/tenacity-test" ? "active bg-dark" : ""} text-truncate`}
                      >
                        Ensaio de Tenacidade
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/service/compression-test"
                        className={`${path.pathname === "/service/compression-test" ? "active bg-dark" : ""} text-truncate`}
                      >
                        Ensaio de Compressão
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/service/tensile-test"
                        className={`${path.pathname === "/service/tensile-test" ? "active bg-dark" : ""} text-truncate`}
                      >
                        Ensaio de Tração
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/service/fatigue-test"
                        className={`${path.pathname === "/service/fatigue-test" ? "active bg-dark" : ""} text-truncate`}
                      >
                        Ensaio de Fadiga
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/service/flexion-test"
                        className={`${path.pathname === "/service/flexion-test" ? "active bg-dark" : ""} text-truncate`}
                      >
                        Ensaio de Flexão
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/service/charpy-impact-test"
                        className={`${path.pathname === "/service/charpy-impact-test" ? "active bg-dark" : ""} text-truncate`}
                      >
                        Ensaio de Impacto Charpy
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link
                      href="/about"
                      className={`text-truncate p-2 text-decoration-none nav-link ${path.pathname === "/about" ? "active" : ""}`}
                    >
                      <Stack gap={1} direction="horizontal">
                        <AboutIcon />
                        Sobre o LMU
                      </Stack>
                    </Nav.Link>
                    <Nav.Link
                      href="/contact"
                      className={`text-truncate p-2 text-decoration-none nav-link ${path.pathname === "/contact" ? "active" : ""}`}
                    >
                      <Stack gap={1} direction="horizontal">
                        <ContactIcon />
                        Contato
                      </Stack>
                    </Nav.Link>
                    <hr />
                    <Nav.Link
                      href="/signin"
                      className="text-truncate d-lg-none text-decoration-none nav-link p-2 text-decoration-none nav-link"
                    >
                      <Stack gap={2} direction="horizontal">
                        <SiginIcon />
                        Entrar
                      </Stack>
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Navbar.Collapse>
            <Link
              to="/app/scheduler"
              className="btn btn-dark d-none d-lg-block"
            >
              <Stack gap={2} direction="horizontal">
                Agendamentos
                <ScheduleIcon />
              </Stack>
            </Link>
          </Container>
        </Navbar>
      </Container>
    </Container>
  );
};

export default Header;
