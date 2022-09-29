import React from 'react';
import { Button, Form } from 'react-bootstrap';



class EditForm extends React.Component
{

  render()
  {

    // //console.log('Edit form ', this.props.letter)
    return (
      <Form onSubmit={ this.props.handleEditSubmit }>
        <Form.Group className="mb-3" controlId="recipient">
          <Form.Label>Change Your Recipient</Form.Label>
          <Form.Control
            type="text"
            defaultValue={ this.props.letter.recipient }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="title"
        >
          <Form.Label>Edit Your Letter Title</Form.Label>
          <Form.Control
            type="text"
            defaultValue={ this.props.letter.title }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="letterBody"
        >
          <Form.Label>Edit Your Letter (2000 Character Limit)</Form.Label>
          <Form.Control
            as="textarea" rows={ 5 }
            defaultValue={ this.props.letter.letterBody }
            maxLength={ 2000 }
          />
        </Form.Group>
        <Button type="submit">Save Changes</Button>
        <Button
          onClick={ () => this.props.confirmDelete(this.props.letter?._id) }
        >
          Delete
        </Button>
      </Form>
    )
  }
}
export default EditForm;
