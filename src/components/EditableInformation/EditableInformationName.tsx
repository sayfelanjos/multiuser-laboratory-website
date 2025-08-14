import React, { useState } from "react";
import "./EditableInformation.scss";
import { Button, FormControl } from "react-bootstrap";
import validateName from "../../helpers/validateName"
import { editUserInformation } from "../../helpers/editUserInfo";

type EditableInformationProps = {
  title: string;
  info?: string | null;
  editable: boolean;
};

const EditableInformationName: React.FC<EditableInformationProps> = ({
  title,
  info,
  editable,
}) => {
  const [editPressed, setEditPressed] = useState(false);
  const [editedValue, setEditedValue] = useState(info || "");

  const handleSave = async () => {
    if (!validateName(editedValue)) {
      alert("Nome inválido.");
      return;
    }

    try {
      const parts = editedValue.trim().split(" ");
      const firstName = parts[0] || "";

      let secondName = "";

    for (let i = 1; i < parts.length; i++) {
      secondName += parts[i];
      if (i < parts.length - 1) {
        secondName += " ";
        }
      }

      await editUserInformation(firstName, secondName, "");

      console.log("Nome atualizado:", editedValue);
      setEditPressed(false);
    } catch (error) {
      console.error("Erro ao atualizar número de telefone:", error);
      alert("Erro ao salvar as informações. Tente novamente.");
    }
  };

  const handleCancel = () => {
    setEditedValue(editedValue||"");
    setEditPressed(false);
  };

  return editable ? (
    <div className="info-row">
      <div className="type-of-info">{title}:</div>

      {!editPressed ? (
        <>
          <div className={info ? "info-value" : "info-value info-empty"}>
            {info || `Adicione um ${title}`}
          </div>

          <Button className="edit-button" onClick={() => setEditPressed(true)}>
            Editar
          </Button>
        </>
      ) : (
        <div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder={`Digite o ${title}`}
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
            />
          </div>

          <Button
            className="edit-button"
            onClick={() => {
              handleSave();
            }}
          >
            Salvar
          </Button>

          <Button className="edit-button" onClick={() => handleCancel()}>
            Cancelar
          </Button>
        </div>
      )}
    </div>
  ) : (
    <div className="info-row">
      <div className="type-of-info">{title}:</div>
      <div className={info ? "info-value" : "info-value info-empty"}>
        {info || `Adicione um ${title}`}
      </div>
    </div>
  );
};

export default EditableInformationName;
