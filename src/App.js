import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BestBooks from "./BestBooks";
import About from "./About";
import axios from "axios";
import { BookFormModal } from "./BookFormModule";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const saveBook = async (book) => {
  console.log(book);
  let url = `http://localhost:3002/books`;
  const body = {
    title: book?.target?.bookTitle?.value,
    description: book?.target?.bookDesc?.value,
    status: book?.target?.bookStatus?.value,
    image_url: book?.target?.bookImage?.value,
  };
  console.log(body);
  const res = await axios
    .post(url, body)
    .then((response) => {
      const books = response.data.filter((book) => book.title !== "randomBook");
      console.log(books);
    })
    .catch((error) => {
      console.log(error);
    });

  return res;
};

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(false);

  const addBook = async (e) => {
    console.log(e.target.bookTitle.value);
    if (e.target.bookTitle.value) {
      await saveBook(e);
      setForceRefresh(true);
    }
  };
  return (
    <>
      <Router>
        <Header setModalOpen={setModalOpen} />
        <Routes>
          <Route
            exact
            path="/"
            element={<BestBooks forceRefresh={forceRefresh} />}
          ></Route>
          {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          <Route exact path="/about" element={<About />}></Route>
        </Routes>
        <BookFormModal
          showModal={modalOpen}
          setModalOpen={setModalOpen}
          addBook={addBook}
        />
        <Footer />
      </Router>
    </>
  );
};

export default App;