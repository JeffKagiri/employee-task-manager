const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',  // Note: JWT_EXPIRES_IN from your .env
  });
};

module.exports = generateToken;