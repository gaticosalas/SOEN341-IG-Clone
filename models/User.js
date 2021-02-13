const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    email: {
       type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);
