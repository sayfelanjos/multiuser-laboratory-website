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
    name: "Laboratório Análise Térmica e Infravermelho",
    description: "Descrição do Laboratório",
    whyLaboratory: `Texto explicativo`
}

const TermoAnalysis = () => {
    return(
        <Container fluid className="p-5">
            <InfoPage  laboratoryText={lemText} sectionsData={lemData}/>
        </Container>
    );
};

export default TermoAnalysis;