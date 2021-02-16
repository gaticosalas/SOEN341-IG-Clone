import axios from 'axios';
import { setAlert } from './alerts';
import {
    REQUEST_PROFILE_DATA,
    RECEIVE_PROFILE,
    PROFILE_UPDATE_FINISHED,
    PROFILE_DELETE_FINISHED,
    FOLLOW_HANDLING_FINISHED,
    PROFILE_FETCHING_ERROR
} from './types';

export const requestData = () => ({
    type: REQUEST_PROFILE_DATA
});

// update bio
export const updateBio = bio => async dispatch => {
    dispatch(requestData());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ bio });

    try {
        const res = await axios.post('/api/profiles', body, config);

        dispatch({
            type: PROFILE_UPDATE_FINISHED,
        });
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        
        dispatch({
            type: PROFILE_UPDATE_FINISHED
        });
    }
}

// Fetch my profile
export const fetchMyProfile = () => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.get('/api/profiles/me');

        dispatch({
            type: RECEIVE_PROFILE,    
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        
        dispatch({
            type: PROFILE_FETCHING_ERROR
        });
    }
}

// Fetch profile by user id
export const fetchProfile = user_id => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.get(`/api/profiles/user/${user_id}`);

        dispatch({
            type: RECEIVE_PROFILE,    
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        
        dispatch({
            type: PROFILE_FETCHING_ERROR
        });
    }
}

// delete Profile (also deletes user and posts)
export const deleteProfile = () => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.delete('/api/profiles');

        dispatch({
            type: PROFILE_DELETE_FINISHED,    
        });
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        
        dispatch({
            type: PROFILE_DELETE_FINISHED
        });
    }
}

// Follow a user
// Might add res.data to the profile store if needed. Test later
export const followUser = user_id => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.put(`/api/profiles/follow/${user_id}`);

        dispatch({
            type: FOLLOW_HANDLING_FINISHED,    
        });
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        
        dispatch({
            type: FOLLOW_HANDLING_FINISHED
        });
    }
}

// Unfollow a user
export const unfollowUser = user_id=> async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.delete(`/api/profiles/follow/${user_id}`);

        dispatch({
            type: FOLLOW_HANDLING_FINISHED,    
        });
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
        
        dispatch({
            type: FOLLOW_HANDLING_FINISHED
        });
    }
}