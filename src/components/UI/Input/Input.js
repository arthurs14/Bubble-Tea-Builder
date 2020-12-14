import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;

  switch (props.elelmentType) {
    case ('input'):
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value} />;
      break;
    case ('textarea'):
      inputElement = <textarea
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value} />;
      break;
    default:
      inputElement = <input
        classname={classes.InputElement}
        {...props.elementConfig}
        alue={props.value} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;