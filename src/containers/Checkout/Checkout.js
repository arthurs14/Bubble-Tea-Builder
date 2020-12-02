import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

// Summary of what the user will buy
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary ingredients={ingredients} />
      </div>
    );
  }
}

export default Checkout;