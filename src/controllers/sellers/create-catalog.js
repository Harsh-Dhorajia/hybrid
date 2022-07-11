/* eslint-disable no-underscore-dangle */
const CatalogModel = require('../../models/Catalog');
const ProductModel = require('../../models/Product');

const createCatalog = async (req, res) => {
  try {
    const { user, body } = req;
    const { name, products } = body;

    // validate if user is seller or not
    if (!user || user.role !== 'SELLER') {
      return res.status(400).send({ message: 'You have not access to perform this operation' });
    }

    // validate catalog is exist or not
    const isCatalogExists = await CatalogModel.findOne({ createdBy: user._id });
    if (isCatalogExists) {
      return res.send({ message: 'Catalog already exists' });
    }

    // create catalog for seller
    const catalogInstance = await CatalogModel.create({
      name,
      createdBy: user._id,
    });

    products.map(product => {
      product.catalogId = catalogInstance._id;
      product.createdBy = user._id;
      return product;
    });

    // create products with name and price
    const productInstances = await ProductModel.insertMany(products);
    const response = {
      message: 'Catalog created successfully',
      data: {
        catalog: catalogInstance,
        products: productInstances,
      },
    };

    return res.send(response);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

module.exports = createCatalog;
