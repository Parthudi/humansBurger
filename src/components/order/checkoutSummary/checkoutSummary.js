import React from 'react'
import Button from '../../UI/button/button'
import Burger from '../../Burger/Burger'
import classes from './checkoutSummary.css'
//
const CheckoutSummary = (props) => {

    //    window.scrollBy(0, 100)
        return(
            <div className={classes.CheckoutSummary}>

                <h1> We hope it tastes well! </h1> <br></br>

                <div style={{width:'100%'}}>
                    <Burger ingredients={props.ingredients}/>
                </div>

                    <Button btnType={'Danger'}  clicked={props.checkOutCancelHandler} > CANCEL </Button> 
                    <Button btnType={'Success'} 
                            clicked={props.checkOutContinueHandler}   > CONTINUE </Button> 

                </div>
           
        )

}

export default CheckoutSummary