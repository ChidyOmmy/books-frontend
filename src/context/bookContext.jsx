import { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [booksCount, setBooksCount] = useState(0);

  const getBooks = async (skip, limit) => {
    if (isNaN(limit)) limit = 3;
    if (isNaN(skip)) skip = 0;
    try {
      const response = await fetch(
        `http://localhost:8000/books?limit=${limit}&skip=${skip}`
      );
      if (!response.ok) console.log("an error", response);
      const data = await response.json();
      if (data) {
        console.log(data.books);
        setBooks(data.books);
        setBooksCount(data.booksCount);
        setPopularBooks(data.popularBooks);
      }
    } catch (error) {
      console.log('Failed to fetch', error.message)
    }
  };
  useEffect(() => {
    getBooks();
    return () => {};
  }, []);

  return (
    <BookContext.Provider
      value={{ books, booksCount, popularBooks, setBooks, getBooks }}>
      {" "}
      {children}{" "}
    </BookContext.Provider>
  );
};
