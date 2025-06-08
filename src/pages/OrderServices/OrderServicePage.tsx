import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchedulerPage from "./PagesAuxiliary/SchedulerPage";
import RequestPage from "./PagesAuxiliary/RequestPage";
import { Outlet } from "react-router-dom";
const OrderServicePage = () => {
  return (
    <div>
        <SchedulerPage/>
        <RequestPage/>
    </div>
  );
};

export default OrderServicePage;