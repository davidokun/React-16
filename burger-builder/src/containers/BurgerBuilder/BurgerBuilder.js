import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        orderPlaced: false
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((total, el) => {
                return total + el;
            }, 0);

        this.setState({purchasable: sum > 0})
    };

    updateIngredient = (operation, type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = operation(oldCount, 1);
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const currentPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = operation(oldPrice, currentPrice);

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    };

    addIngredientHandler = (type) => {
        this.updateIngredient((value_1, value_2) => value_1 + value_2, type);
    };

    removeIngredientHandler = (type) => {
        this.updateIngredient((value_1, value_2) => value_1 - value_2, type);
    };

    orderPlacedHandler = () => {
        this.setState({orderPlaced: true})
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        let key; // Avoid stupid warning from ESLint
        for (key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.orderPlaced}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    orderPlaced={this.orderPlacedHandler}
                    disabled={disabledInfo}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
