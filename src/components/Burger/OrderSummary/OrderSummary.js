import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to be a class
  componentDidUpdate() {
    console.log('[OrderSummary ] Did Update');
  }

  render() {
    const { ingredients, purchaseCancelled, purchaseContinued, total } = this.props;
    const ingredientSummary = Object.keys(ingredients).map(igKey => {
      return (
        <li key={igKey + 1}>
          <span
            style={{ textTransform: 'capitalize' }}>
            {igKey}
          </span>: {ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Burger with the follow:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price</strong>: ${total.toFixed(2)}</p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={purchaseContinued}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;