/* eslint-disable no-underscore-dangle */
const OrderModel = require('../../models/Order');

const getOrdersController = async (req, res) => {
  try {
    const { user } = req;
    const { skip = 0, limit = 10 } = req.query;

    // validate if user is seller or not
    if (!user || user.role !== 'SELLER') {
      return res.status(400).send({ message: 'You have not access to perform this operation' });
    }
    const filter = {
      sellerId: user._id,
    };

    const orderInstances = await OrderModel.find(filter).limit(limit).skip(skip);
    const ordersCount = await OrderModel.countDocuments(filter);

    const response = {
      data: orderInstances,
      count: ordersCount,
    };

    return res.send(response);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

module.exports = getOrdersController;
