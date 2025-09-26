import React from "react";
import Container  from "react-bootstrap/Container";
import InfoPage from "../../../components/InfoPageLayout";

const lemData = [
  {
    title: "Titulo",
    content:"Conteúdo",
    img: require("../../../assets/images/lmu-images/quality-control-1024x393.jpg"),
    alt: "",
  },
];

const lemText = {
    name: "Laboratório Multiusuário",
    description: "Descrição do Laboratório",
    whyLaboratory: `Texto explicativo`
}

const Multiuser = () => {
    return(
        <Container fluid className="p-5">
            <InfoPage  laboratoryText={lemText} sectionsData={lemData}/>
        </Container>
    );
};

export default Multiuser;