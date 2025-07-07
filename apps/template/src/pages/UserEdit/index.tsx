import React from "react";
import Container from "react-bootstrap/Container";
import UserForm from "../../components/UserForm";
import "./_user-edit-page.scss";

const UserEdit = () => {
  return (
    <>
      <Container className="user-edit-page__ctn">
        <UserForm />
      </Container>
    </>
  );
};

export default UserEdit;
