import React from "react";
import Calendar from "antd/lib/calendar";
import Container from "react-bootstrap/Container";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

const SchedulePage = () => {
  return (
    <Container>
      <Calendar></Calendar>
    </Container>
  );
};

export default SchedulePage;
