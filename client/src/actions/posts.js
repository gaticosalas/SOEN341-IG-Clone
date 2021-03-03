import axios from 'axios';
import { post } from 'request';
import { setAlert } from './alerts';
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
} from './types';

export const requestData = () => ({
    type: REQUEST_POST_DATA
});

export const requestImageData = () => ({
    type: REQUEST_IMAGE_DATA
});

// Create Post
export const createPost = ({ picture, caption }) => async dispatch => {
    dispatch(requestData());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ picture, caption });

    try {
        const res = await axios.post('/api/posts', body, config);

        dispatch({
            type: POST_CREATION_SUCCESS,
        });
        dispatch(setAlert(res.data.msg, 'success'));
        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: POST_CREATION_FAIL
        });
    }
}

// Fetch all Posts
export const fetchAllPosts = () => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: RECEIVE_POSTS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: POSTS_FETCHING_ERROR
        });
    }
}

// Fetch single Post
export const fetchPost = post_id => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.get(`/api/posts/${post_id}`);

        dispatch({
            type: RECEIVE_SINGLE_POST,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: SINGLE_POST_FETCHING_ERROR
        });
    }
}

// delete Post
// This route might need more work depending if we need to remove
// the object from the posts store [to be tested]
export const deletePost = post_id => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.delete(`/api/posts/${post_id}`);

        dispatch({
            type: POST_DELETE_FINISHED,
            payload: post_id
        });
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: POST_DELETE_FINISHED
        });
    }
}

// Fetch an User's Post
export const fetchUserPosts = user_id => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.get(`/api/posts/user/${user_id}`);

        dispatch({
            type: RECEIVE_USER_POSTS,
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: USER_POSTS_FETCHING_ERROR
        });
    }
}

// Like a Post
export const likePost = post_id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${post_id}`);

        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
    }
}

// Like a Post
export const unlikePost = post_id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${post_id}`);

        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };
    }
}

// Create a comment on a Post
export const createComment = (text, post_id) => async dispatch => {
    dispatch(requestData());

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ text });

    try {
        const res = await axios.post(`/api/posts/comment/${post_id}`, body, config);

        dispatch({
            type: RECEIVE_SINGLE_POST,
            payload: res.data.post
        });
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: COMMENT_HANDLING_FAIL
        });
    }
}

// Delete a comment on a Post
export const deleteComment = (post_id, comment_id) => async dispatch => {
    dispatch(requestData());

    try {
        const res = await axios.delete(`/api/posts/comment/${post_id}/${comment_id}`);

        dispatch({
            type: RECEIVE_SINGLE_POST,
            payload: res.data.post
        });
        dispatch(setAlert(res.data.msg, 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: COMMENT_HANDLING_FAIL
        });
    }
}

// Upload a picture to AWS
export const uploadPicture = imageFile => async dispatch => {
    dispatch(requestImageData());

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    var bodyFormData = new FormData();
    bodyFormData.append('image', imageFile);

    try {
        const res = await axios.post('/api/aws/image-upload', bodyFormData, config);

        dispatch({
            type: IMAGE_HANDLING_FINISHED
        });
        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: IMAGE_HANDLING_FINISHED
        });
    }
}

// Delete a picture from AWS
export const deletePicture = image_key => async dispatch => {
    dispatch(requestImageData());

    try {
        const res = await axios.delete(`/api/aws/remove/${image_key}`);

        return dispatch({
            type: IMAGE_HANDLING_FINISHED
        });
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        };

        dispatch({
            type: IMAGE_HANDLING_FINISHED
        });
    }
}