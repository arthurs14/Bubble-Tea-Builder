import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = ({ ingredientAdded }) => (
  <div className={classes.BuildControls}>
    {
      controls.map(el => (
        <BuildControl
          key={el.label}
          label={el.label}
          added={() => ingredientAdded(el.type)}
        />
      ))
    }
  </div>
);

export default buildControls;