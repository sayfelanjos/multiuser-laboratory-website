import React, { ChangeEvent, FormEvent, useState } from "react";
// import axios from "axios";
//
const FileUploader: React.FC = () => {
  const [fileInput, setFileInput] = useState<FileList | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fileInput) {
      return;
    }

    const file = fileInput[0];
    const formData = new FormData();

    formData.append("file", file);

    //   axios
    //     .post("/.netlify/functions/uploadFile", formData, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     });
  };

  const inputFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFileInput(files);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" accept="application/pdf" onChange={inputFileChanged} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileUploader;
