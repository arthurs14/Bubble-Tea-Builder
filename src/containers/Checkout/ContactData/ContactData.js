import React, { Component } from 'react';

import Button from '../../../components/UI/Button//Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postCode: '',
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
      customer: {
        name: 'Jisoo Kim',
        address: {
          street: 'YG Street',
          zipCode: '12345',
          country: 'South Korea'
        },
        email: 'jisoo@gmail.com',
      },
      deliveryMethod: 'fastest',
    }

    axios.post('/orders.json', order)
      .then(response => {
        // set it back to false so that it will go back to the order summary
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });


  }

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        <form>
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }

}

export default ContactData;

