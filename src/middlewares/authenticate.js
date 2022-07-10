const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../models/User');
const { tokenSecretKey } = require('../config/config');

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  if (!token) {
    return res.status(400).send({
      message: 'Authentication error. Token required.',
    });
  }
  try {
    const data = jwt.verify(token, tokenSecretKey);
    if (!data) {
      return res.status(400).send({
        message: 'Invalid token',
      });
    }
    const userData = await User.findOne({
      _id: data.id,
    });
    if (!userData) {
      return res.status(400).send({
        message: 'User not found',
      });
    }
    req.user = _.pick(userData, ['username', '_id']);
    return next();
  } catch (error) {
    console.log('error', error);
    return res.send(error);
  }
};
module.exports = auth;
