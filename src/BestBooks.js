import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    axios.get('/books')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          this.setState({ books: data });
        } else {
          this.setState({ books: [] });
        }
      })
      .catch(err => console.error(err));
  }

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.map(book => (
              <Carousel.Item key={book._id}>
                <img
                  className="d-block w-100"
                  src={book.image_url}
                  alt={book.title}
                />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
