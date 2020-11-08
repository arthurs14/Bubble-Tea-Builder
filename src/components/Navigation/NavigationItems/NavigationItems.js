import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem item="Burger Builder" link="/" active />
    <NavigationItem item="Checkout" link="/" />
  </ul>
);

export default navigationItems;