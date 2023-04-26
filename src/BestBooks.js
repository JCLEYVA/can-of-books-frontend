import React from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
// import { Container, Form, Button } from 'react-bootstrap'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      forceRefresh: props.forceRefresh,
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  // Lab11
  // componentDidMount() {
  //   axios.get('/Books')
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.length > 0) {
  //         this.setState({ books: data });
  //       } else {
  //         this.setState({ books: [] });
  //       }
  //     })
  //     .catch(err => console.error(err));
  // }

  // Lab12
  componentDidMount() {
    // http://localhost:3002/books
    let url = `http://localhost:3002/books`;
    axios
      .get(url)
      .then((response) => {
        const books = response.data.filter(
          (book) => book.title !== "randomBook"
        );
        console.log(books);
        this.setState({ books });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.forceRefresh) {
      //
    }
  }
  // *** ADDING A BOOK VIA 2 HANDLERS ****

  // *** 1ST HANDLER - GRAB FORM DATA AND BUILD OUT A CT OBJECT  - RUN ON FORM SUBMISSION***
  handleBooksSubmit = (event) => {
    event.preventDefault();

    // TODO: CONSTRUCT A book OBJ BASED ON THE FORM INPUT VALUES
    let booksObj = {
      name: event.target.name.value,
      location: event.target.location.value,
      color: event.target.color.value,
      spayNeuter: event.target.spayNeuter.checked,
    };

    // console.log(catObj);
    // TODO: SEND THIS OBJECT TO MY BACKEND - USE A 2nd HANDLER
    this.postBooks(booksObj);
  };

  postBooks = async (booksObj) => {
    try {
      // TODO: build my url for axios -> http://localhost:3001/cats
      let url = `${process.env.REACT_APP_SERVER}/books`;

      // TODO: pass the url and the cat data into axios on a POST and store that return in a variable
      let postBooks = await axios.post(url, booksObj);

      // TODO: Update state with that newly created book
      this.setState({
        books: [...this.state.books, postBooks.data],
      });

      // this.getBooks()
    } catch (error) {
      console.log(error.message);
    }
  };

  // *** HANDLER TO DELETE  ****
  deleteBooks = async (booksID) => {
    try {
      // TODO: Build out the url for axios -> http://localhost:3001/books/64481c6eaaa56c3a62ca80e5

      let url = `${process.env.REACT_APP_SERVER}/books/${booksID}`;
      console.log("url in delete", url);
      // TODO: pass that URL into axios on a DELETE
      await axios.delete(url);

      // TODO: update state -> Filter out the book with the matching ID That is going to be deleted. We are going to look at each cat in state and if the id of that cat does not match the one to be deleted, it gets put into the array called updatedCats
      let updatedBooks = this.state.books.filter(
        (books) => books._id !== booksID
      );

      this.setState({
        books: updatedBooks,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // componentDidMount() {
  //   this.getBooks();
  // };

  render() {
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <header>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        </header>
        <main>
          {this.state.books.length ? (
            <Carousel style={{ width: "fit-content" }}>
              {this.state.books.map((book) => (
                <Carousel.Item key={book._id}>
                  <Carousel.Caption>
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                  </Carousel.Caption>
                  <img
                    className="d-block"
                    src={book.image_url}
                    alt={book.title}
                    height="500"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <h3>No Books Found :(</h3>
          )}
          {/* <Container className="mt-5">
            <Form onSubmit={this.handleBooksSubmit}>
              <Form.Group controlId="name">
                <Form.Label>title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Books</Button>
            </Form>
          </Container> */}
        </main>
      </>
    );
  }
}

export default BestBooks;






