import React, { Component } from 'react'
import * as action from '../../../store/action/auth'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
// import Spinner from '../../../components/UI/Spinner/Spinner'

class LogOut extends Component {
    componentDidMount() {
        this.props.LogOt()
     }
    render() {
        return <Redirect to="/" />
    }
}

// const mapStateToProps = state => {
//     return {
//         load : state.auth.loading
//     }
// }

const mapDispatchToProps = dispatch => {
    return{
        LogOt : () => dispatch(action.logOutUser())
    }
}

export default connect(null, mapDispatchToProps)(LogOut)