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

    if (!user || user.role !== 'SELLER') {
      return res.status(400).send({ message: 'You have not access to perform this operation' });
    }

    const isSellerExists = await UserModel.findById(req.params.seller_id);
    if (!isSellerExists) {
      return res.status(400).send({ message: 'Seller not found' });
    }

    const errors = [];
    let orderAmount = 0;
    for (const product of products) {
      const productInstance = await ProductModel.findById(product.productId);
      if (!productInstance || !product.quantity) {
        errors.push(productInstance);
        break;
      }
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
