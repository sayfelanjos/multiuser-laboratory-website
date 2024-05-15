import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const ImpactCalendar = () => {
  return (
    <Container fluid className="impact-calendar__ctn">
      <Row>
        <Col
          xs={{ span: 12, offset: 0 }}
          sm={{ span: 12, offset: 0 }}
          md={{ span: 10, offset: 1 }}
          lg={{ span: 10, offset: 1 }}
          xl={{ span: 10, offset: 1 }}
          xxl={{ span: 10, offset: 1 }}
        >
          <iframe
            src="https://calendar.google.com/calendar/embed?src=c_052c5528846dffb3669556a2aa90bef30d5b46f8a454e5b4c31df5bbddd36f5f%40group.calendar.google.com&ctz=America%2FSao_Paulo"
            style={{ border: 0 }}
            width="100%"
            height="800px"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default ImpactCalendar;
