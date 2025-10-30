import React from "react";
import Container  from "react-bootstrap/Container";
import InfoPage from "../../../components/InfoPageLayout";
import { laboratoryCardEnum } from "../../../components/CardsGrid/cardsData";

const lemData = [
  {
    title: "Titulo",
    content:"Conteúdo",
    img: require("../../../assets/images/lmu-images/quality-control-1024x393.jpg"),
    alt: "",
  },
];

const lemText = {
    name: "Laboratório Microscopia Eletrônica de Varredura",
    description: "Descrição do Laboratório",
    whyLaboratory: `Texto explicativo`
}

const ScanningElectronMicroscopy = () => {
    return(
        <Container fluid className="p-5">
            <InfoPage  laboratoryText={lemText} sectionsData={lemData} laboratoryName={laboratoryCardEnum.ScanningMicroscopy}/>
        </Container>
    );
};

export default ScanningElectronMicroscopy;