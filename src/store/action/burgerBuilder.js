import * as actionTypes from './actionTypes' 
import axios from '../../axios-order'

export const addIngredients = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENTS, 
        ingredientName: ingName
     }
}

export const removeIngredients = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS, 
        ingredientName: ingName
     }
}

export const setIngredients = (ingredients) => {
   
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTSFAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://humburger-166dd.firebaseio.com/ingredients.json').then((response) => {
            dispatch(setIngredients(response.data))
        }).catch((error)  => {
            dispatch(fetchIngredientsFailed()) 
        })
    }
}