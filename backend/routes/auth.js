const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const { asyncHandler } = require('../middleware/errorHandler');

// Admin Login
router.post('/admin/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  const admin = await Admin.findOne({ where: { username } });
  
  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const isValid = await admin.comparePassword(password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  await admin.update({ lastLogin: new Date() });
  
  const token = jwt.sign(
    { id: admin.id, username: admin.username, isAdmin: true },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '24h' }
  );
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  });
  
  res.json({
    success: true,
    message: 'Login successful',
    admin: {
      username: admin.username,
      lastLogin: admin.lastLogin,
    },
    token,
  });
}));

// Admin Logout
router.post('/admin/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Check auth status
router.get('/admin/check', asyncHandler(async (req, res) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const admin = await Admin.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!admin) {
      return res.status(401).json({ authenticated: false });
    }
    
    res.json({
      authenticated: true,
      admin: {
        username: admin.username,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }
}));

module.exports = router;
