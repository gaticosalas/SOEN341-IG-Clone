const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    //making the reference to the user
    user:{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'users' //referencing the user to the post -->shows who made the post
        },
    //The posted picture
    picture:{
            type: String,
            required: true
        },
    //including a text field for the post's caption
    caption:{
        type: String
    },
    //the post's user username -->if the user deletes an account, the post can still remain
    username: {
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
            username: {
                type: String
            },
            text: {
                type: String,
                required: true
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