import * as actionTypes from '../action/actionTypes'

const initState = {
        orders: [],
        loading: false,
        purchased: false
}

const reducer = (state = initState, action) => {
    if (action.type === actionTypes.PURCHASEBURGERSUCESS) {
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }
        return {
            ...state,
            orders: state.orders.concat(newOrder),
            loading: false,
            purchased: true
        }
    }

    if (action.type === actionTypes.PURCHASEBURGERFAIL) {
        return {
            ...state,
            loading: false, ///////
            purchased: false
        }
    }

    if (action.type === actionTypes.PURCHASEBURGERSTART) {
        return {
            ...state,
            loading: true, 
            purchased: false
        }
    }

    if (action.type === actionTypes.PURCHASEINIT) {
        return {
            ...state,
            purchased: false
        }
    }

    if (action.type === actionTypes.FETCHORDERSSUCESS) {
    
        return {
            ...state,
            orders: action.orders,
            loading: false
        }
    }

    if (action.type === actionTypes.FETCHORDERSFAIL) {
        return {
            ...state,
            loading: false
        }
    }

    if (action.type === actionTypes.FETCHORDERSSTART) {
        return {
            ...state,
            purchased: true
        }
    }

    return state
}

export default reducer