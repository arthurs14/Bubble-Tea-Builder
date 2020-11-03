import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = ({ ingredients }) => {
  // turns object into an array by keys then created BurgerIngredient for every
  const transformedIngredients = Object.keys(ingredients).map(igKey => {
    return [...Array(ingredients[igKey])].map((_, i) => {
      console.log(igKey, i);
      return <BurgerIngredient key={igKey + i} type={igKey} />
    });
  });

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;