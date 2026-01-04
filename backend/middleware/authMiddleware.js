const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (exclude password)
      req.user = await User.findById(decoded.id).select('-password');

      // Check if user exists
      if (!req.user) {
        res.status(401);
        return next(new Error('User not found'));
      }

      // Continue to next middleware/route handler
      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      res.status(401);
      return next(new Error('Not authorized, token failed'));
    }
  }

  // No token found
  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, no token'));
  }
});

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user is authenticated (req.user should be set by protect middleware)
    if (!req.user) {
      res.status(401);
      return next(new Error('Not authenticated. Please log in.'));
    }

    // Check if user has required role
    if (!roles.includes(req.user.role)) {
      res.status(403);
      return next(
        new Error(
          `User role '${req.user.role}' is not authorized to access this route. Required roles: ${roles.join(', ')}`
        )
      );
    }

    // User has required role, continue
    next();
  };
};

// Optional: Admin-only shortcut
const adminOnly = authorize('admin');

// Optional: Combined protect and authorize for common use cases
const protectAndAuthorize = (...roles) => {
  return [
    protect,
    authorize(...roles)
  ];
};

module.exports = {
  protect,
  authorize,
  adminOnly, // Optional export
  protectAndAuthorize // Optional export
};