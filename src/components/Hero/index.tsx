import React from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import image1 from "../../assets/images/istockphoto-1452166359-1024x1024.jpg";
import image2 from "../../assets/images/logan-moreno-gutierrez-BQ95Oc7Nvvc-unsplash.jpg";
import image3 from "../../assets/images/istockphoto-1220425228-1024x1024.jpg";
import image4 from "../../assets/images/istockphoto-682025038-1024x1024.jpg";

const Hero = () => {
  return (
    <Container fluid className="hero-container">
      <Carousel>
        <Carousel.Item className="carousel-item">
          <Image src={image1} alt="Hero" className="w-100 h-auto d-block" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Button variant="dark" size="sm">
              Link to page
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <Image src={image2} alt="Hero" className="w-100 h-auto d-block" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <Button variant="dark" size="sm">
              Link to page
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <Image src={image3} alt="Hero" className="w-100 h-auto d-block" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            <Button variant="dark" size="sm">
              Link to page
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <Image src={image4} alt="Hero" className="w-100 h-auto d-block" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
            <Button variant="dark" size="sm">
              Link to page
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Hero;
