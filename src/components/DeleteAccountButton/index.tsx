// src/components/DeleteAccountButton.tsx

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import { User } from "firebase/auth"; // Import User type
import { FirebaseError } from "firebase/app";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase"; // Assuming path
import { App } from "antd"; // For notifications
import { showNotification } from "../../helpers/showNotification"; // Assuming path
import WarningIcon from "../../assets/icons/WarningIcon"; // Assuming path

interface DeleteAccountButtonProps {
  user: User | null;
}

const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = ({ user }) => {
  // Use AntD notification hook if available in this context
  const { notification } = App.useApp();

  // State moved from UserProfile
  const [loadingAccountDeletion, setLoadingAccountDeletion] =
    useState<boolean>(false);
  const [isDeletionModalShowing, setIsDeletionModalShowing] =
    useState<boolean>(false);
  const [deletionText, setDeletionText] = useState<string>("");
  const deletionField = useRef<HTMLInputElement>(null);

  // Modal handlers moved from UserProfile
  const showDeletionModal = useCallback(() => {
    setDeletionText(""); // Reset text when showing
    setIsDeletionModalShowing(true);
  }, []);

  const closeDeletionModal = useCallback(() => {
    setDeletionText("");
    setIsDeletionModalShowing(false);
  }, []);

  // Deletion logic moved from UserProfile
  const handleAccountDeletion = useCallback(async () => {
    setLoadingAccountDeletion(true);
    const deleteUserFunction = httpsCallable(functions, "deleteUser");

    if (!user) {
      showNotification(notification, "Dados de usuário ausentes!", "error");
      setLoadingAccountDeletion(false);
      return;
    }

    try {
      await deleteUserFunction({ uid: user.uid });
      showNotification(
        notification,
        `Conta ${user.email} deletada com sucesso! Você será desconectado.`,
        "success",
      );

      // Ideally, trigger sign-out after a short delay or upon success
      // auth.signOut(); // Requires auth instance
      // navigate('/signin'); // Requires navigate instance
    } catch (error) {
      let message = `Conta ${user.email} não pode ser deletada!`;
      if (
        error instanceof FirebaseError &&
        (error.code === "functions/unauthenticated" ||
          error.message.includes("requires-recent-login")) // Check specific error codes
      ) {
        message += " Você precisa sair e entrar novamente na aplicação.";
      } else {
        console.error(
          "Error when deleting user:",
          error instanceof Error ? error.message : error,
        );
      }
      showNotification(notification, message, "error");
    } finally {
      setLoadingAccountDeletion(false);
      closeDeletionModal(); // Close modal after attempt
    }
  }, [notification, user, functions, closeDeletionModal]); // Added dependencies

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={() => {
          setDeletionText("");
          showDeletionModal();
        }}
        disabled={loadingAccountDeletion}
      >
        {loadingAccountDeletion ? (
          <span className="d-flex align-items-center gap-2">
            <Spinner as="span" animation="border" size="sm" /> Apagando conta...
          </span>
        ) : (
          "Apagar conta"
        )}
      </Button>

      {/* ACCOUNT DELETION MODAL (Remains here) */}
      <Modal
        show={isDeletionModalShowing}
        onHide={closeDeletionModal}
        animation={true}
        centered
        onEntered={() => deletionField.current?.focus()}
      >
        <Modal.Header closeButton>
          <Modal.Title as="h3" className="d-flex align-items-center gap-2">
            <WarningIcon /> Atenção
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A sua conta de usuário será apagada permanentemente. Deseja
            realmente prosseguir?
          </p>
          <Form.Group className="mb-3" controlId="deleteConfirmInput">
            <Form.Label>
              Digite &quot;<span className="text-danger">deletar</span>&quot;
              para confirmar:
            </Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              className="text-danger"
              value={deletionText}
              placeholder="digite aqui..."
              onChange={(e) => setDeletionText(e.target.value)}
              ref={deletionField}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={closeDeletionModal}>
            Não
          </Button>
          <Button
            variant={deletionText === "deletar" ? "danger" : "outline-danger"}
            onClick={
              deletionText === "deletar"
                ? handleAccountDeletion
                : () => deletionField.current?.focus()
            }
            disabled={loadingAccountDeletion || deletionText !== "deletar"} // Disable during loading
          >
            {loadingAccountDeletion ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              "Sim, Deletar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteAccountButton;
