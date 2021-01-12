import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    // axios.get(`https://react-burger-builder-1b4e0.firebaseio.com/ingredients.json`).then(response => {
    //   this.setState({ ingredients: response.data });
    // }).catch(error => {
    //   this.setState({ error: true });
    // });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const { purchasing, loading, error } = this.state;
    const { price ,onIngredientAdded, onIngredientRemoved } = this.props;

    let ingredients = this.props.ings;
    let disabledInfo = {
      ...ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            price={price}
            purchaseable={this.updatePurchaseState(ingredients)}
            ingredientAdded={onIngredientAdded}
            ingredientDeducted={onIngredientRemoved}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = <OrderSummary
        ingredients={ingredients}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        total={price} />;
    }

    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  }
};
 
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({ type: actionTypes.ADD_INGREDIENTS, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: actionTypes.REMOVE_INGREDIENTS, ingredientName: ingName }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));