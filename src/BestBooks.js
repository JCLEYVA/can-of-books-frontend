import React from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import UpdateBookForm from './UpdateBookForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      forceRefresh: props.forceRefresh,
      showForm: false,
      selectBook: {}
    };
  }

  componentDidMount() {
    let url = `${process.env.REACT_APP_SERVER}/books`;
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

  handleBooksSubmit = (event) => {
    event.preventDefault();

    let booksObj = {
      name: event.target.name.value,
      location: event.target.location.value,
      color: event.target.color.value,
      spayNeuter: event.target.spayNeuter.checked,
    };

    this.postBooks(booksObj);
  };

  postBooks = async (booksObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;

      let postBooks = await axios.post(url, booksObj);

      this.setState({
        books: [...this.state.books, postBooks.data],
      });

      // this.getBooks()
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteBook = async (booksId) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${booksId}`;
      console.log("url in delete", url);

      await axios.delete(url);

      let updatedBooks = this.state.books.filter(
        (books) => books._id !== booksId
      );

      this.setState({
        books: updatedBooks,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleOpenForm = () =>{
    this.setState({
      showForm: true
    })
  }

  selectABookToUpdate =(book) => {
    this.handleOpenForm()
    this.setState({
      selectBook: book
    })
  }

  render() {

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
                 {this.state.showForm &&
                 <UpdateBookForm />}

                  <Carousel.Caption>
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => this.deleteBook(book._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => this.selectABookToUpdate(book)}
                    >
                     Update
                    </Button>
                    <Button onClick={() => this.props.setModalOpen(false)}>
                      Close
                    </Button>
                  </Carousel.Caption>
                  <img
                    className="d-block"
                    src={'https://www.pluggedin.com/wp-content/uploads/2020/01/placeholder_book.jpg'}
                    alt={book.title}
                    height="500"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <h3>No Books Found :(</h3>
          )}

          {/* <Button onClick={this.handleOpenForm}>Edit Book Details</Button> */}
          {this.state.showForm &&
            <UpdateBookForm selectBook={this.state.selectBook}/>
          }
          
        </main> 
      </>
    );
        }
      }

export default BestBooks;
      
