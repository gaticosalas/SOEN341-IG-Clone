const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
// const { check, validationResult } = require('express-validator');

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', 
        ['first_name', 'last_name', 'username', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/profile/
// @desc   Create or update user profile
// @access Private
router.post('/', auth, async (req, res) => {

    const { bio } = req.body;

    // Build profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    if (bio) profileFields.bio = bio;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        
        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields }, 
                { new: true }
            );

            return res.json(profile)
        }

        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
;});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['first_name', 'last_name', 'username', 'avatar']);
        if (!profile) return res.status(400).json({ msg: 'Profile not found' })
        res.json(profile);
    } catch(err) {
        console.error(err.message);

        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send('Server Error')
    }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', auth, async (req, res) => {
    try {
      // Remove user posts
      // Remove profile
      // Remove user
      await Promise.all([
        Post.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id })
      ]);
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// @route  PUT api/profile/follow/:user_id
// @desc   Add user to you follows list and add yourself to their folledBy list
// @access Private
router.put('/follow/:user_id', auth, async (req, res) => {
    try {
        const myProfile = await Profile.findOne({ user: req.user.id });
        const theirProfile = await Profile.findById(req.params.user_id);

        const myUser = await User
            .findById(req.user.id)
            .select('-password');
        const theirUser = await User
            .findbyId(req.params.user_id)
            .select('-password');

        const myself = {
            user: req.user.id,
            name: myUser.name,
            avatar: myUser.avatar,
        }
        const them = {
            user: req.params.user_id,
            name: theirUser.name,
            avatar: theirUser.avatar,
        }
        // unshift() is like push but it adds to the beginning
        myProfile.follows.unshift(them);
        theirProfile.followedBy.unshift(myself);
        
        await myProfile.save();
        await theirProfile.save();

        res.json(myProfile);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/profile/follow/:user_id
// @desc   Delete user from your follows list and delete yourself from their followedBy list
// @access Private
router.delete('/follow/:user_id', auth, async (req, res) => {
    try {
        const myProfile = await Profile.findOne({ user: req.user.id });
        const theirProfile = await Profile.findById(req.params.user_id);

        // Getting the index of the follow to remove
        const removeFollowIndex = myProfile.follows.map(item => item.user).indexOf(req.params.user_id);
        if (removeFollowIndex === -1) return res.status(400).json({ msg: 'follow does not exist' });
        myProfile.follows.splice(removeFollowIndex, 1);
        await myProfile.save();

        // Getting the index of the followedBy to remove
        const removeFollowedByIndex = theirProfile.followedBy.map(item => item.user).indexOf(req.user.id);
        if (removeFollowedByIndex === -1) return res.status(400).json({ msg: 'followedBy does not exist' });
        theirProfile.followedBy.splice(removeFollowedByIndex, 1);
        await theirProfile.save();

        res.json({ profile });
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;