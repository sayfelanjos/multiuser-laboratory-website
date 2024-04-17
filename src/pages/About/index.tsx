import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

const About = () => {
  const html = 80;
  const responsive = 95;
  const photoshop = 60;
  return (
    <section id="about" className="block about-block">
      <Container fluid>
        <div className="title-holder">
          <h2>About Us</h2>
          <div className="subtitle">Lear more about us</div>
        </div>
        <Row>
          <Col sm={6}></Col>
          <Col sm={6}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusantium consectetur cum distinctio, dolorem ducimus est
              exercitationem labore laboriosam, minima mollitia nemo nulla
              numquam officiis quidem quod repellendus sunt suscipit,
              temporibus.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusantium consectetur cum distinctio, dolorem ducimus est
              exercitationem labore laboriosam, minima mollitia nemo nulla
              numquam officiis quidem quod repellendus sunt suscipit,
              temporibus.
            </p>
            <div className="progress-block">
              <h4>HTML / CSS / Javascript</h4>
              <ProgressBar now={html} label={`${html}%`} />
            </div>
            <div className="progress-block">
              <h4>responsive</h4>
              <ProgressBar now={responsive} label={`${responsive}%`} />
            </div>
            <div className="progress-block">
              <h4>Photoshop</h4>
              <ProgressBar now={photoshop} label={`${photoshop}%`} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
