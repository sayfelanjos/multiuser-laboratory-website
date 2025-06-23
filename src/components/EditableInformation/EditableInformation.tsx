import React from "react";
import "./EditableInformation.scss";

type EditableInformationProps = {
  title: string;
  info?: string|null;
};

const EditableInformation: React.FC<EditableInformationProps> = ({
  title,
  info,
}) => {
  return (
    <div className="info-row">
      <div className="type-of-info">{title}:</div>
      <div className={info ? "info-value" : "info-value info-empty"}>
        {info ||`Adicione um ${title}`}
      </div>
    </div>
  );
};

export default EditableInformation;
