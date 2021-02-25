import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button//Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true,
      }
    },
    formIsValid: false,
  };

  orderHandler = (ev) => {
    ev.preventDefault();

    // shows loading animation to show that its processing

    const { ings, price, onOrderBurger, token, userId } = this.props;
    const { orderForm } = this.state;

    let formData = {};

    for (let orderKey in orderForm) {
      formData[orderKey] = orderForm[orderKey].value;
    }

    const order = {
      ingredients: ings,
      price: price,
      orderData: formData,
      userId: userId,
    };

    onOrderBurger(order, token);
  }
  
  inputChangedHandler = (ev, inputIdentifier) => {
    const { orderForm } = this.state;

    // gets all the info from that one key
    let updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: ev.target.value,
      valid: checkValidity(ev.target.value, orderForm[inputIdentifier].validation),
      touched: true,
    });

    let updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    // sets the new value
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  render() {
    const { orderForm, formIsValid } = this.state;
    const { loading } = this.props;
    let formElementsArr = [];

    for (let key in orderForm) {
      formElementsArr.push({
        id: key,
        config: orderForm[key],
      });
    }

    console.log('[formElementsArr]', formElementsArr);

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArr.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

