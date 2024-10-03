import { createTheme } from "@mui/material/styles";
import React from "react";

// UPDATING THEME TYPOGRAPHY
declare module "@mui/material/styles" {
  interface TypographyVariants {
    inputError?: React.CSSProperties;
    category?: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    inputError?: React.CSSProperties;
    category?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    inputError: true;
    category: true;
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#016CC8",
      main: "#1976D2",
      dark: "#005db0",
    },
  },
  typography: {
    h2: {
      fontSize: "48px",
      fontWeight: 800,
    },
    h3: {
      fontSize: "40px",
      fontWeight: 800,
      lineHeight: "48.41px",
    },
    h5: {
      fontSize: "26px",
      fontWeight: 700,
      lineHeight: "31.47px",
    },
    h6: {
      fontSize: "24px",
      fontWeight: 500,
      color: "#5A5A5A",
    },
    body2: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19px",
    },
    // CUSTOM VARIANTS
    inputError: {
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "17px",
      letterSpacing: "0rem",
      color: "#D32F2F",
    },
    category: {
      fontSize: "15px",
      fontWeight: 600,
      lineHeight: "17px",
      letterSpacing: "0rem",
      color: "#000000",
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "70px",
        },
      },
    },
  },
});
