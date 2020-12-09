import React from 'react';

import classes from './Order.module.css';

const order = ({ ingredients, price }) => (
  <div className={classes.Order}>
    <p>Ingredients: Salad(1)</p>
    <p>Price: <strong>USD {price.toFixed(2)}</strong></p>
  </div>
);

export default order;