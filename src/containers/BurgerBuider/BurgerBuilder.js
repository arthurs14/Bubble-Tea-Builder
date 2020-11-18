import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({ purchaseable: sum > 0 });
  }

  addIngredientHandler = type => {
    let oldCount = this.state.ingredients[type];
    let updatedCount = oldCount + 1;
    let updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    let priceAddition = INGREDIENT_PRICES[type];
    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = type => {
    let oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    let updatedCount = oldCount - 1;
    let updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;

    let priceSubtraction = INGREDIENT_PRICES[type];
    let oldPrice = this.state.totalPrice;
    let newPrice = oldPrice - priceSubtraction;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    //alert('You continued!');
    const { ingredients, totalPrice } = this.state;

    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: {
        name: 'Jisoo Kim',
        address: {
          street: 'YG Street',
          zipCode: '12345',
          country: 'South Korea'
        },
        email: 'jisoo@gmail.com',
      },
      deliveryMethod: 'fastest',
    }
    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  render() {
    const { ingredients, totalPrice, purchaseable, purchasing } = this.state;
    let disabledInfo = {
      ...ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            total={totalPrice} />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          price={totalPrice}
          purchaseable={purchaseable}
          ingredientAdded={this.addIngredientHandler}
          ingredientDeducted={this.removeIngredientHandler}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;