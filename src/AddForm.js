import React from 'react';
import { Button, Form } from 'react-bootstrap';



class AddForm extends React.Component {
  render() {
    return (
    <>
      <Form onSubmit={this.props.handleAddSubmit}>      
        <Form.Group 
          className="mb-3" 
          controlId="addRecipient"
        >
          <Form.Label>Choose a Recipient</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Oh My Most Beloved!" 
          />
        </Form.Group>

        <Form.Group 
          className="mb-3" 
          controlId="addTitle"
        >
          <Form.Label>Give Your Letter a Title</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="An Outpouring of My Fulsome Emotion For Thee"
          />
        </Form.Group>

        <Form.Group 
          className="mb-3" 
          controlId="addLetter"
        >
          <Form.Label>Write Your Letter (2000 Character Limit)</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={8} 
            placeholder="I am full of such forbidden desires for thy most comely self. Please grace me with your affections, lest I die."        
            onInput={this.props.handleCharCount}
            maxLength={2000}
          />
        </Form.Group>
        <Button type="submit">Add A Letter</Button>
      </Form>
      </> 
      )
  }
}
export default AddForm;
