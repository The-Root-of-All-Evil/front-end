import React from "react"
import { Button, Modal } from "react-bootstrap"
//import Button from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './InvoiceModal.css';

export default class InvoiceModal extends React.Component
{
  render()
  {
    let Invoice = this.props.Invoices.filter(recipient => recipient._id === this.props.modalId)[0];
    return (
      <Modal
        className='modal'
        size="lg" show={ this.props.show }
        onHide={ this.props.handleModal }
      >
        <Modal.Header closeButton>
          <Modal.Title>{ Invoice?.project_name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ Invoice?.description }</Modal.Body>
        <Modal.Body>{ Invoice?.hourly_rate }</Modal.Body>
        <Modal.Body>{ Invoice?.hours_worked }</Modal.Body>
        
        <Modal.Footer className='footer'>
          <Button
            variant="primary"
            onClick={ () => this.props.showEditForm(Invoice) }
          >
            Edit
          </Button>
          <Button
            variant="secondary"
            onClick={ () => this.props.confirmDelete(Invoice?._id) }
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
