import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import image from "../../assets/images/istockphoto-1220425228-1024x1024.jpg";

const ServiceBanner = () => {
  return (
    <Container fluid className="svc-bnr-cont">
      <Image src={image} className="svc-bnr-img" />
    </Container>
  );
};

export default ServiceBanner;
