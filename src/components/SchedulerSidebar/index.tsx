import React, { useCallback } from "react";
import { createPortal } from "react-dom";
import "./_scheduler-sidebar.scss";
import { NavLink } from "react-router-dom";
import { Navbar, DropdownDivider } from "react-bootstrap";
import ScheduleIcon from "../../assets/icons/ScheduleIcon";
import RequestQuoteIcon from "../../assets/icons/RequestQuoteIcon";
import CustomersIcon from "../../assets/icons/CustomersIcon";
import AvatarIcon from "../../assets/icons/AvatarIcon";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useBreakpoint from "../../hooks/getCurrentBreakpoint";
import { setIsSidebarOpen } from "../../redux/reducers/toggleSidebarSlice";

const sidebarMenu = (isSidebarOpen: boolean, breakPoint: string) => {
  return (
    <>
      <Navbar.Text
        className={`navbar-dark w-100 px-3 ${isSidebarOpen ? "d-flex" : "d-none"}`}
      >
        Recursos
      </Navbar.Text>

      <NavLink
        to="/app/scheduler"
        className={`scheduler-sidebar__btn-link btn btn-link btn-dark text-decoration-none d-flex align-items-center ${isSidebarOpen ? "justify-content-start" : "justify-content-center"}`}
      >
        <ScheduleIcon />
        <span
          className={`ms-2 d-flex justify-content-center ${isSidebarOpen ? "d-flex" : "d-none"}`}
        >
          Agendar Serviço
        </span>
      </NavLink>

      <NavLink
        to="/app/quote-request"
        className={`scheduler-sidebar__btn-link btn btn-link btn-dark text-decoration-none d-flex align-items-center ${isSidebarOpen ? "justify-content-start" : "justify-content-center"}`}
      >
        <RequestQuoteIcon />
        <span className={`ms-2 ${isSidebarOpen ? "d-flex" : "d-none"}`}>
          Solicitar Orçamento
        </span>
      </NavLink>

      <NavLink
        to="/app/users/list"
        className={`scheduler-sidebar__btn-link btn btn-link btn-dark text-decoration-none d-flex align-items-center ${isSidebarOpen ? "justify-content-start" : "justify-content-center"}`}
      >
        <AvatarIcon />
        <span className={`ms-2 ${isSidebarOpen ? "d-flex" : "d-none"}`}>
          Gerenciar Usuários
        </span>
      </NavLink>

      {/*<hr*/}
      {/*  style={{*/}
      {/*    color: "#FFFFFF8C",*/}
      {/*    width: "90%",*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<Navbar.Text*/}
      {/*  className={`navbar-dark w-100 px-3 ${isSidebarOpen ? "d-flex" : "d-none"}`}*/}
      {/*>*/}
      {/*  Administração*/}
      {/*</Navbar.Text>*/}
      {/*<NavLink*/}
      {/*  to="/app/users/list"*/}
      {/*  className={`scheduler-sidebar__btn-link btn btn-link btn-dark text-decoration-none d-flex align-items-center ${isSidebarOpen ? "justify-content-start" : "justify-content-center"}`}*/}
      {/*>*/}
      {/*  <CustomersIcon />*/}
      {/*  <span className={`ms-2 ${isSidebarOpen ? "d-flex" : "d-none"}`}>*/}
      {/*    Usuários*/}
      {/*  </span>*/}
      {/*</NavLink>*/}
    </>
  );
};

const SchedulerSidebar = () => {
  const isSidebarOpen = useAppSelector((state) => state.isSidebarOpen.value);
  const dispatch = useAppDispatch();
  const breakPoint = useBreakpoint();
  const onClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    dispatch(setIsSidebarOpen());
  }, []);

  if (breakPoint === "xs" || breakPoint === "sm" || breakPoint === "md") {
    return createPortal(
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            width: `${isSidebarOpen ? "100%" : "0"}`,
            height: "100%",
            background: "rgba(0,0,0,0.5)",
          }}
          onClick={onClick}
        ></div>
        <aside
          className={`scheduler-sidebar__ctn_mobile bg-dark py-3 ${isSidebarOpen ? "d-block" : "d-none"}`}
        >
          {sidebarMenu(isSidebarOpen, breakPoint)}
        </aside>
      </>,
      document.getElementById("sidebar") as Element,
    );
  }
  return (
    <aside
      className="scheduler-sidebar__ctn_desktop  bg-dark py-3"
      style={{ minWidth: isSidebarOpen ? "280px" : "56px" }}
    >
      {sidebarMenu(isSidebarOpen, breakPoint)}
    </aside>
  );
};

export default SchedulerSidebar;
