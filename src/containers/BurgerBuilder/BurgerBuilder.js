import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import axios from '../../axios-order'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/action/burgerBuilder'
import * as orderActions from '../../store/action/order'
import * as authActions from '../../store/action/auth'

class BurgerBuilder extends Component {
    
    state = {
        purchasable : true,
        showOrder : false,
         }
         
        componentDidMount() {
                
                this.props.initIngred()
        }
         
    updatePurchaseState = (ingredients) => {
       
            const sum = Object.keys(ingredients).map((item) => {
                return ingredients[item]
                }).reduce((ing , el) => {
                        return ing + el
                    }, 0)
                return sum <= 0
                }


    showingorder = () => {
        if(this.props.authen) {
            this.setState({showOrder : true})
        } else {
            this.props.authRed('/checkout')
            this.props.history.push('/auth')
        }
            
          }

    closeShowOrder = () => {
            this.setState({showOrder : false})
        }

    agreeShowOrder = () => {
            this.props.purchInit()
            this.props.history.push('/checkout')     
    }

    render() {
       
        const disableInfo =  {
            ...this.props.ing
           }
        for(let key in disableInfo)  {
            disableInfo[key] = disableInfo[key] <= 0
          }

        let orderSummary = null
        let burger = this.props.error? <p> Ingredients cannot be loded </p> : <Spinner />

        if(this.props.ing) {
            burger = (
                <Auxiliary>
                    <Burger  ingredients={this.props.ing}/>
                    <BuildControls  added={this.props.addIngred} 
                        remove={this.props.removeIngred}  
                        disable={disableInfo}
                        purchase={this.updatePurchaseState(this.props.ing)}
                        price={this.props.prz}
                        showorder={this.showingorder}
                        isAuth = {this.props.authen}/>
                </Auxiliary>
                );
             orderSummary = < OrderSummary 
                    ingredients={this.props.ing} 
                    price={this.props.prz}
                    ordercancel={this.closeShowOrder}
                    ordercontinue={this.agreeShowOrder}         />

          }
         
        return(
            <Auxiliary>
               
                <Modal showback={this.state.showOrder} modalClosed={this.closeShowOrder}> 
                   {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        prz: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        authen: state.auth.token !== null,  //user is authenticated,
        authRedir: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngred : (ingName) => dispatch(burgerBuilderActions.addIngredients(ingName)),
        removeIngred : (ingName) => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        initIngred : () => dispatch(burgerBuilderActions.initIngredients()),
        purchInit : () => dispatch(orderActions.purchaseInit()),
        authRed : (path) => dispatch(authActions.redirectAuth(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder , axios))




    // addUpdatedIngredient = (type) => {
    //         const oldIngredient = this.state.ingredients[type]
    //         const countUpdated = oldIngredient + 1;
    //         const updatedIngredient = {
    //             ...this.state.ingredients
    //             }
    //         updatedIngredient[type] = countUpdated

    //         const prizeAdded = INGREDIENTS_PRICE[type]
    //         const oldPrize   = this.state.totalPrice
    //         const newPrize   = oldPrize + prizeAdded
    //         this.updatePurchaseState(updatedIngredient)
          
    //         this.setState({ingredients: updatedIngredient , totalPrice: newPrize })
    //         }

    // removeUpdatedIngredient = (type) => {
    //         const oldIngredient = this.state.ingredients[type]
    //         if(oldIngredient <= 0 ) {
    //             return ;
    //             }
    //         const countUpdated = oldIngredient - 1;
    //         const updatedIngredient = {
    //             ...this.state.ingredients
    //             }
    //         updatedIngredient[type] = countUpdated

    //         const prizeSubtracted = INGREDIENTS_PRICE[type]
    //         const oldPrize   = this.state.totalPrice
    //         const newPrize   = oldPrize - prizeSubtracted
    //         this.updatePurchaseState(updatedIngredient)
     
    //         this.setState({ ingredients: updatedIngredient , totalPrice: newPrize })
    //      }