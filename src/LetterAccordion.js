//import axios from 'axios';
import React from 'react';
import { Accordion, Button } from 'react-bootstrap';
class LetterAccordion extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      recipientsArr: [],
    }
  }
  getRecipientNames = () =>
  {
    let recipientsArr = [];
    this.props.letters.forEach(letter =>
    {
      !recipientsArr.includes(letter.recipient)
        ? recipientsArr.push(letter.recipient)
        : console.log('nothing here');
    });
    return recipientsArr;
  }
  render()
  {
    let arr = this.getRecipientNames();

    let newArr = arr.map((recipient, idx) =>
    {
      return (
        <>
          <Accordion.Item key={ idx } eventKey={ idx }>
            <Accordion.Header>{ recipient }</Accordion.Header>
            {
              this.props.letters.map((letter, idx) =>
              {
                if (letter.recipient === recipient)
                {
                  return (
                    <Accordion.Body
                      key={ letter._id }
                    >
                      { letter.title }
                      <Button
                        key={ `${ letter._id }_1` }
                        onClick={ () => this.props.handleModal(letter._id) }
                      >
                        Open
                      </Button>
                      <Button
                        key={ `${ letter._id }_2` }
                        onClick={ () => this.props.confirmDelete(letter?._id) }
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

    //this.getRecipientNames();
    //console.log('letter array in letter accordion: ', this.props.letters);
    return (
      <>
        <h3> Your Saved Letters</h3>
        <Accordion>
          { newArr }
        </Accordion>
      </>
    )
  }
}

export default LetterAccordion;
