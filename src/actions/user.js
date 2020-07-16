import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from './types'


export const registerUser = (dataToSubmit, cb) => dispatch => {

        axios.post("http://localhost:3002/api/users/register", dataToSubmit)
        .then(response => {

            if(response.data.registerSuccess) {
                dispatch({type: REGISTER_USER, payload: response.data})
                cb(false)
            } else {
                cb(response.data)
            }

        });
}

export const loginUser = (dataToSubmit, cb) => dispatch => {

    axios.post("http://localhost:3002/api/users/login", dataToSubmit)
    .then(response => {

        if(response.data.loginSuccess) {
            dispatch({type: LOGIN_USER, payload: response.data})
            cb(false)
        } else {
            cb(response.data)
        }

    });
}