import React from "react";
import Container from "react-bootstrap/Container";
import "./_user-add-page.scss";
import UserForm from "../../components/UserForm";

const UserAdd = () => {
  return (
    <>
      <Container className="user-add-page__ctn">
        <UserForm />
      </Container>
    </>
  );
};

export default UserAdd;
