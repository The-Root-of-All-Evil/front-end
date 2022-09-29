import React from 'react';
import { Button, Form } from 'react-bootstrap';



class AddForm extends React.Component {
  render() {
    return (
    <>
      <Form onSubmit={this.props.handleAddSubmit}>      
        <Form.Group 
          className="mb-3" 
          controlId="addCompany"
        >
          <Form.Label>Company Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="ABC Corporation" 
          />
        </Form.Group>

        <Form.Group 
          className="mb-3" 
          controlId="addProject"
        >
          <Form.Label>Project Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Web Development Project Name and Number"
          />
        </Form.Group>

        <Form.Group 
          className="mb-3" 
          controlId="description"
        >
          <Form.Label>Project Billing Description (2000 Character Limit)</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={8} 
            placeholder="Added web server and database"        
            onInput={this.props.handleCharCount}
            maxLength={2000}
          />
        </Form.Group>
        <Form.Group 
          className="mb-3" 
          controlId="addRate"
        >
          <Form.Label>Hourly Rate</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="35"
          />
        </Form.Group>
        <Form.Group 
          className="mb-3" 
          controlId="addHours"
        >
          <Form.Label>Hours Worked</Form.Label>
          <Form.Control 
            type="Number" 
            placeholder="100"
          />
        </Form.Group>
        <Button type="submit">Add An Invoice</Button>
      </Form>
      </> 
      )
  }
}
export default AddForm;
