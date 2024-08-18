import React, { useCallback } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import brandIcon from "../../assets/images/FEM_monocromatica.png";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import "./_scheduler-navbar.scss";
import { signOutUser } from "../../helpers/signOutUser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import userAvatar from "../../assets/images/carbon--user-avatar-filled.png";

const brandStyle = {
  width: "auto",
  height: "40px",
};

const avatarStyle = {
  width: "auto",
  height: "40px",
};

const SchedulerHeader = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  let displayName;
  let photoURL;
  if (user?.displayName === null) {
    displayName = "No identified";
  } else {
    displayName = user?.displayName;
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

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
      <Container fluid className="d-flex justify-content-between">
        <div className="p-0">
          <Navbar.Brand href="/home" className="scheduler-navbar__brand">
            <Image src={brandIcon} style={brandStyle}></Image>
          </Navbar.Brand>
          <Navbar.Text>LMU [Agendamentos]</Navbar.Text>
        </div>
        <Nav>
          <Navbar.Text className="py-0 my-auto me-3 text">
            {displayName}
          </Navbar.Text>
          <Dropdown drop="down" align="end">
            <Dropdown.Toggle className="bg-transparent border-0 p-0">
              <Image src={photoURL} style={avatarStyle} roundedCircle />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Perfil</Dropdown.Item>
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

export default SchedulerHeader;
