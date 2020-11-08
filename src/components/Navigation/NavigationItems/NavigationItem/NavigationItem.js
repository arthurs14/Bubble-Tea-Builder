import React from 'react';
import classes from './NavigationItem.module.css';

const navigationItem = ({ item, link, active }) => (
  <li className={classes.NavigationItem}>
    <a
      href={link}
      className={active ? classes.active : null}>{item}</a>
  </li>
);

export default navigationItem;