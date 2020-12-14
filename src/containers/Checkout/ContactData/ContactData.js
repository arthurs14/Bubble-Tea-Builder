import React, { Component } from 'react';

import Button from '../../../components/UI/Button//Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: '',
      }
    },
    loading: false,
  };

  orderHandler = (ev) => {
    ev.preventDefault();

    const { ingredients, price } = this.props;

    // shows loading animation to show that its processing
    this.setState({ loading: true });

    const order = {
      ingredients: ingredients,
      price: price,
      deliveryMethod: 'fastest',
    }

    axios.post('/orders.json', order)
      .then(response => {
        // set it back to false so that it will go back to the order summary
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });


  }

  render() {
    const { loading } = this.state;
    let form = (
      <form>
        <Input
          elementType='...'
          elementConfig='...'
          value='...' />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Email" />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Street" />
        <Input
          inputtype="input"
          type="text"
          name="postal"
          placeholder="Postal" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
      </form>
    );

    if (loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }

}

export default ContactData;

