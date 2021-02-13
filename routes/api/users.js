const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require ('config');
const gravatar = require('gravatar');

// @route  GET api/users
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Users route'));

router.post('/', [
    check('email', 'Email is not valid.').isEmail(),
    check('first_name', 'First name is required.').not().isEmpty(),
    check('last_name', 'Last name is required.').not().isEmpty(),
    check('password', 'Password must be at least 6 characters.').isLength({min: 6}),
    check('username', 'Username must be between 3 and 16 characters').isLength({min: 3, max: 16})
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array})
    }

    const { email, first_name, last_name, username, password} = req.body;

    try{
        // Check if email has already been used
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({errors: [{msg: 'Account linked to this email already exists.'}]})
        }

        // Check if username already exists
        user = await User.findOne({ username })
        if(user){
            return res.status(400).json({errors: [{msg: 'Username already taken!'}]})
        }

        // Get user gravatar
        const avatar = gravatar.url(email, {
            s: '200', // Size
            r: 'pg', // Rating
            d: 'mm' // Default icon if no avatar
        })

        user = new User({
            avatar,
            email,
            first_name,
            last_name,
            username,
            password
        })
        
        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        // Save user to database
        await user.save()

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 }, // Options
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            });


    } catch(err){
        console.error(err.message)
        res.status(500).send('Server error.')
    }
})

module.exports = router;