import React from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Navbar from "./components/NavBar/Navbar";
import { BookContextProvider } from "./context/bookContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
import MessageSnackbar from './components/Content/MessageSnackbar'
import { UserContextProvider } from "./context/userContext";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <BookContextProvider>
        <Container>
            <MessageSnackbar />
          <Navbar />
            <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/about' element={<AboutPage />} />
            </Routes>
        </Container>
        </BookContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
