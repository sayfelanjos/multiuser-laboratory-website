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
            src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1gVF4LW8Yi-RgRqVWR2rzTDpPsisOZtRfJwyQ4KUNIRPHc0PHQcphspkTXVJ7R8V0oFIW_Jo3I?gv=true"
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
