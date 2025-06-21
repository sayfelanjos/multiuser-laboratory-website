import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { deleteUser, User } from "firebase/auth";
import "./_user-profile-page.scss";
import { getCurrentUser } from "../../helpers/getCurrentUser";
import Spinner from "react-bootstrap/Spinner";
import { showNotification } from "../../helpers/showNotification";
import { App } from "antd";
import Modal from "../../components/Modal/Modal"

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { notification } = App.useApp();

  const userInfo = getCurrentUser()?.providerData[0];
  const name = userInfo?.displayName;
  const email = userInfo?.email;
  const phone = userInfo?.phoneNumber;
  const imageURL = userInfo?.photoURL;
  const cpfcpnj = "";
  const firstName = name ? getFirstName(name) : "";
  const secondName = name ? getSecondName(name) : "";
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  
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

  function getFirstName(fullName: string): string {
    const parts = fullName.trim().split(" ");
    return parts[0] || "";
  }

  function getSecondName(fullName: string): string {
    const parts = fullName.trim().split(" ");
    return parts.length > 1 ? parts[1] : "";
  }

  return (
    <Container fluid className="user-profile-page__ctn">
      <h3>Informações do usuário</h3>

      <img
        className="user-photo"
        src={
          imageURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}+${encodeURIComponent(secondName)}`
        }
        alt="Foto do usuário"
      />

      <div>
        <div className="info-row">
          <div className="type-of-info">Nome:</div>
          <div className={name ? "info-value" : "info-value info-empty"}>
            {name || "Adicione um nome"}
          </div>
        </div>

        <div className="info-row">
          <div className="type-of-info">Email:</div>{" "}
          <div className={email ? "info-value" : "info-value info-empty"}>
            {email || "Adicione um e-mail"}
          </div>
        </div>

        <div className="info-row">
          <div className="type-of-info">Telefone:</div>{" "}
          <div className={phone ? "info-value" : "info-value info-empty"}>
            {phone || "Adicione um telefone"}
          </div>
        </div>
      </div>

      <Button
        className="btn-danger delete-account"
        onClick={() => setLogoutModalOpen(true)}>
        <span className="mx-5 fixed-bottom-btn ">Sair</span>
      </Button>

      <Modal isOpen={isLogoutModalOpen} onClose={() => setLogoutModalOpen(false)}>
        <h3  className="modal-title">Tem certeza de que deseja sair?</h3>
        <div className="center-content">
          <div>
            <button className="button-1" onClick={() => setLogoutModalOpen(false)}>Sair</button>
          </div>
          <div>
          <button className="button-2" onClick={() => setLogoutModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      </Modal>

      <Button
        className="btn-danger delete-account"
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
          <span className="mx-5 fixed-bottom-btn ">Apagar conta</span>
        )}
      </Button>
    </Container>
  );
};

export default UserProfile;
