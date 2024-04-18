import React from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import image3 from "../../assets/images/image-1600x500.jpg";

const Hero = () => {
  return (
    <Container fluid className="hero-container">
      <Carousel>
        <Carousel.Item className="carousel-item">
          <Image src={image3} alt="Hero" className="w-100 h-auto d-block" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            <Button variant="dark" size="sm">
              Link to page
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carousel-item">
          <Image src={image3} alt="Hero" className="w-100 h-auto d-block" />
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
      </Carousel>
    </Container>
  );
};

export default Hero;
