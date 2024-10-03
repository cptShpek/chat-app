import React from "react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router-dom";
import { theme } from "../mui/theme";

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
        {/* CUSTOM AXIOS INSTANCE PROVIDER */}
        {/* USER DATA - CURRENT USER, PERMISSIONS - PROVIDER */}
        {/* PROVIDER WITH CLEANED BY USER PERMISSIONS NAVIGATION NODES */}
        {/* PROVIDER FOR HANDLING UNWANTED ROUTES VISITING */}
        <Outlet />
      </SnackbarProvider>
    </ThemeProvider>
  );
};
