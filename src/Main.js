import React from 'react';
import AddForm from './AddForm';
import EditForm from './EditForm';
import Score from './Score';
// withAuth0, because this is a Class-based component
// this allows us to use the `user` object in props
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import LetterAccordion from './LetterAccordion';
import LetterModal from './LetterModal';
import './Main.css';

import AboutUs from './AboutUs';

let SERVER = process.env.REACT_APP_SERVER;

class Main extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      letters: [],
      letter: {},
      letterBody: '',
      showModal: false,
      modalId: '',
      score: {},
      displayEdit: false,
      displayAboutUs: false,
    }
  }

  handleAboutUs = (id) =>
  {
    this.setState({
      displayAboutUs: !this.state.displayAboutUs,
    })
  }
  getLetters = async () =>
  {
    // if the user is authenticated, they can get letters
    if (this.props.auth0.isAuthenticated)
    {
      try
      {
        // generate a token with auth0
        // we'll use it to make a secure request with to our server
        const res = await this.props.auth0.getIdTokenClaims();

        // this is the raw token
        // note the double underscore __ in .__raw
        const jwt = res.__raw;
        // //console.log('jwt: ', jwt)


        // config to do a `get` request from our server using the user's email
        const config = {
          method: 'get',
          baseURL: `${ SERVER }`,
          url: '/letters',
          headers: {
            "email": `${ this.props.auth0.user.email }`,

            // pass token into the headers
            "Authorization": `Bearer ${ jwt }`
          }
        };
        // //console.log('config: ', config);
        let letterData = await axios(config);

        // 
        //console.log(letterData.data);

        // set the letter data from our mongo database into state
        // which'll re-render the page

        let sortedLetters = letterData.data.sort((a, b) =>
        {
          if (a.recipient.charAt(0).toLowerCase() > b.recipient.charAt(0).toLowerCase())
          {
            return 1;
          }

          else if (a.recipient.charAt(0).toLowerCase() < b.recipient.charAt(0).toLowerCase())
          {
            return -1;
          }
          else
          {
            return 0;
          }

        });

        this.setState({
          letters: sortedLetters,
        })
        console.log(sortedLetters);
      }
      catch (err)
      {
        //console.log(`Problem getting letters for ${this.props.auth0.user.name}: `, err.message);
      }
    }
    else
    {
      // display a message asking users to log in
      // TODO: change the render to display something to let the user know they aren't logged in and can't see letters
      //console.log('please log in');
    }
  }
  handleModal = (id) =>
  {
    this.setState({
      showModal: !this.state.showModal,
      modalId: id
    })
  }
  //make a letter object
  handleAddSubmit = (e) =>
  {
    e.preventDefault();
    let letter = {
      title: e.target.addTitle.value,
      recipient: e.target.addRecipient.value,
      letterBody: this.state.letterBody,

      //    email: [CALLED FROM AUTH0 SECRET STATE]
      email: this.props.auth0.user.email,
      //score: this.state.scoreText
    }

    //console.log('letter: ', letter);

    this.addLetter(letter);

  }

  handleCharCount = e =>
  {
    e.preventDefault();
    // //console.log('letter body in handle char: ', e.target.value);
    this.setState({
      letterBody: e.target.value,
    });
  }


  //THIS IS THE FUNCTION TO CREATE THE LETTERS

  addLetter = async (letter) =>
  {
    if (this.props.auth0.isAuthenticated)
    {
      try
      {
        // generate a token with auth0
        // we'll use it to make a secure request with to our server
        const res = await this.props.auth0.getIdTokenClaims();

        // this is the raw token
        // note the double underscore __ in .__raw
        const jwt = res.__raw;
        // //console.log('jwt: ', jwt)


        const config = {
          method: 'post',
          baseURL: `${ SERVER }`,
          url: '/letters',
          headers: {
            // pass token into the headers
            "Authorization": `Bearer ${ jwt }`
          },
          data: letter,
        }

        // log to see what the config file looks like
        // //console.log('add letter config: ', config);

        let createdLetter = await axios(config);

        // log the letter that axios returns to us
        //console.log('createdLetter: ', createdLetter.data);


        // use spread operator to make a deep copy of letters array in state, and concatenate the createdLetter.data to the end
        this.setState({
          letters: [...this.state.letters, createdLetter.data],
        });
      }
      catch (e)
      {
        //console.log('This letter wasn\'t saved. ', e.response)
      }
    }
  }

  // function to ask user if they `really want to delete?` their letter
  confirmDelete = (id) =>
  {
    let yesDelete = prompt(`${ this.props.auth0.user.name }, Are you sure you want to delete this letter?`).toLowerCase();

    if (yesDelete === 'yes' || yesDelete === 'y')
    {
      this.deleteLetter(id);
    }
  }

  deleteLetter = async (id) =>
  {
    if (this.props.auth0.isAuthenticated)
    {
      try
      {
        // generate a token with auth0
        // we'll use it to make a secure request with to our server
        const res = await this.props.auth0.getIdTokenClaims();

        // this is the raw token
        // note the double underscore __ in .__raw
        const jwt = res.__raw;
        // //console.log('jwt: ', jwt)


        // config to do a `DELETE` request from our server using the user's email
        const config = {
          method: 'delete',
          baseURL: `${ SERVER }`,
          url: `/letters/${ id }`,
          headers: {
            // pass token into the headers
            "Authorization": `Bearer ${ jwt }`
          },
        }

        // log to see what the config file looks like
        // //console.log('add letter config: ', config);
        await axios(config);

        let updatedLetters = this.state.letters.filter(letter => letter._id !== id);

        //console.log(updatedLetters);

        // set the updatedLetters array to state
        this.setState({
          letters: updatedLetters,
          showModal: false,
        });
      }
      catch (err)
      {
        //console.log('This letter wasn\'t deleted. ', err.response);
      }
    }
  }
  showEditForm = letter =>
  {
    //console.log('Letter in Edit Handler: ', letter);
    this.setState({
      displayEdit: true,
      letter: letter,
      showModal: false,
    })
  }
  handleEditSubmit = e =>
  {
    e.preventDefault();
    let letter = {
      title: e.target.title.value,
      recipient: e.target.recipient.value,
      letterBody: e.target.letterBody.value,
      // email: [CALLED FROM AUTH0 SECRET STATE]
      email: this.props.auth0.user.email,
      //score: this.state.scoreText
      _id: this.state.letter._id,
      __v: this.state.letter.__v
    }
    console.log('handleEditSubmit letter:', letter)
    this.updateLetters(letter)
  }

  updateLetters = async updatedLetter =>
  {
    if (this.props.auth0.isAuthenticated)
    {
      try
      {
        // generate a token with auth0
        // we'll use it to make a secure request with to our server
        const res = await this.props.auth0.getIdTokenClaims();

        // this is the raw token
        // note the double underscore __ in .__raw
        const jwt = res.__raw;
        console.log('jwt: ', jwt)


        // config to do a `PUT` request from our server using the user's email
        const config = {
          method: 'put',
          baseURL: `${ SERVER }`,
          url: `/letters/${ updatedLetter._id }`,
          headers: {
            // pass token into the headers
            "Authorization": `Bearer ${ jwt }`
          },
          data: updatedLetter,


        }
        // get the updatedLetter from the database
        let updatedLetterFromDB = await axios(config);

        // update state, so that it can re-render with updatedLetters info

        let updatedLetterArray = this.state.letters.map(existingLetter =>
        {
          // if the `._id` matches the letter we want to update:
          // replace that element with the updatedLetterFromDB letter object

          return existingLetter._id === updatedLetter._id
            ? updatedLetterFromDB.data
            : existingLetter;
        });

        this.setState({
          letters: updatedLetterArray,
          displayEdit: false,
        })
      }
      catch (err)
      {
        //console.log('could not delete this letter: ', err.response.data);
      }
    }
  }

  handleScore = async () =>
  {
    if (this.state.letter)
    {
      let letterToScore = this.state.letter.letterBody || this.state.letterBody;
      console.log(this.state.letter, ' ', this.state.letterBody);
      let URL = `${ SERVER }/sentiment?text=${ letterToScore }`;
      console.log("letter to score", letterToScore);
      let result = await axios.get(URL);
      console.log(result);
      let score = result.data;
      console.log('Score ', score);
      this.setState({
        score: score,
      })
    }
  }


  // letters will load as soon as this page is loaded
  // the page will only be loaded if they get through auth0
  componentDidMount()
  {
    this.getLetters();
  }
  render()
  {

    return (
      this.state.displayAboutUs ?
        <AboutUs
          handleAboutUs={ this.handleAboutUs } />
        :
        <>

          { this.state.displayEdit ?
            <EditForm
              letter={ this.state.letter }
              confirmDelete={ this.confirmDelete }
              handleEditSubmit={ this.handleEditSubmit } />
            :
            <AddForm
              handleAddSubmit={ this.handleAddSubmit }
              handleCharCount={ this.handleCharCount }
            />
          }
          {
            this.state.letters.length
              ? <>
                <Score
                  handleScore={ this.handleScore }
                  score={ this.state.score } />
                <LetterAccordion
                  letters={ this.state.letters }
                  handleModal={ this.handleModal }
                  confirmDelete={ this.confirmDelete }
                />
                <LetterModal show={ this.state.showModal } handleModal={ this.handleModal }
                  letters={ this.state.letters }
                  modalId={ this.state.modalId }
                  confirmDelete={ this.confirmDelete }
                  showEditForm={ this.showEditForm }
                />

              </>
              : <p>Write your beloved a letter!</p>


          }
          <Button style={ { width: "200px", margin: "auto" } } onClick={ () => this.handleAboutUs() }>Meet The Developers</Button>
        </>
    );
  }
}

export default withAuth0(Main);
