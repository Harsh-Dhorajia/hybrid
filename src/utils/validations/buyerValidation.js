const Joi = require('joi');

const schemas = {
  createOrder: Joi.object().keys({
    products: Joi.array().items({
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
    }).required(),
  }),
};

module.exports = schemas;
