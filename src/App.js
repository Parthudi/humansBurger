import React, { Component, Suspense } from 'react';
import Layout from './containers/layout/layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {Route, Switch, Redirect} from 'react-router-dom'
import Footer from './components/footer/footer'
import {connect} from 'react-redux'
import Auth from './containers/Auth/Auth'
import * as actionTypes from './store/action/auth'
import Spinner from './components/UI/Spinner/Spinner'
import Checkout from './containers/checkout/checkOut'

// const Checkout = React.lazy(() => import('./containers/checkout/checkOut')) 
const LogOut = React.lazy(() => import('./containers/Auth/LogOut/LogOut'))
const Orders = React.lazy(() => import('./containers/orders/orders'))

class App extends Component {

  componentDidMount() {
      this.props.authechecke()
  }

  render() {

    let routes = (
      <Switch>
          <Route path='/auth'  component={Auth} />
        
          <Route path='/' exact component={BurgerBuilder}/>
          <Redirect to="/" />
      </Switch>
    )
  
    if(this.props.isAuthen) {
     routes=( <Switch>
                  <Route path='/checkout' component={Checkout} />

                  <Route path='/orders'  render={ () => (
                    <Suspense fallback={ <Spinner />} >
                        <Orders />
                    </Suspense>  
             )} />

                  <Route path='/Logout'  render={ () => (
                    <Suspense fallback={ <Spinner />} >
                      <LogOut />
                    </Suspense>  
             )} />

                <Route path='/auth'  component={Auth} />

                  <Route path='/' exact component={BurgerBuilder}/>

                  <Redirect to="/" />
              </Switch>
        )}

    return (
      <div >
        <Layout>
           {routes}
        </Layout>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthen : state.auth.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    authechecke : () => dispatch(actionTypes.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
