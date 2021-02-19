const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const User = require('../../models/User');

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require ('config');

// @route  GET api/auth
// @desc   Get user by token
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        // 400 is Bad Request
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        // See if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
        }

        // See if passwords match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
        }

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
        
    } catch(err) { 
        console.error(err.message);
        // 500 is Server Error
        res.status(500).send('Server error');
    }
});

module.exports = router;