import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import classes from './layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component {
    state = {
        ShowSideDrawer : false
      }
    
    CloseSideDrawer = () => {
       this.setState({ ShowSideDrawer : !this.state.ShowSideDrawer })
          }

    TogSideDrawer = () => {
        this.setState((prevState) => { 
          return  { ShowSideDrawer : !prevState.SideDrawer }
        })
    }

render() {
    return (
        <Auxiliary>
              <Toolbar authe={this.props.isAuthen} sideClicked={this.TogSideDrawer} />
              <SideDrawer authe={this.props.isAuthen} open={this.state.ShowSideDrawer} closed={this.CloseSideDrawer}/> 

            <main className={classes.content}>
                    {this.props.children}
            </main>
        
            </Auxiliary>
            
        )
    }
    
}

const mapStateToProps = state => {
    return {
        isAuthen : state.auth.token !== null  //user is authenticated user. 
    }
}

export default connect(mapStateToProps)(Layout)