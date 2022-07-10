const Joi = require('joi');

const schemas = {
  signup: Joi.object().keys({
    username: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    role: Joi.string().required().valid('BUYER', 'SELLER'),
  }),

  login: Joi.object().keys({
    username: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
};
module.exports = schemas;
