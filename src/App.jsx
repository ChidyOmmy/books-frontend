import React from "react";
import { Box, Container, ThemeProvider,Paper } from "@mui/material";
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
import BookPage from "./pages/BookPage";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserContextProvider>
        <BookContextProvider>
          <Paper sx={{ minHeight: '100vh', margin: 0, paddingY: 5 }}>
        <Container>
            <MessageSnackbar />
          <Navbar />
            <Routes>
              <Route path='/' exact element={<HomePage />} />
              <Route path='/book/:id' element={<BookPage />} />
              <Route path='/book/:id/edit' element={<EditBook />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/about' element={<AboutPage />} />
              <Route path='/create' element={<CreateBook />} />
            </Routes>
        </Container>
          </Paper>
        </BookContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  );
};

export default App;
