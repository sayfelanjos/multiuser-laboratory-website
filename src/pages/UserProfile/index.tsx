import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { deleteUser, User } from "firebase/auth";
import "./_user-profile-page.scss";
// import { getCurrentUser } from "../../helpers/getCurrentUser";
import Spinner from "react-bootstrap/Spinner";
import { showNotification } from "../../helpers/showNotification";
import { App } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
// import { httpsCallable } from "firebase/functions";
// import { functions } from "../../firebase";

const UserProfile = () => {
  const { user, isLoading: loadingUser, role: userRole } = useAuth();
  const [loadingAccountDeletion, setLoadingAccountDeletion] =
    useState<boolean>(false);
  const { notification } = App.useApp();

  const handleAccountDeletion = useCallback(() => {
    const userEmail = user?.providerData[0].email;
    setLoadingAccountDeletion(true);
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
      <Link
        to={loadingUser ? "#" : "/app/users/edit/" + user?.uid}
        className={
          "btn m-3 " + loadingUser ? "btn-secondary disabled" : "btn-primary"
        }
      >
        <span className="m-3 btn btn-primary">Editar perfil</span>
      </Link>
      {userRole === "admin" && (
        <Link to="/app/users/list" className="btn btn-primary m-3">
          Gerenciar Usuários
        </Link>
      )}
      <Button
        className="btn-danger m-3"
        onClick={handleAccountDeletion}
        disabled={loadingAccountDeletion}
      >
        {loadingAccountDeletion ? (
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
