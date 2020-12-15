import React, { Component } from 'react'
import Auxiliary from '../Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent , axios ) => {
    return class extends Component {
        state = {
            error : null
        }
         UNSAFE_componentWillMount() {

           this.reqInterceptors =  axios.interceptors.request.use(request => {
                this.setState({ error: null})
                return request
            })

            this.resInterceptors =  axios.interceptors.response.use(response => response , error => {
                 this.setState({ error: error})
             })
         }

         componentWillUnmount() {
             axios.interceptors.request.eject(this.reqInterceptors)
             axios.interceptors.response.eject(this.resInterceptors)
         }

        errorHandler = () => {
            return this.setState({error : null})
            }

            render() {
                return(
                    <Auxiliary>
                    <Modal showback={this.state.error}
                           modalClosed={this.errorHandler}>
                         {this.state.error ? this.state.error.message : null} 
                    </Modal>
                    <WrappedComponent {...this.props} />
    
            </Auxiliary>
                )
            }
     };
}
export default withErrorHandler