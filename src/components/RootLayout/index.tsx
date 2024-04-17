import React from "react";
import AppHeader from "../Header";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
