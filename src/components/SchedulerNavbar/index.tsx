import React, { useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import brandIcon from "../../assets/images/fem-logo-monocromatica.png";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import HamburgerIcon from "../../assets/icons/HamburgerIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import Dropdown from "react-bootstrap/Dropdown";
import "./_scheduler-navbar.scss";
import { signOutUser } from "../../helpers/signOutUser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { setIsSidebarOpen } from "../../redux/reducers/toggleSidebarSlice";
import AvatarIcon from "../../assets/icons/AvatarIcon";
import { Stack } from "react-bootstrap";

const brandStyle = {
  width: "auto",
  height: "40px",
};

const avatarStyle = {
  width: "auto",
  height: "40px",
};

const SchedulerNavbar = () => {
  const navigate = useNavigate();
  const isSidebarOpen = useAppSelector((state) => state.isSidebarOpen.value);
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  let displayEmail;
  let photoURL;
  if (user?.email === null) {
    displayEmail = "No identified";
  } else {
    displayEmail = user?.email;
  }
  if (user?.photoURL === null) {
    photoURL = userAvatar;
  } else {
    photoURL = user?.photoURL;
  }
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
  const toogleSidebar = useCallback(() => {
    dispatch(setIsSidebarOpen());
  }, [isSidebarOpen]);

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container fluid className="d-flex justify-content-between">
        <div className="d-flex gap-3">
          <Button
            className="p-0 m-0 bg-transparent scheduler-navbar__sidebar-btn border-0"
            onClick={toogleSidebar}
          >
            {isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
          </Button>
          <Navbar.Brand
            href="/home"
            className="scheduler-navbar__brand p-0 my-auto"
          >
            <Image src={brandIcon} style={brandStyle}></Image>
          </Navbar.Brand>
          <Navbar.Text className="d-none d-lg-block p-0 my-auto">
            LMU [Agendamentos]
          </Navbar.Text>
        </div>
        <Nav>
          <Dropdown drop="down" align="end">
            <Dropdown.Toggle 
            className="bg-transparent p-0 m-0 border-0 me-3">
              <Image src={photoURL} style={avatarStyle} roundedCircle/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.ItemText>{displayEmail}</Dropdown.ItemText>
              <Dropdown.Divider/> 
              <Dropdown.Item href="/app/users/profile">Perfil</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Configurações</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={onButtonClick}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default SchedulerNavbar;
