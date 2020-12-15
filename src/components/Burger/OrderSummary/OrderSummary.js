import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/button/button'

const orderSummary = (props) => {
    
        const ingredientSummary = Object.keys(props.ingredients).map((item) => {
            return (
            <li key={item}>
                <span style={{textTransform:"capitalize"}}>{item}</span>  : {props.ingredients[item]}
            </li>
            )
        })
        return(
            <Auxiliary>
                    <h3> Your Order </h3>
                    <p> Your delicious burger with following ingredients: </p>
                    <ul>
                            {ingredientSummary}
                    </ul>
                    <h4> Total Price: {props.price} </h4>
                    <p> Continue to Checkout? </p>
                   <Button btnType={'Danger'} clicked={props.ordercancel}> CANCEL </Button> 
                   <Button btnType={'Success'} clicked={props.ordercontinue}> CONTINUE </Button>
                    
            </Auxiliary>
        )

}

export default orderSummary