import { createTheme } from "@mui/material/styles";
import { lighten, darken } from "@mui/system";

const theme = createTheme({
  palette: {
    // mode: 'dark',
    primary: {
      main: "#512125",
      light: lighten("#512125", 0.2),
      dark: darken("#512125", 0.2),
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#9D3233",
      light: lighten("#9D3233", 0.2),
      dark: darken("#9D3233", 0.2),
      contrastText: "#ffffff"
    },
    thirdColor: {
      main: "#D75A4D",
      light: lighten("#D75A4D", 0.2),
      dark: darken("#D75A4D", 0.2),
      contrastText: "#000000"
    },
    greenishColor: {
      main: "#F6EBBD",
      light: lighten("#F6EBBD", 0.2),
      dark: darken("#F6EBBD", 0.5),
      contrastText: "#000000"
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
      contrastText: "#fff"
    }
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  },
  spacing: 8,
  shape: {
    borderRadius: 4
  }
});

export default theme;
