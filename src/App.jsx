import React from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Navbar from "./components/NavBar/Navbar";
import { BookContextProvider } from "./context/bookContext";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BookContextProvider>
        <Container>
          <Navbar />
          <HomePage />
        </Container>
      </BookContextProvider>
    </ThemeProvider>
  );
};

export default App;
