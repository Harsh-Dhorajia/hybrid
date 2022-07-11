/* eslint-disable no-underscore-dangle */
const OrderModel = require('../../models/Order');

const getOrdersController = async (req, res) => {
  try {
    const { user } = req;
    const { skip = 0, limit = 10 } = req.query;

    // check if user is buyer or not
    if (!user || user.role !== 'BUYER') {
      return res.status(400).send({ message: 'You have not access to perform this operation' });
    }
    const filter = {
      buyerId: user._id,
    };

    // get orders of buyers
    const orderInstances = await OrderModel
      .find(filter)
      .limit(parseInt(limit, 10))
      .skip(parseInt(skip, 10));

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
