const express = require('express');
const router = express.Router();

//need validated authorization to proceed
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

//importing all necessary models ->User model, Profile Model, Post Model
//getting the user's name, their avatar, etc. but not sending it with the requests
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route POST api/posts
// @desc creating a post
// @access Private
router.post('/', [auth, check('picture', "Picture is necessary").not().isEmpty()], //pics are necessary to create post
async (req,res) => {
    const errors= validationResult(req);
    if(!errors.isEmpty()) {//now doing error checks below -->using try catch for server error
        return res.status(400).json({errors: errors.array() });
    }

    try {//user is logged in, has token, and thus ID is available
        const user = await User.findById(req.user.id).select('-password'); //don't need to send in the password so omit it
        const newPost = new Post({
            picture: req.body.picture,
            caption: req.body.caption,
            username: user.username, //getting the username of the user who is making the post
            avatar: user.avatar, //getting the avatar of the user who is making the post
            user: req.user.id
    });
    const post = await newPost.save(); //waits for the response (the post being saved) before proceeding
    res.json({ post, msg: "Post created successfully!"});}
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error"); //server side error
    }});

// @route GET api/posts
// @desc Getting All Posts Request
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({date:-1}); //date set to -1 sorts them by most recent, default is oldest first otherwiser
        res.json(posts);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
})

// @route GET api/posts/:id
// @desc Get Post by ID
// @access Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(400).json({msg: "Post Not Found"})
        res.json(post);
    } catch(err) {
        console.error(err.message);
        if(err.kind == "objectId"){
            return res.status(400).json({msg:"Post Not Found"})
        }
        res.status(500).send("Server Error")
    }
});

// @route DELETE api/posts/:id
// @desc Delete Post by ID
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try { const post = await Post.findById(req.params.id);
        if (!post) return res.status(400).json({msg: "Post Not Found"});

        //Only allows the Post object's owner to delete it
        if(post.user.toString() !==req.user.id) {
            return res.status(401).json({msg: "User is not Authorized" });
        }
        await post.remove();
        res.json({msg: "Post has been removed" });
    } catch(err) {
        console.error(err.message);

        if(err.kind == 'ObjectId') {return res.status(400).json({msg: "Post Not Found"})}

        res.status(500).send("Server Error")
    }
});

// @route GET api/posts/user/:user_id
// @desc Get Posts by User ID
// @access Private
router.get('/user/:user_id', auth, async (req, res) => {
    try { const posts = await Post.find().where('user').in(req.params.user_id).exec();
        if (!posts) return res.status(400).json({msg: "No Posts Found for this User"})
        res.json(posts);}
        catch(err) {
            console.error(err.message);
            if(err.kind == 'ObjectId') {return res.status(400).json({msg: "No Posts Found for this User"})}
            res.status(500).send("server Error")
        }
});

// @route GET api/posts/myFeed
// @desc Get Posts of users followed by current user
// @access Private
router.get('/myFeed/:user_id', auth, async (req, res) => {
    try { 
        const myProfile = await Profile.findOne({ user: req.params.user_id });
        
        let feed = [];

        await Promise.all(myProfile.follows.map(async (user) => {
            const posts = await Post.find().where('user').in(user.user).exec();
            posts.forEach(post => feed.push(post));
        }));

        if (feed) {
            feed.sort((a, b) => b.date - a.date);
        } else return res.status(400).json({msg: "Feed is empty"});

        res.json(feed);
    } catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {return res.status(400).json({msg: "One of the followed users ID does not exist"})}
        res.status(500).send("server Error")
    }
});

// @route PUT api/posts/like/:id
// @desc Like Post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
    try { const post = await Post.findById(req.params.id);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg:"Post has already been Liked"});
        }
        post.likes.unshift({user : req.user.id});
        await post.save();
        res.json({msg: "Post liked successfully"});
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// @route PUT api/posts/unlike/:id
// @desc Unlike Post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
    try { const post = await Post.findById(req.params.id);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length ===0) { //checks to see if the post hasn't been liked by the user yet
            return res.status(400).json({msg: "Post has not been Liked" });
        }
        //remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save();
        res.json({msg: "Post unliked succesfully"});
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route POST api/posts/comment/:id
// @desc Creates comment on a post
// @access Private
router.post('/comment/:id', [auth, check('text', "Text is Required").not().isEmpty()], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){return res.status(400).json({errors: errors.array() });
}
try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);

    const newComment = {
        text: req.body.text,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id
    };
    post.comments.unshift(newComment);
    await post.save();
    restart.json({post, msg: "Comment created successfully"});
} catch(err) {
    console.error(err.message);
    res.status(500).send("Server Error");
}
});


// @route DELETE api/posts/comment/:id/:comment_id
// @desc Deletes comments made on a post
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {const post = await Post.findById(req.params.id);
    
        //pulls out the comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        //Check that the comment exists
        if (!comment) {
            return res.status(404).json({msg: "Comment does not Exist"});
        }
        //check the user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "User is Unauthorized"});
        }
        //remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);
        await post.save();

        res.json({post, msg: "Comment deleted successfully"});
    } catch(err) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


module.exports = router;