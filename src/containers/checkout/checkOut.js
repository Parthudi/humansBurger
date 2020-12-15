import React, { Component } from 'react'
import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary'
import ContactData from './contactdata/contactdata'
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import classes from './checkOut.css'

class Checkout extends Component {

    cancelHandler = () => {
            this.props.history.goBack()
    }

    continueHandler = () => {
        
        setTimeout(() => {  
            window.scrollBy(0, 660)
           
        }, 500);
        this.props.history.replace('./checkout/contact-details')  //this will change the URL only.
    }

    render() { 

        let summary = <Redirect to={'/'} />
        
        if(this.props.ing) {

            const purchaseHandler = this.props.purch ? <Redirect to='/' /> : null
            
                summary = (
                        <div className={classes.scr}>
                            {purchaseHandler}
                            <CheckoutSummary
                                ingredients={this.props.ing}
                                checkOutCancelHandler={this.cancelHandler}
                                checkOutContinueHandler={this.continueHandler} />
                            
                            <Route path={this.props.match.path + '/contact-details'} component={ContactData}  />
                        </div>
                      )
                }
        
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        purch: state.order.purchased
    }
}

export default connect(mapStateToProps, null)(Checkout)