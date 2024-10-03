import React from "react";
import { Outlet } from "react-router-dom";
import { ButtonAppBar } from "./AppBar";

export const Layout: React.FC = () => {
  const handleAppBarClick = () => {
    console.log("click");
  };
  return (
    <>
      <ButtonAppBar onClick={handleAppBarClick} />
      <Outlet />
    </>
  );
};
