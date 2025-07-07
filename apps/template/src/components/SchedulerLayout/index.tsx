import React from "react";
import Container from "react-bootstrap/Container";
import SchedulerNavbar from "../SchedulerNavbar";
import { Outlet } from "react-router-dom";
import SchedulerSidebar from "../SchedulerSidebar";
import "./_scheduler-layout.scss";
import ProtectedRoute from "../ProtectedRoute";

const SchedulerLayout = () => {
  return (
    <>
      <ProtectedRoute>
        <Container fluid className="p-0 scheduler-layout__ctn">
          <Container>
            <SchedulerNavbar />
          </Container>
          <Container fluid className="scheduler-layout__content-wrapper">
            <SchedulerSidebar />
            <Container fluid className="p-0 h-100">
              <Outlet />
            </Container>
          </Container>
        </Container>
      </ProtectedRoute>
    </>
  );
};

export default SchedulerLayout;
