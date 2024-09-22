import React from "react";
import Container from "react-bootstrap/Container";
import SchedulerNavbar from "../SchedulerHeader";
import { Outlet } from "react-router-dom";
import SchedulerSidebar from "../SchedulerSidebar";
import "./_scheduler-layout.scss";
import ProtectedRoute from "../ProtectedRoute";

const SchedulerLayout = () => {
  return (
    <>
      <ProtectedRoute>
        <Container fluid className="p-0 scheduler-layout__ctn">
          <Container className="scheduler-layout__navbar-wrapper">
            <SchedulerNavbar />
          </Container>
          <Container fluid className="scheduler-layout__content-wrapper">
            <Container className="scheduler-layout__sidebar p-0">
              <SchedulerSidebar />
            </Container>
            <Container className="scheduler-layout__main">
              <Outlet />
            </Container>
          </Container>
        </Container>
      </ProtectedRoute>
    </>
  );
};

export default SchedulerLayout;
