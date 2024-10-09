import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from './userContext'
export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const { user } = useContext(UserContext)
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [booksCount, setBooksCount] = useState(0);
  const userId = user.id

  const getBooks = async (skip = 0, limit = 3, user = userId) => {
    if (isNaN(limit)) limit = 3;
    if (isNaN(skip)) skip = 0;
    try {
      const response = await fetch(
        `http://localhost:8000/books?limit=${limit}&skip=${skip}&user=${user}`
      );
      const data = await response.json();
      if (!response.ok) console.log("an error", response, data);
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
      value={{ books, booksCount, popularBooks, setBooks, getBooks, setPopularBooks }}>
      {" "}
      {children}{" "}
    </BookContext.Provider>
  );
};
