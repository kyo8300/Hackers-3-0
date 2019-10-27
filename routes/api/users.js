const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { forwardAuthenticated } = require('../../config/auth');

const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route  GET users
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('User route'));

// @route  POST users/register
// @desc   Register user
// @access Public
router.post(
  '/register',
  [
    forwardAuthenticated,
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route  GET users/login
// @desc   Logout user
// @access private
router.post('/login', forwardAuthenticated, async (req, res, next) => {
  try {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route  GET users/logout
// @desc   Logout user
// @access private
router.get('/logout', async (req, res) => {
  try {
    req.logout();
    res.redirect('/');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
