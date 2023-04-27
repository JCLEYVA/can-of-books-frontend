import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BestBooks from "./BestBooks";
import About from "./About";
import axios from "axios";
import { BookFormModal } from "./BookFormModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DeleteBook from "./DeleteBook";


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

  // *** HANDLER TO DELETE  ****
  let getBooks = async (booksObj) => {
    let url = `http://localhost:3002/books`;
    axios
      .get(url)
      .then((response) => {
        const books = response.data.filter(
          (book) => book.title !== booksObj
        );
        console.log(books);
        this.setState({ books });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  // let deleteBooks = async (booksObj) => {

  //   this.getBooks(booksObj);
  //   try {

  //     let booksID = this.state.book_Id
  //     // TODO: Build out the url for axios -> http://localhost:3001/books/64481c6eaaa56c3a62ca80e5

  //     let url = `${process.env.REACT_APP_SERVER}/books/${booksID}`;
  //     console.log("url in delete", url)
  //     await axios.delete(url);

  //     // TODO: update state -> Filter out the book with the matching ID That is going to be deleted. We are going to look at each cat in state and if the id of that cat does not match the one to be deleted, it gets put into the array called updatedCats
  //     let updatedBooks = this.state.books.filter(
  //       (books) => books._id !== booksID
  //     );

  //     this.setState({
  //       books: updatedBooks,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };



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
          {/* <Route exact path="/delete" element={<DeleteBook books={this.state.books}/>}></Route> */}

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