//import axios from 'axios';
import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
class InvoiceAccordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CompanysArr: [],
    }
  }
  getCompanyNames = () => {
    let CompanysArr = [];
    this.props.Invoices.forEach(Invoice => {
      !CompanysArr.includes(Invoice.company_name)
        ? CompanysArr.push(Invoice.company_name)
        : console.log('nothing here');
    });
    return CompanysArr;
  }
  render() {
    let arr = this.getCompanyNames();
    //console.log('company names arr: ', arr);

    // create an array of accordian items for each `company_name`
    let newArr = arr.map((company_name, idx) => {
      return (
        <>
          {/* make an a accordian name*/}
          <Accordion.Item key={idx} eventKey={idx}>
            {/* header of the accordian item is the `company_name` */}
            <Accordion.Header>{company_name}</Accordion.Header>
            {
              // inside each accordian item, make a list of projects under that company_name
              this.props.Invoices.map((Invoice, idx) => {
                if (Invoice.company_name === company_name) {
                  return (
                    <Accordion.Body
                      key={Invoice._id}
                    >
                      {Invoice.project_name}
                      <Button
                        key={`${Invoice._id}_1`}
                        onClick={() => this.props.handleModal(Invoice._id)}
                      >
                        Open
                      </Button>
                      <Button
                        key={`${Invoice._id}_2`}
                        onClick={() => this.props.confirmDelete(Invoice?._id)}
                      >
                        Delete
                      </Button>
                    </Accordion.Body>
                  );
                }
                else {
                  return '';
                }
              })
            }
          </Accordion.Item>
        </>
      );
    })
    //this.getCompanyNames();
    //console.log('Invoice array in Invoice accordion: ', this.props.Invoices);
    return (
      <>
        <h3> Your Saved Invoices</h3>
        <Accordion>
          {newArr}
        </Accordion>
      </>
    )
  }
}

export default InvoiceAccordion;
