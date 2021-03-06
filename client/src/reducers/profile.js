import {
    REQUEST_PROFILE_DATA,
    RECEIVE_PROFILE,
    PROFILE_UPDATE_FINISHED,
    PROFILE_FETCHING_ERROR,
    PROFILE_DELETE_FINISHED,
    FOLLOW_HANDLING_FINISHED
} from '../actions/types';

const initialState = {
    isFetching: false,
    profile: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case REQUEST_PROFILE_DATA:
            return {
                ...state,
                isFetching: true,
            };
        case RECEIVE_PROFILE:
            return {
                ...state,
                isFetching: false,
                profile: payload
            };
        case PROFILE_UPDATE_FINISHED:
        case PROFILE_DELETE_FINISHED:
        case FOLLOW_HANDLING_FINISHED:
            return {
                ...state,
                isFetching: false,
            };
        case PROFILE_FETCHING_ERROR:
            return {
                ...state,
                isFetching: false,
                profile: {}
            };
        default:
            return state;
    }
};