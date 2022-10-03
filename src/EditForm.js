import React from 'react';
import { Button, Form } from 'react-bootstrap';



class EditForm extends React.Component
{

  render()
  {

    // //console.log('Edit form ', this.props.Invoice)
    return (
      <Form onSubmit={ this.props.handleEditSubmit }>
        <Form.Group className="mb-3" controlId="editCompany">
          <Form.Label>Change Your Company</Form.Label>
          <Form.Control
            type="text"
            defaultValue={ this.props.Invoice.company_name }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="editProject"
        >
          <Form.Label>Change Your Project Title</Form.Label>
          <Form.Control
            type="text"
            defaultValue={ this.props.Invoice.project_name }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="editDescription"
        >
          <Form.Label>Edit Your Project Description (2000 Character Limit)</Form.Label>
          <Form.Control
            as="textarea" rows={ 5 }
            defaultValue={ this.props.Invoice.description }
            maxLength={ 2000 }
          />
<Form.Group 
          className="mb-3" 
          controlId="editRate"
        >
          <Form.Label>Hourly Rate</Form.Label>
          <Form.Control 
            type="number" 
            defaultValue={ this.props.Invoice.hourly_rate }
          />
        </Form.Group>
        <Form.Group 
          className="mb-3" 
          controlId="editHours"
        >
          <Form.Label>Hours Worked</Form.Label>
          <Form.Control 
            type="Number" 
            defaultValue={ this.props.Invoice.hours_worked }
          />
        </Form.Group>

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
