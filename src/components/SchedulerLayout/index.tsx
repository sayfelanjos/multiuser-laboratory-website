import React from "react";
import Container from "react-bootstrap/Container";
import SchedulerNavbar from "../SchedulerNavbar";
import { Outlet } from "react-router-dom";
import SchedulerSidebar from "../SchedulerSidebar";
import "./_scheduler-layout.scss";

const SchedulerLayout = () => {
  return (
    <Container fluid className="p-0 scheduler-layout__ctn">
      <Container>
        <SchedulerNavbar />
      </Container>
      <Container fluid className="scheduler-layout__content-wrapper">
        <SchedulerSidebar />
        <Container fluid className="p-0 h-100">
          {
            // Note: the react-router-dom replaces "Outlet" by the child paths
            // of SchedulerLayout at /src/index.tsx
          }
          <Outlet />
        </Container>
      </Container>
    </Container>
  );
};

export default SchedulerLayout;
