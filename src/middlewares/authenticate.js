const jwt = require('jsonwebtoken');
const _ = require('lodash');
const UserModel = require('../models/User');
const { tokenSecretKey } = require('../config/config');

const auth = async (req, res, next) => {
  // check is authorization is given or not
  if (!req.headers.authorization || !req.headers.authorization.split('Bearer ')[1]) {
    return res.status(400).send({
      message: 'Authentication error. Token required.',
    });
  }

  // extract token from header
  const token = req.headers.authorization.split('Bearer ')[1];
  try {
    // verify token with given secretkey
    const data = jwt.verify(token, tokenSecretKey);
    if (!data) {
      return res.status(400).send({
        message: 'Invalid token',
      });
    }

    // check if user is exist
    const userData = await UserModel.findOne({
      _id: data.id,
    });
    if (!userData) {
      return res.status(400).send({
        message: 'User not found',
      });
    }

    // assign user to req object
    req.user = _.pick(userData, ['_id', 'role', 'username']);
    return next();
  } catch (error) {
    console.log('error', error);
    return res.send(error);
  }
};

module.exports = auth;
