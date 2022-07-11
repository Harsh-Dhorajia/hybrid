const Joi = require('joi');

const schemas = {
  createCatalog: Joi.object().keys({
    name: Joi.string().required(),
    products: Joi.array().items({
      name: Joi.string().required(),
      price: Joi.number().required(),
    }).required(),
  }),
};

module.exports = schemas;
