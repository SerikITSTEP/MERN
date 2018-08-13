import ajax from 'axios';
import jwtdecode from 'jwt-decode';
import store from '../store';
import {SET_CURRENT_USER} from "../actions/types";


export default function() {
    const token = localStorage.getItem('token');

    if (token ) {
        const decoded = jwtdecode(token);
        if(decoded.exp > Date.now()/1000) {
            ajax.defaults.headers.common['Authorization'] = token;
            store.dispatch({
                type: SET_CURRENT_USER,
                payload: {isAuthenticated: true, user:decoded}

            })
        }
        else {
            localStorage.removeItem("token");
        }
    }else {
        delete ajax.defaults.headers.common['Authorization'];
    }
}