import React from 'react'
import classes from './order.css'

const order = (props) => {

    //to convert object form to array !!
    const ingredients = [];

    for(let ingredientName in props.ingredients) {
            ingredients.push({
                name: ingredientName, 
                amount: props.ingredients[ingredientName] 
            })
       }

    const ingredientsOutput = ingredients.map(ing => {
        return <span 
                    style={{
                                backgroundColor: 'yellowgreen',
                                textTransform:'capitalize',
                                display: 'inline-block',
                                margin: '0 8px',
                                border: '1px solid grey',
                                borderRadius: '5px',
                                padding: '6px'
                            }}
                    key={ing.name}> {ing.name} ({ing.amount}) </span> 
            })
          
    return(
        <div className={classes.order}>
            <span> {props.name }  Order </span>
            <p> Ingredients: {ingredientsOutput} </p>
            <p> price: <strong> {props.price.toFixed(2)} Rs.</strong> </p>
        </div>
    )
}

export default order