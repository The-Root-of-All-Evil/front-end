import React from 'react';
import { Button, Card } from 'react-bootstrap';

class Score extends React.Component
{

  render()
  {
    return (
      <Card style={ { width: '18rem' } }>
        <Card.Body>
          <Card.Title>Score</Card.Title>
          <Card.Text>
            How Does This Letter Make Us Feel?
            { this.props.score?.grade }
          </Card.Text>
          <Button variant="primary" onClick={ () => this.props.handleScore() }>Get Score</Button>
        </Card.Body>
      </Card>
    )
  }
}


export default Score;
