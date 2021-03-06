import {
    REQUEST_AUTH_DATA,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actions/types';

const initialState = {
    isFetching: false,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isUserLoaded: false,
    user: null,
    loggedOut: false,
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case REQUEST_AUTH_DATA:
            return {
                ...state,
                isFetching: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                isUserLoaded: true,
                loggedOut: false,
                user: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isFetching: false,
                isAuthenticated: true,
                loggedOut: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isFetching: false,
                isAuthenticated: false,
                isUserLoaded: false,
                loggedOut: true,
            };
        default:
            return state;
    }
};