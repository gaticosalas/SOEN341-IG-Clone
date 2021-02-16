import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import posts from './posts';
import profile from './profile';

export default combineReducers({
    alert,
    auth,
    posts,
    profile
});