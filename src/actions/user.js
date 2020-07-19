import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types'


export const registerUser = (dataToSubmit) =>  {

        const res = axios.post("/api/users/register", dataToSubmit, {withCredentials: true})
        .then(response => response.data)

        return { type: REGISTER_USER, payload: res}
}

export const loginUser =  (dataToSubmit)  =>  {

    
        const res = axios.post("/api/users/login", dataToSubmit, {withCredentials: true})
        .then(response => response.data)
        
        return {type: LOGIN_USER, payload: res}
        
    
}


export  const  authUser = () => {

    
        const res = axios.get("/api/users/auth", {withCredentials: true})
        .then(response => response.data)

        return {
            type: AUTH_USER,
             payload: res
        }
}

export const  logOutUser =  () =>  {
    
    
        const res = axios.get('/api/users/logout', {withCredentials: true})
        .then(response => response.data)
        
        return {
            type: LOGOUT_USER,
            payload: res
        }
} 
 

