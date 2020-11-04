import React from 'react';
import Aux from '../../../hoc/Auxiliary';

const orderSummary = ({ ingredients }) => {
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
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default orderSummary;