import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const DurometerCalendar = () => {
  return (
    <Container fluid className="durometer-calendar__ctn">
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
            src="https://calendar.google.com/calendar/embed?src=c_5968aacbf3e7a625362b91726cf40bc33fc698bde3129943bc8020bfc0d75bbf%40group.calendar.google.com&ctz=America%2FSao_Paulo"
            style={{ border: 0 }}
            width="100%"
            height="800px"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default DurometerCalendar;
