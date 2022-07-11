/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
const {
  UserModel,
  OrderModel,
  ProductModel,
} = require('../../models');

const createOrderController = async (req, res) => {
  try {
    const { user, body } = req;
    const { products } = body;

    // Check if user is buyer or not
    if (!user || user.role !== 'BUYER') {
      return res.status(400).send({ message: 'You have not access to perform this operation' });
    }

    // check if seller id is provided or not
    if (!req.params.seller_id) {
      return res.status(400).send({ message: 'SellerId is required' });
    }

    // check if seller is exist or not
    const isSellerExists = await UserModel.findById(req.params.seller_id);
    if (!isSellerExists || isSellerExists.role !== 'SELLER') {
      return res.status(400).send({ message: 'Seller not found' });
    }

    const errors = [];
    let orderAmount = 0;
    for (const product of products) {
      // check if given productId is exist or not
      const productInstance = await ProductModel.findById(product.productId);
      if (!productInstance || !product.quantity) {
        errors.push(productInstance);
        break;
      }

      // calculate order amount
      orderAmount += product.quantity * productInstance.price;
    }

    if (errors.length) {
      return res.status(400).send({ message: 'Given Product is not valid' });
    }

    const dataToCreate = {
      amount: orderAmount,
      products,
      buyerId: user._id,
      sellerId: req.params.seller_id,
    };

    // Create order instance
    const orderInstance = await OrderModel.create(dataToCreate);
    const response = {
      message: 'Catalog created successfully',
      data: orderInstance,
    };

    return res.send(response);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

module.exports = createOrderController;
