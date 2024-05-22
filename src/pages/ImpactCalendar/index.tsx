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
            src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3mLy4RKUauJJ1RmorEhAYr_HBkX4I9ljUUKfq7hwZGG19Dkgm8IOHUjqDAe4SaC6Aa-Im3C6XG?gv=true"
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
