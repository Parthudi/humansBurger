import React from 'react'
import classes from './BuildControls.css'
import BuildControl from '../BuildControls/BuildControl/BuildControl'

const controls = [
        {label: 'Salad', type:'salad'},
        {label: 'Bacon', type:'bacon'},
        {label: 'Cheese', type:'cheese'},
        {label: 'Meat', type:'meat'}
]

const buildControls = (props) => {

   let WoWbutt = <button className={classes.OrderButton} onClick={props.showorder} disabled={props.purchase}>
                        ORDER NOW
              </button>

        if(!props.isAuth) {
            WoWbutt = <button className={classes.OrderButton} onClick={props.showorder} disabled={props.purchase}>
                     SignIn To Order 
                   </button>
        }
        return(
            <div className={classes.BuildControls}>
                  <p className={classes.Prize}>Current Prize: <strong>{props.price.toFixed(2)}</strong> Rs</p>
                       { controls.map((item) => {
                               return (<BuildControl  
                                        key={item.label}
                                        label={item.type}
                                        add={() => props.added(item.type)} 
                                        rem={() => props.remove(item.type)} 
                                        disabled={ props.disable[item.type]} />)
                       })}
           
                       {WoWbutt} 
           
                     
            </div>
        )
}

export default buildControls