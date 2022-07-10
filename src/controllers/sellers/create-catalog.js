/* eslint-disable no-underscore-dangle */
const CatalogModel = require('../../models/Catalog');
const ProductModel = require('../../models/Product');

const createCatalog = async (req, res) => {
  try {
    const { user, body } = req;
    const { name, products } = body;

    if (!user || user.role !== 'SELLER') {
      return res.status(400).send({ message: 'You have not access to perform this operation' });
    }

    const isCatalogExists = await CatalogModel.findOne({ createdBy: user._id });
    if (isCatalogExists) {
      return res.send({ message: 'Catalog already exists' });
    }

    const catalogInstance = await CatalogModel.create({
      name,
      createdBy: user._id,
    });

    products.map(product => {
      product.catalogId = catalogInstance._id;
      product.createdBy = user._id;
      return product;
    });

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
