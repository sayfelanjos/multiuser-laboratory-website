import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { deleteUser, User } from "firebase/auth";
import "./_user-profile-page.scss";
import { getCurrentUser } from "../../helpers/getCurrentUser";
import Spinner from "react-bootstrap/Spinner";
import { showNotification } from "../../helpers/showNotification";
import { App } from "antd";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { notification } = App.useApp();

  const handleOnClick = useCallback(() => {
    const user = getCurrentUser();
    const userEmail = user?.providerData[0].email;
    setIsLoading(true);
    setTimeout(() => {
      deleteUser(user as User)
        .then(() => {
          showNotification(
            notification,
            `Usuário ${userEmail} deletado com sucesso!`,
            "success",
          );
          console.log(`Usuário ${userEmail} deletado com sucesso!`);
        })
        .catch((error) => {
          showNotification(
            notification,
            `Usuário ${userEmail} não pode ser deletado! Você precisa sair e entrar novamente na aplicação.`,
            "error",
          );
          console.error(error.message);
        });
    }, 2000);
  }, []);

  return (
    <Container fluid className="user-profile-page__ctn">
      <Button
        className="btn-danger"
        onClick={handleOnClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="mx-2">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="ms-3">Apagando conta</span>
          </span>
        ) : (
          <span className="mx-5">Apagar conta</span>
        )}
      </Button>
    </Container>
  );
};

export default UserProfile;
