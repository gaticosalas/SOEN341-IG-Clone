import {
    REQUEST_POST_DATA,
    REQUEST_IMAGE_DATA,
    POST_CREATION_SUCCESS,
    POST_CREATION_FAIL,
    RECEIVE_POSTS,
    RECEIVE_USER_POSTS,
    RECEIVE_SINGLE_POST,
    POSTS_FETCHING_ERROR,
    USER_POSTS_FETCHING_ERROR,
    SINGLE_POST_FETCHING_ERROR,
    POST_DELETE_FINISHED,
    COMMENT_HANDLING_FAIL,
    IMAGE_HANDLING_FINISHED
} from '../actions/types';

const initialState = {
    isFetching: false,
    isImageFetching: false,
    userPosts: [],
    posts: [],
    post: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case REQUEST_POST_DATA:
            return {
                ...state,
                isFetching: true,
            };
        case REQUEST_IMAGE_DATA:
            return {
                ...state,
                isImageFetching: true,
            };
        case POST_CREATION_SUCCESS:
        case POST_CREATION_FAIL:
        case COMMENT_HANDLING_FAIL:
        case POST_DELETE_FINISHED:
            let userPosts = state.userPosts;
            if (payload) {
                userPosts = userPosts.filter(post => post._id !== payload);
            }
            return {
                ...state,
                userPosts,
                isFetching: false,
            };
        case IMAGE_HANDLING_FINISHED:
            return {
                ...state,
                isImageFetching: false,
            };
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                posts: payload
            };
        case RECEIVE_USER_POSTS:
            return {
                ...state,
                isFetching: false,
                userPosts: payload
            };
        case RECEIVE_SINGLE_POST:
            return {
                ...state,
                isFetching: false,
                post: payload
            };
        case POSTS_FETCHING_ERROR:
            return {
                ...state,
                isFetching: false,
                posts: []
            };
        case USER_POSTS_FETCHING_ERROR:
            return {
                ...state,
                isFetching: false,
                userPosts: []
            };
        case SINGLE_POST_FETCHING_ERROR:
            return {
                ...state,
                isFetching: false,
                post: {}
            };
        default:
            return state;
    }
};