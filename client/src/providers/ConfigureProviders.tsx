import React, { useEffect } from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { theme } from "../mui/theme";
import { UserProvider } from "./user";
import { AppRoutes } from "../constants/routes";

export const ConfigureProviders: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(AppRoutes.LOGIN);
    }
  }, [location, navigate]);

  return (
    // MUI THEME PROVIDER
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*  NOTISTACK NOTIFICATIONS PROVIDER */}
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
      >
        <UserProvider>
          <Outlet />
        </UserProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
