import React from 'react';
import { Button, Form } from 'react-bootstrap';



class EditForm extends React.Component
{

  render()
  {

    // //console.log('Edit form ', this.props.Invoice)
    return (
      <Form onSubmit={ this.props.handleEditSubmit }>
        <Form.Group className="mb-3" controlId="recipient">
          <Form.Label>Change Your Recipient</Form.Label>
          <Form.Control
            type="text"
            defaultValue={ this.props.Invoice.recipient }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="title"
        >
          <Form.Label>Edit Your Invoice Title</Form.Label>
          <Form.Control
            type="text"
            defaultValue={ this.props.Invoice.title }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="InvoiceBody"
        >
          <Form.Label>Edit Your Invoice (2000 Character Limit)</Form.Label>
          <Form.Control
            as="textarea" rows={ 5 }
            defaultValue={ this.props.Invoice.InvoiceBody }
            maxLength={ 2000 }
          />
        </Form.Group>
        <Button type="submit">Save Changes</Button>
        <Button
          onClick={ () => this.props.confirmDelete(this.props.Invoice?._id) }
        >
          Delete
        </Button>
      </Form>
    )
  }
}
export default EditForm;
