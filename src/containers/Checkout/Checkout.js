import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

// Summary of what the user will buy
class Checkout extends Component {
  UNSAFE_componentWillMount () {
    this.props.onInitPurchase();
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    const { ings, purchased } = this.props;
    let summary = <Redirect to="/" />;
    

    if (ings) {
      let purchasedRedirect = purchased ? <Redirect to="/" /> : null;
      summary = 
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler} />
          
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData} />
        </div>;
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);