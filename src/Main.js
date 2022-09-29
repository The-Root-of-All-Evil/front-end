import React from 'react';
import AddForm from './AddForm';
import EditForm from './EditForm';
// withAuth0, because this is a Class-based component
// this allows us to use the `user` object in props
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import InvoiceAccordion from './InvoiceAccordion';
import InvoiceModal from './InvoiceModal';
import './Main.css';

import AboutUs from './AboutUs';

let SERVER = process.env.REACT_APP_SERVER;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Invoices: [],
      Invoice: {},
      description: '',
      showModal: false,
      modalId: '',
      displayEdit: false,
      displayAboutUs: false,
    }
  }

  handleAboutUs = (id) => {
    this.setState({
      displayAboutUs: !this.state.displayAboutUs,
    })
  }
  getInvoices = async () => {
    // if the user is authenticated, they can get Invoices
    if (this.props.auth0.isAuthenticated) {
      try {
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
          baseURL: `${SERVER}`,
          url: '/Invoices',
          headers: {
            "email": `${this.props.auth0.user.email}`,

            // pass token into the headers
            "Authorization": `Bearer ${jwt}`
          }
        };
        // //console.log('config: ', config);
        let InvoiceData = await axios(config);

        // 
        //console.log(InvoiceData.data);

        // set the Invoice data from our mongo database into state
        // which'll re-render the page

        let sortedInvoices = InvoiceData.data.sort((a, b) => {
          if (a.recipient.charAt(0).toLowerCase() > b.recipient.charAt(0).toLowerCase()) {
            return 1;
          }

          else if (a.recipient.charAt(0).toLowerCase() < b.recipient.charAt(0).toLowerCase()) {
            return -1;
          }
          else {
            return 0;
          }

        });

        this.setState({
          Invoices: sortedInvoices,
        })
        console.log(sortedInvoices);
      }
      catch (err) {
        //console.log(`Problem getting Invoices for ${this.props.auth0.user.name}: `, err.message);
      }
    }
    else {
      // display a message asking users to log in
      // TODO: change the render to display something to let the user know they aren't logged in and can't see Invoices
      //console.log('please log in');
    }
  }
  handleModal = (id) => {
    this.setState({
      showModal: !this.state.showModal,
      modalId: id
    })
  }
  //make a Invoice object
  handleAddSubmit = (e) => {
    e.preventDefault();
    let invoice = {
      company_name: e.target.addCompany.value,
      project_name: e.target.addProject.value,
      description: this.state.description,
      hourly_rate: e.target.addRate.value,
      hours_worked: e.target.addHours.value,

      //    email: [CALLED FROM AUTH0 SECRET STATE]
      email: this.props.auth0.user.email,
    }

    //console.log('Invoice: ', invoice);

    this.addInvoice(invoice);

  }

  handleCharCount = e => {
    e.preventDefault();
    // //console.log('Invoice body in handle char: ', e.target.value);
    this.setState({
      description: e.target.value,
    });
  }


  //THIS IS THE FUNCTION TO CREATE THE InvoiceS

  addInvoice = async (Invoice) => {
    if (this.props.auth0.isAuthenticated) {
      try {
        // generate a token with auth0
        // we'll use it to make a secure request with to our server
        const res = await this.props.auth0.getIdTokenClaims();

        // this is the raw token
        // note the double underscore __ in .__raw
        const jwt = res.__raw;
        // //console.log('jwt: ', jwt)


        const config = {
          method: 'post',
          baseURL: `${SERVER}`,
          url: '/invoices',
          headers: {
            // pass token into the headers
            "Authorization": `Bearer ${jwt}`
          },
          data: Invoice,
        }

        // log to see what the config file looks like
        // //console.log('add Invoice config: ', config);

        let createdInvoice = await axios(config);

        // log the Invoice that axios returns to us
        //console.log('createdInvoice: ', createdInvoice.data);


        // use spread operator to make a deep copy of Invoices array in state, and concatenate the createdInvoice.data to the end
        this.setState({
          Invoices: [...this.state.Invoices, createdInvoice.data],
        });
      }
      catch (e) {
        console.log('This Invoice wasn\'t saved. ', e.response)
      }
    }
  }

  // function to ask user if they `really want to delete?` their Invoice
  confirmDelete = (id) => {
    let yesDelete = prompt(`${this.props.auth0.user.name}, Are you sure you want to delete this Invoice?`).toLowerCase();

    if (yesDelete === 'yes' || yesDelete === 'y') {
      this.deleteInvoice(id);
    }
  }

  deleteInvoice = async (id) => {
    if (this.props.auth0.isAuthenticated) {
      try {
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
          baseURL: `${SERVER}`,
          url: `/Invoices/${id}`,
          headers: {
            // pass token into the headers
            "Authorization": `Bearer ${jwt}`
          },
        }

        // log to see what the config file looks like
        // //console.log('add Invoice config: ', config);
        await axios(config);

        let updatedInvoices = this.state.Invoices.filter(Invoice => Invoice._id !== id);

        //console.log(updatedInvoices);

        // set the updatedInvoices array to state
        this.setState({
          Invoices: updatedInvoices,
          showModal: false,
        });
      }
      catch (err) {
        //console.log('This Invoice wasn\'t deleted. ', err.response);
      }
    }
  }
  showEditForm = Invoice => {
    //console.log('Invoice in Edit Handler: ', Invoice);
    this.setState({
      displayEdit: true,
      Invoice: Invoice,
      showModal: false,
    })
  }
  handleEditSubmit = e => {
    e.preventDefault();
    let Invoice = {
      title: e.target.title.value,
      recipient: e.target.recipient.value,
      InvoiceBody: e.target.InvoiceBody.value,
      // email: [CALLED FROM AUTH0 SECRET STATE]
      email: this.props.auth0.user.email,
      _id: this.state.Invoice._id,
      __v: this.state.Invoice.__v
    }
    console.log('handleEditSubmit Invoice:', Invoice)
    this.updateInvoices(Invoice)
  }

  updateInvoices = async updatedInvoice => {
    if (this.props.auth0.isAuthenticated) {
      try {
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
          baseURL: `${SERVER}`,
          url: `/Invoices/${updatedInvoice._id}`,
          headers: {
            // pass token into the headers
            "Authorization": `Bearer ${jwt}`
          },
          data: updatedInvoice,


        }
        // get the updatedInvoice from the database
        let updatedInvoiceFromDB = await axios(config);

        // update state, so that it can re-render with updatedInvoices info

        let updatedInvoiceArray = this.state.Invoices.map(existingInvoice => {
          // if the `._id` matches the Invoice we want to update:
          // replace that element with the updatedInvoiceFromDB Invoice object

          return existingInvoice._id === updatedInvoice._id
            ? updatedInvoiceFromDB.data
            : existingInvoice;
        });

        this.setState({
          Invoices: updatedInvoiceArray,
          displayEdit: false,
        })
      }
      catch (err) {
        //console.log('could not delete this Invoice: ', err.response.data);
      }
    }
  }

  // Invoices will load as soon as this page is loaded
  // the page will only be loaded if they get through auth0
  componentDidMount() {
    this.getInvoices();
  }
  render() {
    console.log("invoices in state: ", this.state.Invoices);
    return (
      this.state.displayAboutUs ?
        <AboutUs
          handleAboutUs={this.handleAboutUs} />
        :
        <>

          {this.state.displayEdit ?
            <EditForm
              Invoice={this.state.Invoice}
              confirmDelete={this.confirmDelete}
              handleEditSubmit={this.handleEditSubmit} />
            :
            <AddForm
              handleAddSubmit={this.handleAddSubmit}
              handleCharCount={this.handleCharCount}
            />
          }
          {
            this.state.Invoices.length
              ? <>
                <InvoiceAccordion
                  Invoices={this.state.Invoices}
                  handleModal={this.handleModal}
                  confirmDelete={this.confirmDelete}
                />
                <InvoiceModal show={this.state.showModal} handleModal={this.handleModal}
                  Invoices={this.state.Invoices}
                  modalId={this.state.modalId}
                  confirmDelete={this.confirmDelete}
                  showEditForm={this.showEditForm}
                />

              </>
              : <p></p>


          }
          <Button style={{ width: "200px", margin: "auto" }} onClick={() => this.handleAboutUs()}>Meet The Developers</Button>
        </>
    );
  }
}

export default withAuth0(Main);
