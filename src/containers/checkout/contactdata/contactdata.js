import React, { Component } from 'react'
import Button from '../../../components/UI/button/button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './contactdata.css'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux'
import axios from '../../../axios-order'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderAction from  '../../../store/action/order'
import {checkValidity} from '../../sharedFiles/Utility'

class ContactData extends Component {
    state = {
        orderForm: {
                Name: {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Your Name'
                        },
                        value: '',
                        validation: {
                            required: true,
                            minLen: 4,
                            maxLen: 20
                            },
                        valid: false,
                        touch: false
                        } ,

                Street: {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Street'
                        },
                        value: '',
                        validation: {
                            required: true,
                            minLen: 4,
                            maxLen: 20
                            },
                        valid: false,
                        touch: false
                        } ,

                Area: {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Area'
                          },
                          value: '',
                          validation: {
                              required: true,
                              minLen: 3,
                              maxLen: 20
                              },
                          valid: false,
                          touch: false
                    } ,

                ZipCode: {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Zip Code'
                        },
                        value: '',
                        validation: {
                            required: true,
                            isNumeric: true
                            },
                        valid: false,
                        touch: false
                    } ,
        
                Country: {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Country'
                        },
                        value: '',
                        validation: {
                            required: true
                            },
                        valid: false,
                        touch: false
                        } ,

                Email: {
                        elementType : 'input',
                        elementConfig : {
                            type : 'text',
                            placeholder : 'Email'
                      },
                        value: '',
                        validation: {
                            required: true,
                            isEmail: true
                            },
                        valid: false,
                        touch: false
                        } ,

                PaymentMethod: {
                    elementType : 'select',
                    elementConfig : {
                            options: [
                                {value: 'cardpayment' , displayValue: 'Card Payment'},
                                {value: 'netbanking' , displayValue: 'Net Banking'},
                                {value: 'cash payment' , displayValue: 'Cash On Delivery'},
                            ]
                      },
                      value: 'cardpayment',
                      validation: {},
                        valid: true,
                    } ,
        },
        formIsValid: false,
    }

    

    changeHandler = (event , iD) => {
        const updatedOrderForm = {
            ...this.state.orderForm
            }
        const updatedFormElement = {
            ...updatedOrderForm[iD]   //values[key]
           }
        updatedFormElement.value = event.target.value   //value field = target in each name,zipcode......
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touch = true
        updatedOrderForm[iD] = updatedFormElement

        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({ orderForm : updatedOrderForm, formIsValid: formIsValid })
    }

    orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        for(let formDataIdentifier in this.state.orderForm) { 
            formData[formDataIdentifier] = this.state.orderForm[formDataIdentifier].value
            }

           const orders = {
                ingredients: this.props.ing,
                price : this.props.prz,
                orderData : formData,
                userId : this.props.useID
              }
              
        this.props.burgerPurch(orders, this.props.toke)
    }

    render() {
        let formElementArray = []
        for(let key in this.state.orderForm) { //let name,street,area,contry..... in this.state.orderForm
            formElementArray.push({
                id: key,  //name,street,area,contry,email,paymentmethod .
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                
                {formElementArray.map(formElement => (
                        <Input 
                         key =           {formElement.id} 
                         elementType =   {formElement.config.elementType}
                         elementConfig = {formElement.config.elementConfig} 
                         value =         {formElement.config.value} 
                         invalid =       {!formElement.config.valid}
                         shouldvalid =   {formElement.config.validation}
                         touched =       {formElement.config.touch}
                         changed ={ (event) => this.changeHandler(event, formElement.id) } />
                    ))}
                    
                <Button btnType={'formSuccess'} disabled={!this.state.formIsValid} > ORDER! </Button> 
            </form>
            )
        if(this.props.load) {
            form = <Spinner />
        } 
       
        return (
            <div>
           
            <div className={classes.contactdata}>
                <h2> Enter your Contact Details </h2>
                {form}
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        prz: state.burgerBuilder.totalPrice,
        ord: state.order.orders,
        load: state.order.loading,
        toke: state.auth.token,
        useID: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        burgerPurch :  (orderData, toke) => dispatch(orderAction.purchaseBurger(orderData, toke)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))