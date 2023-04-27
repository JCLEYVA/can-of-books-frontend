import React from "react";
import { Container, Form, Button } from 'react-bootstrap';

class UpdateBookForm extends React.Component {
    render() {
        console.log(this.props.selectBook)
        return (

            <Container className="mt-5">
                <Form onSubmit={this.handleBooksSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Update</Form.Label>
                        <Form.Control type="text" defaultValu={this.props.UpdateBookForm} />
                    </Form.Group>
                    <Button type="submit">Update</Button>
                </Form>
            </Container>
        )
    }
}

export default UpdateBookForm;