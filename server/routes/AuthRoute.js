// Auth Routes — handles user signup and login

const express = require('express');
const jwt = require('jsonwebtoken'); // Used to create login tokens
const User = require('../models/User');
const router = express.Router();

// SIGNUP — create a new user account
router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body; // Get user data from the request

    // Create the user in the database (password gets hashed automatically by the User model)
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err); // Pass error to the global error handler
  }
});

// LOGIN — check credentials and return a token
router.post('/login', async (req, res, next) => {
  try {
    const { identifier, password } = req.body; // "identifier" can be email OR username

    // Find the user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    // If user not found or password is wrong, send error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token that expires in 1 hour
    // The token contains user's id, email, and username
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: '1h' }
    );

    // Send the token back to the frontend
    res.json({ token });
  } catch (err) {
    next(err); // Pass error to the global error handler
  }
});

module.exports = router;
