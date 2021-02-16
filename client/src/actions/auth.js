import axios from 'axios';
import { setAlert } from './alerts';
import {
    REQUEST_AUTH_DATA,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';
import setAuthToken from '../utils/setAuthToken';

export const requestData = () => ({
    type: REQUEST_AUTH_DATA
})

// Load User
export const loadUser = () => async dispatch => {
    dispatch(requestData());

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    };

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err) {
        dispatch({
            type: AUTH_ERROR
        })
    };
}

// Register User
export const register = ({ first_name, last_name, username, email, password }) => async dispatch => {
    dispatch(requestData());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ first_name, last_name, username, email, password });

    try {
        const res = await axios.post('/api/users', body, config);
        
        await axios.post('/api/profiles', {}, {
            headers : {
                // Setting the token in the header will only be done
                // on this occasion. For any future private route calling
                // setAuthToken.js will automatically add it when needed.
                'Content-Type': 'application/json',
                // test if rest.data.token is the right location
                // when register component is complete
                'x-auth-token': res.data.token
            }
        })

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// Login User
export const login = ( email, password ) => async dispatch => {
    dispatch(requestData());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch(requestData());

    dispatch({
        type: LOGOUT
    })
};