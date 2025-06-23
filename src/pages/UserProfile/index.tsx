import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { deleteUser, User } from "firebase/auth";
import "./_user-profile-page.scss";
import { getCurrentUser } from "../../helpers/getCurrentUser";
import Spinner from "react-bootstrap/Spinner";
import { showNotification } from "../../helpers/showNotification";
import { App } from "antd";
import Modal from "../../components/Modal/Modal";
import EditableInformation from "../../components/EditableInformation/EditableInformation";
import { signOutUser } from "../../helpers/signOutUser";
import { useNavigate } from "react-router-dom";


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
  const [isDeletAccountModalOpen, setDeletAccountModalOpen] = useState(false);
  const navigate = useNavigate();


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

    const signOutButtonClick = useCallback(
      
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
        <EditableInformation title="Nome" info={name} />

        <EditableInformation title="Email" info={email} />

        <EditableInformation title="Telefone" info={phone} />
      </div>

      <Button
        className="btn-danger delete-account"
        onClick={() => setLogoutModalOpen(true)}
      >
        <span className="mx-5 fixed-bottom-btn ">Sair</span>
      </Button>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      >
        <h3 className="modal-title">Tem certeza de que deseja sair?</h3>
        <div className="center-content">
          <div>
            <button
              className="button-1"
              onClick={signOutButtonClick}
            >
              Sair
            </button>
          </div>
          <div>
            <button
              className="button-2"
              onClick={() => setLogoutModalOpen(false)}
            >
              Cancelar
            </button>
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

      <Button
        className="btn-danger delete-account"
        onClick={() => setDeletAccountModalOpen(true)}
      >
        <span className="mx-5 fixed-bottom-btn ">Apagar conta</span>
      </Button>

      <Modal
        isOpen={isDeletAccountModalOpen}
        onClose={() => setDeletAccountModalOpen(false)}
      >
        <h3 className="modal-title">Sua conta será deletada permanentemente</h3>
        <div className="center-content">
          <div>
            <button
              className="button-1"
              onClick={() => setDeletAccountModalOpen(false)}
            >
              Apagar conta
            </button>
          </div>
          <div>
            <button
              className="button-2"
              onClick={() => setDeletAccountModalOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default UserProfile;
