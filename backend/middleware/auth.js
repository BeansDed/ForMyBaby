const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Public admin mode: treat everyone as authenticated admin
  if (process.env.PUBLIC_ADMIN === 'true') {
    req.admin = { isAdmin: true, publicAdmin: true };
    return next();
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not configured');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // Public admin mode: allow all
  if (process.env.PUBLIC_ADMIN === 'true') {
    return next();
  }
  if (!req.admin || !req.admin.isAdmin) {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };

