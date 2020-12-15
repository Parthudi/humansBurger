import * as actionTypes from '../action/actionTypes'

const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const reducers = (state=initState, action) => {
    if(action.type === actionTypes.AUTHSTART) {
        return {
            ...state,
            loading: true,
            error: null
        }
    }
 

    if(action.type === actionTypes.AUTHSUCESS) {
        return {
            ...state,
            userId: action.useriD,
            token: action.userToken,
            error: null,
            loading: false
        }
    }
 
    if(action.type === actionTypes.AUTHFAIL) {
        return {
            ...state,
            error: action.error,
            loading: false
        }
    }

    if(action.type === actionTypes.LOGOUTUSER) {
        return {
            ...state,
            token : null,
            userId : null,
        }
    }

    if(action.type ===actionTypes.REDIRECTAUTH) {
        return{
            ...state,
            authRedirectPath: action.path
        }
    }
    return state
}

export default reducers