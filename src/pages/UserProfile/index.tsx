import React, { useCallback, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "./_user-profile-page.scss";
import { getCurrentUser } from "../../helpers/getCurrentUser";
import { App } from "antd";
import Modal from "../../components/Modal/Modal";
import EditableInformation from "../../components/EditableInformation/EditableInformation";
import EditableInformationPhone from "../../components/EditableInformation/EditableInformationPhone";
import EditableInformationName from "../../components/EditableInformation/EditableInformationName";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../helpers/deleteAccount";

const UserProfile = () => {
  const { notification } = App.useApp();

  const userInfo = getCurrentUser()?.providerData[0];
  const name = userInfo?.displayName;
  const email = userInfo?.email;
  const phone = userInfo?.phoneNumber;
  const imageURL = userInfo?.photoURL;
  const firstName = name ? getFirstName(name) : "";
  const secondName = name ? getSecondName(name) : "";
  const [isDeletAccountModalOpen, setDeletAccountModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      await deleteAccount();
      notification.success({ message: "Conta deletada com sucesso!" });
    } catch (err: any) {
      notification.error({ message: "Erro ao deletar conta" });
    }
  };

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
        <EditableInformationName title="Nome" info={name} editable={true} />
        <EditableInformationPhone title="Telefone" info={phone} editable={true} />
        <EditableInformation title="Email" info={email} editable={false} />
      </div>

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
              onClick={() => {
                setDeletAccountModalOpen(false);
                handleDeleteUser();
              }}
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
