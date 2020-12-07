import React, { Component } from 'react';

import Button from '../../../components/UI/Button//Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
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
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Street" />
        <input className={classes.Input} type="text" name="postal" placeholder="Postal" />
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

