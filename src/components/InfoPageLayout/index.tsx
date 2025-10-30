import React from "react";
import Hero from "../../components/Hero";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import {laboratoryCardEnum} from "../../components/CardsGrid/cardsData";
import CardsGrid from "../../components/CardsGrid";
import Divider from "antd/lib/divider";

type LaboratoryText = {
    name: string;
    description: string
    whyLaboratory: string;
}

type Section = {
  title: string;
  content: string;
  img: string;
  alt: string;
};

type InfoPageProps = {
  laboratoryText: LaboratoryText
  sectionsData: Section[]
  laboratoryName: laboratoryCardEnum
};

const InfoPage = ({laboratoryText, sectionsData, laboratoryName }: InfoPageProps) => {
  return (
    <>
      <Container
        fluid={"lg"}
        className="p-0 d-flex flex-column my-3 bg-white rounded-3 shadow"
      >
        <div className="d-flex justify-content-center rounded-3 align-items-center px-3 pt-3 bg-white my-3 flex-column flex-lg-row flex- gap-sm-3">
          <h1 className="m-auto text-center">{laboratoryText.name}</h1>
          <p
            className="fs-6 border-start border-4 border-light ps-3 mb-0"
            style={{ width: "80%" }}
          >
           {laboratoryText.description}
          </p>
        </div>
        <div className="d-flex bg-dark text-white p-0 flex-column flex-md-row">
          <Image
            className="mx-lg-0"
            style={{ maxHeight: "375px" }}
            srcSet={`${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg")} 375w,
      ${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg")} 768w,
      ${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg")} 992w,
      ${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-375x281.jpg")} 1200w,
      ${require("../../assets/images/lmu-images/ens.cmprss-osso-fratur.3-500x375.jpg")} 1440w`}
          />
          <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-start p-3">
            <h1 className="mb-3 text-center text-lg-start">
              Para que {laboratoryText.name}?
            </h1>
            <p className="fs-6 text-center text-lg-start">
              {laboratoryText.whyLaboratory}
            </p>
          </div>
        </div>
        <div className="bg-white">
          {sectionsData.map((section, index) => (
            <div
              key={index}
              className="d-flex gap-3 align-items-center justify-content-center text-dark m-3 rounded-3 shadow p-3 flex-column flex-lg-row"
              style={{
                minHeight: "180px",
              }}
            >
              <h3 className="text-center" style={{ width: "300px" }}>
                {section.title}
              </h3>
              <p
                className="border-start border-1 mx-3 mx-lg-0 my-sm-0 border-dark ps-3 w-auto"
                // style={{ width: "60%" }}
              >
                {section.content}
              </p>
            </div>
          ))}
        </div>
        <div>
          <div className="d-flex justify-content-center">
            <h1 className="bg-dark w-100 text-center py-3 m-0 text-white">
              {laboratoryName === laboratoryCardEnum.LMU ? "Laboratorios" : "Tipos de Ensaios Mecânicos"}
            </h1>
          </div>
          <CardsGrid laboratory={laboratoryName} />
        </div>
      </Container>
    </>
  );  
};

export default InfoPage;
