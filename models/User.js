const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({});

module.exports = User = mongoose.model('user', UserSchema);