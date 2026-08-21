const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
});
router.post('/login', async (req, res, next) => {
  try {
    const { identifier, password } = req.body; // one field for username OR email
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
