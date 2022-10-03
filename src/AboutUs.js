import React from 'react';
import { Button, Carousel } from 'react-bootstrap';

class AboutUs extends React.Component
{
  render()
  {
    return (
      <>
        <h1> This Application Brought To You By:</h1>
        <div width="60%">

          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ require("./images/dogs.jpg") }
                alt="Group shot"
              />
              <Carousel.Caption>
                <h3>The Root of All Evil</h3>
                <p>
                  This application brought to you by greed and desperation. Please feel free to use it and then send us money. We take all the credit and none of the blame for your results.
                </p>
              </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ require("./images/amy-placeholder.jpg") }
                alt="Amy"
              />
              <Carousel.Caption>
                <h3>Amy Pierce</h3>
                <p>
                  Amy is a software developer and recovering accountant. She enjoys programming, buying fabric and restaurants. More about her exploits can be found at http://amydoescode.com ...eventually.
                </p>
              </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ require("./images/adrian-placeholder.jpg") }
                alt="Adrian"
              />

              <Carousel.Caption>
                <h3>Adrian Cosme-Halverson</h3>
                <p>
                Adrian Cosme-Halverson is a software developer and Army veteran. He enjoys programming, video games and lifting. So if you disagree with his code choices, he'll meet you in the parking lot.
                </p>

              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={ require("./images/rhea-placeholder.jpg") }
                alt="Rhea"
              />

              <Carousel.Caption>
                <h3>Rhea Mimi Carillo</h3>
                <p>
                  Rhea Mimi Carillo is a software developer and former member of the Air Force. She enjoying pooping and peeping and sleeping. 
                </p>

              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <Button
            style={ { width: "100px", margin: "auto" } }
            onClick={ () => this.props.handleAboutUs() }
          >
            Home Page
          </Button>
        </div>
      </>
    )
  }
};

export default AboutUs;
