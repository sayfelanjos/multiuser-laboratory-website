import React from "react";
import "./_scheduler-sidebar.scss";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import ScheduleIcon from "../../assets/icons/ScheduleIcon";
import RequestQuoteIcon from "../../assets/icons/RequestQuoteIcon";
import CustomersIcon from "../../assets/icons/CustomersIcon";
import { useAppSelector } from "../../hooks/reduxHooks";

const SchedulerSidebar = () => {
  const isSidebarOpen = useAppSelector((state) => state.isSidebarOpen.value);
  return (
    <>
      {isSidebarOpen && (
        <nav className="scheduler-sidebar__ctn  bg-dark py-3">
          <Navbar.Text className="navbar-dark w-100 px-3">Recursos</Navbar.Text>
          <NavLink
            to="/app/scheduler"
            className="scheduler-sidebar__btn-link btn btn-link btn-dark text-decoration-none d-flex justify-content-start px-4"
          >
            <ScheduleIcon />
            <span className="ms-2">Agendar Serviço</span>
          </NavLink>
          <NavLink
            to="/app/quote-request"
            className="scheduler-sidebar__btn-link btn btn-link btn-dark text-decoration-none d-flex justify-content-start px-4"
          >
            <RequestQuoteIcon />
            <span className="ms-2">Solicitar Orçamento</span>
          </NavLink>
          <hr
            style={{
              color: "#FFFFFF8C",
              width: "90%",
            }}
          />
          <Navbar.Text className="navbar-dark w-100 px-3">
            Administração
          </Navbar.Text>
          <NavLink
            to="/app/users/list"
            className="scheduler-sidebar__btn-link btn btn-link btn-dark text-decoration-none d-flex justify-content-start px-4"
          >
            <CustomersIcon />
            <span className="ms-2">Usuários</span>
          </NavLink>
        </nav>
      )}
    </>
  );
};

export default SchedulerSidebar;
