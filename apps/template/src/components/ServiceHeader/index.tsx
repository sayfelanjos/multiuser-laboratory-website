import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

type Props = {
  svcImage: string;
  svcTitle: string;
};
const ServiceHeader = ({ svcImage, svcTitle }: Props) => {
  return (
    <Container fluid as="section" className="svc-header">
      <h1 className="svc-header-title">{svcTitle}</h1>
      <Image src={svcImage} className="svc-header-img" />
    </Container>
  );
};

export default ServiceHeader;
