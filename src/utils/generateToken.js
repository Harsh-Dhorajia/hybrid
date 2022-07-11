const jwt = require('jsonwebtoken');
const { tokenSecretKey, tokenExpiryTime } = require('../config/config');

const generateToken = user => {
  const { id } = user;
  return jwt.sign(
    {
      id,
    },
    tokenSecretKey,
    {
      expiresIn: tokenExpiryTime,
    },
  );
};
module.exports = generateToken;
