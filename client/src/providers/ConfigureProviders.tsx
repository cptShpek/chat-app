import React from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { theme } from "../mui/theme";
import { UserProvider } from "./user";

export const ConfigureProviders: React.FC = () => {
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
