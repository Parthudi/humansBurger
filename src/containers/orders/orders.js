import React, { Component } from 'react'
import Order from '../../components/order/order'
import axios from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../store/action/order'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {

     componentDidMount() {
                this.props.manOrder(this.props.toke, this.props.useID) 
         }
    
    render() {
        let loadingOrders = <Spinner />
        
        if(!this.props.load) {
          loadingOrders= this.props.ord.map(order => (
                            <Order 
                                key={order.id} 
                                name={order.orderData.Name.toUpperCase()+" 'S"}
                                ingredients={order.ingredients}
                                price={+order.price} 
                                 />
                            )
                        )
                    }
        return (
            <div>
                    {loadingOrders}
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        ord: state.order.orders,
        load: state.order.loading,
        toke: state.auth.token,
        useID: state.auth.userId
      }
}

const mapDispatchToProps = dispatch => {
    return {
        manOrder : (toke,useID) => dispatch(orderActions.manageOrders(toke,useID))
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(withErrorHandler( Orders, axios ))