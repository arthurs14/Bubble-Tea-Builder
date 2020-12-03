import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Enjoy Your Burger!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button
        btnType="Danger"
        clicked={checkoutCancelled}>Cancel</Button>
      <Button
        btnType="Success"
        clicked={checkoutContinued}>Continue</Button>
    </div>
  );
};

export default checkoutSummary;