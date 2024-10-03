import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [booksCount, setBooksCount] = useState(0);

  const getBooks = async (skip, limit) => {
    if (isNaN(limit)) limit = 3;
    if (isNaN(skip)) skip = 0;
    console.log(skip);
    const response = await fetch(
      `http://localhost:8000/books?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) console.log("an error", response);
    const data = await response.json();
    if (data) {
      console.log(data.books);
      setBooks(data.books);
      setBooksCount(data.booksCount);
    }
  };
  useEffect(() => {
    getBooks();
    return () => {};
  }, []);

  return (
    <BookContext.Provider value={{ books, setBooks, getBooks, booksCount }}>
      {" "}
      {children}{" "}
    </BookContext.Provider>
  );
};
