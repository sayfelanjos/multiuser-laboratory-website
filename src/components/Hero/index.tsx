import React from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import ChevronRightIcon from "../../assets/icons/ChevronRightIcon";
import { heroData } from "./heroData";

const Hero = () => {
  return (
    <Container fluid className="p-0">
      <Carousel>
        {heroData.map((hero) => {
          return (
            <Carousel.Item key={hero.id}>
              <Container fluid className="hero-ctn">
                <Image
                  src={hero.imagePath}
                  alt={hero.imageDesc}
                  width="1280"
                  height="720"
                  loading="lazy"
                  className="hero-img"
                  srcSet={hero.imageSet}
                  sizes={hero.imageSizes}
                />
              </Container>
              <Carousel.Caption>
                <h1 className="text-shadow">{hero.label}</h1>
                <p className="fs-4 text-shadow">{hero.summary}</p>
                {/*<Link to={hero.buttonLink} className="px-3 btn btn-dark">*/}
                {/*  <span className="me-1">{hero.buttonText}</span>*/}
                {/*  <ChevronRightIcon />*/}
                {/*</Link>*/}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default Hero;
