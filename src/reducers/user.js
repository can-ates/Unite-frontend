import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from '../actions/types'

const INITIAL_STATE = {
    userData: {
        isAuth: null
    }
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case REGISTER_USER:
            return {
                ...state,
                userData: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                userData: action.payload
            }
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            }
        case LOGOUT_USER:
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state
    }
}