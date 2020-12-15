import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from '../NavigationItem/NavigationItem'

const NavigationItems = (props) => {

    return(
        <ul className={classes.NavigationItems}>
                    <NavigationItem link="/" exact> Burger </NavigationItem>
                    {props.isAuthenticate? <NavigationItem link="/orders" > Orders </NavigationItem> : null}
                    {props.isAuthenticate? 
                            <NavigationItem link="/Logout"> LogOut </NavigationItem>  :
                            <NavigationItem link="/Auth"> Authenticate </NavigationItem>
                            }
        </ul>
    )
}

export default NavigationItems