import React, { useState } from "react";
import "./EditableInformation.scss";
import { Button, FormControl } from "react-bootstrap";
import { getCurrentUser } from "../../helpers/getCurrentUser";

type EditableInformationProps = {
  title: string;
  info?: string | null;
  editable: boolean;
};

const EditableInformation: React.FC<EditableInformationProps> = ({
  title,
  info,
  editable,
}) => {
  const [editPressed, setEditPressed] = useState(false);
  const [editedValue, setEditedValue] = useState(info || "");

  const handleSave = () => {
    console.log("Novo valor salvo:", editedValue);
    setEditPressed(false);
    // aqui você pode enviar o valor para o backend ou atualizar o pai via props
  };

  const handleCancel = () => {
    setEditedValue(info || "");
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

export default EditableInformation;
