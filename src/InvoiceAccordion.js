//import axios from 'axios';
import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
class InvoiceAccordion extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      CompanysArr: [],
    }
  }
  getCompanyNames = () =>
  {
    let CompanysArr = [];
    this.props.Invoices.forEach(Invoice =>
    {
      !CompanysArr.includes(Invoice.Company)
        ? CompanysArr.push(Invoice.Company)
        : console.log('nothing here');
    });
    return CompanysArr;
  }
  render()
  {
    let arr = this.getCompanyNames();

    let newArr = arr.map((Company, idx) =>
    {
      return (
        <>
          <Accordion.Item key={ idx } eventKey={ idx }>
            <Accordion.Header>{ Company }</Accordion.Header>
            {
              this.props.Invoices.map((Invoice, idx) =>
              {
                if (Invoice.Company === Company)
                {
                  return (
                    <Accordion.Body
                      key={ Invoice._id }
                    >
                      { Invoice.title }
                      <Button
                        key={ `${ Invoice._id }_1` }
                        onClick={ () => this.props.handleModal(Invoice._id) }
                      >
                        Open
                      </Button>
                      <Button
                        key={ `${ Invoice._id }_2` }
                        onClick={ () => this.props.confirmDelete(Invoice?._id) }
                      >
                        Delete
                      </Button>
                    </Accordion.Body>
                  );
                }
                else
                {
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
          { newArr }
        </Accordion>
      </>
    )
  }
}

export default InvoiceAccordion;
