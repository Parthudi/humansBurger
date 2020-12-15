import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary'

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
        if(props.open) {
            attachedClasses = [classes.SideDrawer, classes.Open]
          }
    return(
        <Auxiliary>
                <BackDrop show={props.open} clicked={props.closed} />
                <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo} onClick={props.closed}>
                    <Logo />
                </div>
                
                <nav>
                    <NavigationItems isAuthenticate={props.authe}/>
                </nav>
            </div>

        </Auxiliary>
            
    )
}

export default  SideDrawer