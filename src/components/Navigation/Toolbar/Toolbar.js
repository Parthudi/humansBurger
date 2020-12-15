import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Drawer from '../SideDrawer/DrawerTool/DrawerTool'

const toolbar = (props) => {
    return(
        <header className={classes.Toolbar}>
            
            <Drawer clicked={props.sideClicked}/>

            <div className={classes.Logo} >
                <Logo />
            </div>      
    
               {/* <h1 className={classes.title}> HUMBURGER </h1>    */}

            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticate={props.authe}/>
            </nav>

        </header>
    )
}

export default toolbar