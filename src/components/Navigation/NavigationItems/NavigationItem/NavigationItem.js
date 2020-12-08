import React from 'react';
import { NavLink } from 'react-router-dom'

import classes from './NavigationItem.module.css';

const navigationItem = ({ item, link, active }) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={link}
      exact
      activeClassName={classes.active}>{item}</NavLink>
  </li>
);

export default navigationItem;