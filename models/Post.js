const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    //making the reference to the user
    user:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'users' //referencing the user to the post -->shows who made the post
        },
    //including a text field for the post's caption
    caption:{
        type: String,
        required: true //should a text field be mandatory though?
    },
    //the post user's name -->if the user deletes an account, the post can still remain
    name: {
        type: String
    },
    //the user's profile pic
    avatar: {
        type: String
    },
    //the 'likes' or in this case bookmarking -->storing them in an array
    likes: [
    {
        //this will allow us to know which likes came from which users
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    }],

    //date the post was published on
    date: {
        type: Date,
        default: Date.now
    },
    //comments on the post will be stored in this array
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String
            },
            //profile pic
            avatar: {
                type: String
            },
            //date the comment was posted on
            date: {
                type: Date,
                default: Date.now //current date gets put by default
            }
        }
    ]
});

module.exports = Post = mongoose.model('post', PostSchema);