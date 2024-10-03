import React from "react";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <>
      <h1>Layout</h1>
      <Outlet />
    </>
  );
};
