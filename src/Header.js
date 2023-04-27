import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/About" className="nav-link" style={{ color: 'white' }}>About</Link></NavItem>
        {/* PLACEHOLDER: render a navigation link to the about page */}

        <NavItem><Link to="/" className="nav-link" style={{ color: 'white' }}>Best Books</Link></NavItem>
        <NavItem
          style={{ color: "white", marginLeft: "20px", cursor: "pointer" }}
          onClick={() => this.props.setModalOpen(true)}
        >
          Add New Book
        </NavItem>
        <NavItem
          style={{ color: "white", marginLeft: "20px", cursor: "pointer" }}
          onClick={() => this.props.setModalOpen(true)}
        >
          Delete New Book
        </NavItem>

      </Navbar>
    )
  }
}

export default Header;
