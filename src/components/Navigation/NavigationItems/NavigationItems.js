import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem item="Burger Builder" link="/" />
    <NavigationItem item="Orders" link="/orders" />
    <NavigationItem item="Authenticate" link="/auth" />
  </ul>
);

export default navigationItems;