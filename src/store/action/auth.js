import Axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTHSTART,
    }
}

export const authSucess = (idToken, userId) => {
    
    return {
        type: actionTypes.AUTHSUCESS,
        userToken: idToken,
        useriD: userId,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTHFAIL,
        error: error
    }
}

export const logOutUser = () => {
    localStorage.removeItem('Token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.LOGOUTUSER
    }
}

export const authExpiresIn = (expiresIn) => {
    return dispatch => {
       setTimeout(() => {
           dispatch(logOutUser())
       }, expiresIn  * 1000);
    }
}

export const redirectAuth = (path) => {
    return {
        type: actionTypes.REDIRECTAUTH,
        path: path
    }
}

export const authSubmit = (email, password, isSignUp) => {
    return dispatch => {
            dispatch(authStart())
            const authData = {
                email: email,
                password: password,
                returnSecureToken: true
                }
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBZ3pQyrRnrgVtuLw8RIxHyXDSmabU1FUw'
            
            if(!isSignUp) {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBZ3pQyrRnrgVtuLw8RIxHyXDSmabU1FUw'
            }

            Axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('Token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId )
                dispatch(authSucess(response.data.idToken , response.data.localId ))
                dispatch(authExpiresIn(response.data.expiresIn))
            }).catch(error =>  {
               
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('Token')
        if(!token) {
            dispatch(logOutUser())
            } else {
                const expirationDate = new Date(localStorage.getItem('expirationDate'))
                if(expirationDate < new Date()) {
                    dispatch(logOutUser())
                  }
                  else {
                      const userId = localStorage.getItem('userId')
                      dispatch(authSucess(token, userId))
                      dispatch(authExpiresIn((expirationDate.getTime() - new Date().getTime())/1000 ))
                  }
            }
        
    }
}