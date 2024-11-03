import React from "react";
import { Container } from "react-bootstrap"; // Assuming Container is imported from react-bootstrap

const MechanicTestCalendar = () => {
  return (
    <Container className="mts-calendar__ctn">
      <iframe
        src="https://calendar.app.google/WBbHZehLsyBeLqNa6"
        style={{ border: 0 }}
        width="100%"
        height="100%"
      ></iframe>
    </Container>
  );
};

export default MechanicTestCalendar;
