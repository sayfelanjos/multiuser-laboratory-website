import React, { useCallback, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/fem-logo-monocromatica.png";
import SiginIcon from "../../assets/icons/SignInIcon";
import SignOutIcon from "../../assets/icons/SignOutIcon";
import HomeIcon from "../../assets/icons/HomeIcon";
import ServicesIcon from "../../assets/icons/ServicesIcon";
import AboutIcon from "../../assets/icons/AboutIcon";
import ContactIcon from "../../assets/icons/ContactIcon";
import { useAuth } from "../../hooks/useAuth";
import { signOutUser } from "../../helpers/signOutUser";
import "./_header.scss";
import ScheduleIcon from "../../assets/icons/ScheduleIcon";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import { Person, People, Gear, Envelope } from "react-bootstrap-icons";
import {
  Container,
  Dropdown,
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Spinner,
  Stack,
} from "react-bootstrap";

const HeaderNavLink = ({
  children,
  route,
}: {
  route: string;
  children: React.ReactNode;
}) => {
  const path = useLocation();

  return (
    <Nav.Link
      as={Link}
      to={route}
      active={path.pathname === route}
      className="text-truncate"
    >
      <Stack gap={1} direction="horizontal">
        {children}
      </Stack>
    </Nav.Link>
  );
};

const HeaderDropdownItem = ({
  route,
  text,
}: {
  route: string;
  text: string;
}) => {
  const path = useLocation();

  return (
    <NavDropdown.Item
      as={Link}
      to={route}
      className={`${path.pathname === route ? "active bg-dark" : ""} text-truncate`}
    >
      {text}
    </NavDropdown.Item>
  );
};

const DropdownData = [
  {
    route: "/service/tenacity-test",
    text: "Ensaio de Tenacidade",
  },
  {
    route: "/service/compression-test",
    text: "Ensaio de Compressão",
  },
  { route: "/service/tensile-test", text: "Ensaio de Tração" },
  { route: "/service/fatigue-test", text: "Ensaio de Fadiga" },
  { route: "/service/flexion-test", text: "Ensaio de Flexão" },
  { route: "/service/charpy-impact-test", text: "Ensaio de Impacto Charpy" },
];

const Header = () => {
  const { user, role: userRole, isLoading: isAuthLoading } = useAuth();
  const path = useLocation();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Determine the previous path to navigate back after signing out
  // - If the user is signing out from a specific page, we want to
  //   redirect them back to that page
  // - If not, we default to the home page
  // - This is useful for maintaining user experience after logout
  const previousPath = path.state?.from?.pathname || "/home";

  // Handle user logout
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
        throw new Error("Error while signing out.");
      } finally {
        setIsSigningOut(false);
      }
    },
    [navigate, previousPath],
  );

  return (
    <Container fluid className="d-block p-0">
      {/* TODO: Remove the outmost container: it's redundant. */}
      <Container fluid className="p-0 shadow">
        <Navbar
          collapseOnSelect
          expand="lg"
          id="navbar"
          bg="light"
          data-bs-theme="light"
          className="navbar d-block bg-white"
        >
          <Container fluid={"lg"} className="px-3 p-lg-0">
            <Nav.Link as={Link} to="/home" className="p-0 px-3 ps-lg-0">
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
                  <Nav className="justify-content-end flex-grow-1">
                    {/* START: Login Button ============================================= */}
                    <div
                      id="login-container"
                      className="header__login-container m-0 p-0 w-lg"
                    >
                      {isAuthLoading || isSigningOut ? (
                        <div
                          className="ms-3 d-flex justify-content-center align-items-center"
                          style={{ height: "40px" }}
                        >
                          <Spinner animation="border" role="status" />
                        </div>
                      ) : user ? (
                        <Nav.Item>
                          <Dropdown drop="down" align="end">
                            <Dropdown.Toggle className="bg-transparent p-0 m-0 border-0 ms-lg-3 text-black">
                              <Image
                                src={user?.photoURL || userAvatar}
                                alt="User"
                                style={{ width: "auto", height: "40px" }}
                                roundedCircle
                              />
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="mt-2 mt-lg-1">
                              <Dropdown.ItemText>
                                <span className="d-block mb-3 p-0 text-center fw-bold">
                                  {user?.displayName}
                                </span>
                                <span className="mb-2 text-center fw-light text-nowrap">
                                  <Envelope /> {user?.email || "No identified"}
                                </span>
                              </Dropdown.ItemText>

                              <Dropdown.Divider />

                              <Dropdown.Item as={Link} to="/app/users/profile">
                                <Person /> Perfil
                              </Dropdown.Item>

                              {userRole === "admin" && (
                                <Dropdown.Item as={Link} to="/app/users/list">
                                  <People /> Gerenciar Usuários
                                </Dropdown.Item>
                              )}

                              <Dropdown.Item as={Link} to="#/action-2" disabled>
                                <Gear /> Configurações
                              </Dropdown.Item>

                              <Dropdown.Divider />

                              <Dropdown.Item onClick={handleLogout}>
                                <Stack gap={2} direction="horizontal">
                                  <SignOutIcon />
                                  Logout
                                </Stack>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Nav.Item>
                      ) : (
                        <Nav.Link
                          as={Link}
                          to="/signin"
                          state={{ from: path.pathname }}
                          className="text-truncate text-decoration-none nav-link p-2"
                        >
                          <Stack gap={1} direction="horizontal">
                            <SiginIcon />
                            Entrar
                          </Stack>
                        </Nav.Link>
                      )}
                    </div>
                    {/* END: Login Button ============================================= */}

                    <hr className="d-lg-none" />

                    <HeaderNavLink route="/home">
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

                    <HeaderNavLink route="/about">
                      <AboutIcon />
                      Sobre o LMU
                    </HeaderNavLink>

                    <HeaderNavLink route="/contact">
                      <ContactIcon />
                      Contato
                    </HeaderNavLink>

                    <Nav.Item>
                      <Link
                        to={user ? "/app/scheduler" : "/signin"}
                        state={
                          user
                            ? undefined
                            : { from: { pathname: "/app/scheduler" } }
                        }
                        className="mt-3 mt-lg-0 ms-lg-2 btn btn-dark"
                      >
                        <Stack gap={2} direction="horizontal">
                          Agendamentos
                          <ScheduleIcon />
                        </Stack>
                      </Link>
                    </Nav.Item>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </Container>
  );
};

export default Header;
