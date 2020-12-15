import * as actionTypes from './actionTypes' 
import axios from '../../axios-order'

export const purchaseBurgerSucess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASEBURGERSUCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASEBURGERFAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASEBURGERSTART
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        
        axios.post('/orders.json?auth=' +token ,orderData).then((response) => {
          
           dispatch( purchaseBurgerSucess(response.data.name, orderData))
       }).catch((error) =>  {
               dispatch(purchaseBurgerFail(error))
       })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASEINIT
    }
}

export const fetchOrdersSucess = (orders) => {
    return {
        type: actionTypes.FETCHORDERSSUCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FETCHORDERSFAIL,
        error: err 
    }
}

export const fetchOrdersStart = (err) => {
    return {
        type: actionTypes.FETCHORDERSSTART
    }
}

export const manageOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
 
        const queryParams = '?auth='+token +'&orderBy="userId"&equalTo="'+userId+'"'
        axios.get('/orders.json' +queryParams).then( res => {
            
            const fetchedOrders = [];
            for(let key in res.data) {
                fetchedOrders.push( {
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSucess(fetchedOrders))
           // this.setState({loading: false, orders: fetchedOrders })
        })
        .catch( err => {
            dispatch(fetchOrdersFail(err))
        })
    }
}
