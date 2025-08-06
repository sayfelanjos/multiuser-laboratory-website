import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/fem-logo-monocromatica.png";
import Stack from "react-bootstrap/Stack";
import SiginIcon from "../../assets/icons/SignInIcon";
import HomeIcon from "../../assets/icons/HomeIcon";
import ServicesIcon from "../../assets/icons/ServicesIcon";
import AboutIcon from "../../assets/icons/AboutIcon";
import ContactIcon from "../../assets/icons/ContactIcon";
import { useAuth } from "../../hooks/useAuth";
import { signOutUser } from "../../helpers/signOutUser";
import { useLocation } from "react-router-dom";
import "./_header.scss";
import ScheduleIcon from "../../assets/icons/ScheduleIcon";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";

const HeaderNavLink = ({
  children,
  url,
}: {
  url?: string;
  children: React.ReactNode;
}) => {
  const path = useLocation();

  return (
    <Nav.Link
      href={url}
      active={path.pathname === url}
      className={`text-truncate`}
    >
      <Stack gap={1} direction="horizontal">
        {children}
      </Stack>
    </Nav.Link>
  );
};

const HeaderDropdownItem = ({ url, text }: { url: string; text: string }) => {
  const path = useLocation();

  return (
    <NavDropdown.Item
      href={url}
      className={`${path.pathname === url ? "active bg-dark" : ""} text-truncate`}
    >
      {text}
    </NavDropdown.Item>
  );
};

const DropdownData = [
  {
    url: "/service/tenacity-test",
    text: "Ensaio de Tenacidade",
  },
  {
    url: "/service/compression-test",
    text: "Ensaio de Compressão",
  },
  { url: "/service/tensile-test", text: "Ensaio de Tração" },
  { url: "/service/fatigue-test", text: "Ensaio de Fadiga" },
  { url: "/service/flexion-test", text: "Ensaio de Flexão" },
  { url: "/service/charpy-impact-test", text: "Ensaio de Impacto Charpy" },
];

const Header = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const path = useLocation();
  const navigate = useNavigate();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const previousPath = path.state?.from?.pathname || "/home";
  const handleLogout = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setIsSigningOut(true);
      try {
        const logoutMoment = signOutUser();
        const minSpinnerTime = new Promise((resolve) =>
          setTimeout(resolve, 500),
        );
        await Promise.all([logoutMoment, minSpinnerTime]);
        navigate(previousPath, { replace: true });
      } catch (error) {
        throw new Error("Error while signing out");
      } finally {
        setIsSigningOut(false);
      }
    },
    [navigate, previousPath],
  );

  if (isAuthLoading || isSigningOut) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "56px" }}
      >
        <Spinner animation="border" role="status" />
      </div>
    );
  }

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
          <Container fluid={"lg"} className="px-3">
            <Nav.Link href="/home" className="py-0 px-3">
              <img
                src={logo}
                style={{ width: "auto", height: "40px" }}
                alt="FEM Unicamp Logo"
              />
            </Nav.Link>
            <Navbar.Text className="fw-bold lh-sm fs-6 p-0 d-none d-lg-block">
              [Laboratório Multi Usuário]
            </Navbar.Text>
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
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <HeaderNavLink url="/home">
                      <HomeIcon />
                      Início
                    </HeaderNavLink>

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
                      {DropdownData.map((item, index) => (
                        <HeaderDropdownItem key={index} {...item} />
                      ))}
                    </NavDropdown>

                    <HeaderNavLink url="/about">
                      <AboutIcon />
                      Sobre o LMU
                    </HeaderNavLink>

                    <HeaderNavLink url="/contact">
                      <ContactIcon />
                      Contato
                    </HeaderNavLink>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Navbar.Collapse>
            <Stack
              direction="horizontal"
              className="ms-auto align-items-center me-3"
            >
              <Link
                to={user ? "/app/scheduler" : "/signin"}
                state={
                  !user ? { from: { pathname: "/app/scheduler" } } : undefined
                }
                className="btn btn-dark d-none d-lg-block"
              >
                <Stack gap={2} direction="horizontal">
                  Agendamentos
                  <ScheduleIcon />
                </Stack>
              </Link>
              {!user ? (
                <Nav.Link
                  as={Link}
                  to="/signin"
                  state={{ from: path.pathname }}
                  className="text-truncate text-decoration-none nav-link p-2 text-decoration-none nav-link"
                >
                  <Stack gap={2} direction="horizontal">
                    <SiginIcon />
                    Entrar
                  </Stack>
                </Nav.Link>
              ) : (
                <Nav>
                  <Dropdown
                    drop="down"
                    align="end"
                    className="d-none d-lg-block"
                  >
                    <Dropdown.Toggle className="bg-transparent p-0 m-0 border-0 ms-3 text-black">
                      <Image
                        src={
                          user?.photoURL == null ? userAvatar : user?.photoURL
                        }
                        style={{ width: "auto", height: "40px" }}
                        roundedCircle
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.ItemText>
                        {user?.email == null ? "No identified" : user?.email}
                      </Dropdown.ItemText>
                      <Dropdown.Divider />
                      <Dropdown.Item href="/app/users/profile">
                        Perfil
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Configurações
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              )}
            </Stack>
          </Container>
        </Navbar>
      </Container>
    </Container>
  );
};

export default Header;
