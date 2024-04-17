import React from "react";
import Hero from "../../components/Hero";
import Container from "react-bootstrap/Container";
import CardsGrid from "../../components/CardsGrid";

const Home = () => {
  return (
    <Container fluid className="main-container">
      <Hero />
      <CardsGrid />
    </Container>
  );
};

export default Home;
