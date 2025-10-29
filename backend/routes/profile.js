const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { findUserById, findUserByEmail, updateUser } = require('../models/User');

const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  const user = findUserById(req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  });
});

router.put('/profile', authenticateToken, (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const existingUser = findUserByEmail(email);
  if (existingUser && existingUser.id !== req.user.userId) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const updatedUser = updateUser(req.user.userId, { name, email });
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    message: 'Profile updated successfully',
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email
    }
  });
});

module.exports = router;