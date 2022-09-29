import React from "react"
import { Button, Modal } from "react-bootstrap"
//import Button from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LetterModal.css';

export default class LetterModal extends React.Component
{
  render()
  {
    let letter = this.props.letters.filter(recipient => recipient._id === this.props.modalId)[0];
    return (
      <Modal
        className='modal'
        size="lg" show={ this.props.show }
        onHide={ this.props.handleModal }
      >
        <Modal.Header closeButton>
          <Modal.Title>{ letter?.title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ letter?.letterBody }</Modal.Body>
        <Modal.Footer className='footer'>
          <Button
            variant="primary"
            onClick={ () => this.props.showEditForm(letter) }
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            onClick={ () => this.props.confirmDelete(letter?._id) }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
