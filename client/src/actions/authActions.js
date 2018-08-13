import {SET_CURRENT_USER, GET_ERRORS} from "./types";
import ajax from 'axios';
import setAuthToken from "../util/setAuth"

// history for redirect
export const register_user = (userData, history) => dispatch => {
    ajax.post('/api/user/register',userData)
        .then(data => history.push("/login"))
        .catch(err =>{
           dispatch({
              type: GET_ERRORS,
              payload: err.response.data
           });
        })
}

export const login_user = (userData, history) => dispatch => {

    ajax.post('/api/user/login',userData)
        .then(res => {
            localStorage.setItem("token", res.data.token);
            setAuthToken();

            history.push('/profile')
        })
        .catch(err =>{
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        })
}