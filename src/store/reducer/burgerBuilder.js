import * as actionTypes from '../action/actionTypes'

const initialState = {
    ingredients: null,
    totalPrice: 35,
    error: false,
    building: false
}

const INGREDIENTS_PRICE = {
    salad : 8,
    bacon : 12,
    cheese: 15,
    meat  : 20
};

const reducers = (state = initialState, action) => {
     if(action.type === actionTypes.ADD_INGREDIENTS) {
         return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] + 1
               },
            totalPrice : state.totalPrice + INGREDIENTS_PRICE[action.ingredientName] ,
            building: true
         }
     }

     if(action.type === actionTypes.REMOVE_INGREDIENTS) {
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
        },
        totalPrice : state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
        building: true
      }
    }

    if(action.type === actionTypes.SET_INGREDIENTS) {
        
        return {
            ...state,
            ingredients: {
              //  ingredients : action.ingredients ,
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            },
            totalPrice: 35,
            error: false,
            building: false
        }
    }

    if(action.type === actionTypes.FETCH_INGREDIENTSFAILED) {
        return {
            ...state,
            error: true
        }
    }
    return state
}

export default reducers