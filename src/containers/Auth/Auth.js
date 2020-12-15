import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/button/button'
import classes from './Auth.css'
import * as authActionTypes from '../../store/action/auth'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router-dom'
import * as authActions from '../../store/action/auth'
import {checkValidity} from '../sharedFiles/Utility'

class Auth extends Component {
    state = {
        controls : {
            Email: {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your E-MAIL'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                        },
                    valid: false,
                    touch: false
                },

            Password: {
                    elementType : 'input',
                    elementConfig : {
                        type : 'password',
                        placeholder : 'Your Password'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLen: 6,
                        maxLen: 12
                        },
                    valid: false,
                    touch: false
                }
            },
         isSignedUp: true
        }


        componentDidMount() {
            if(!this.props.buildin && this.props.authRedi !== '/') {
                    this.props.onRediPat('/')
            }
        }

        isSignedUpHandler = () => {
            this.setState(prevState => {
                    return {isSignedUp : !prevState.isSignedUp}
            })
        }

    changeHandler = (event, iD) => {
            const updatedOrderForm = {
                ...this.state.controls,
                [iD] : {
                    ...this.state.controls[iD],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, this.state.controls[iD].validation),
                    touch: true
                    }
                }
        
                this.setState({ controls: updatedOrderForm})
        }

        onSubmitHandler = (event) => {
            event.preventDefault()

            this.props.onAuthSub(this.state.controls.Email.value, this.state.controls.Password.value, this.state.isSignedUp)
        }

    render() {
        let formInputElement = []   //convert object into array
        for(let key in this.state.controls) {
            formInputElement.push({
                id: key,
                data: this.state.controls[key]
            })
        }

        let errorMessage = null
        if(this.props.error) {
            errorMessage = (<p style={{color:'yellow'}}> {this.props.error.message} </p>)
            }

        let authRedirect = null
        if(this.props.isAuthen) {
            authRedirect = <Redirect to={this.props.authRedi} />
        }
        let form = ( 
                formInputElement.map(formElement => (   //convert array into objects
                    <Input
                        key= {formElement.id}
                        elementType =   {formElement.data.elementType}
                        elementConfig = {formElement.data.elementConfig} 
                        value =         {formElement.data.value} 
                        invalid =       {!formElement.data.valid}
                        shouldvalid =   {formElement.data.validation}
                        touched =       {formElement.data.touch}
                        changed ={ (event) => this.changeHandler(event, formElement.id) } />
                    ))
            )

        if(this.props.load) {
            form = <Spinner />
            }
        
        return(
            <div className={classes.auth}>  
            {authRedirect}
             <p> <strong><u> {!this.state.isSignedUp ? "SIGN-IN FORM" : "SIGN-UP FORM"} </u></strong> </p>
                
                <form onSubmit={ this.onSubmitHandler}> 
                     {form}
                     {errorMessage}
                     <Button btnType={'Success'}> Submit </Button>  <br></br>
                </form>

                <Button clicked={this.isSignedUpHandler} btnType={'Danger'}> Switch to {!this.state.isSignedUp ? 'Signup' : 'Signin'} </Button>
            </div>
         
        )
    }
        
}

const mapStateToProps = state => {
    return {
       load : state.auth.loading,
       error: state.auth.error,
       isAuthen: state.auth.token !== null, //user is authenticated
       buildin : state.burgerBuilder.building,
       authRedi : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSub : (email, password, isSignedUp) => dispatch(authActionTypes.authSubmit(email, password, isSignedUp)),
        onRediPat : (path) => dispatch(authActions.redirectAuth(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth)