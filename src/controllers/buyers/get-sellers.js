const UserModel = require('../../models/User');

const getSellers = async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const filter = {
      role: 'SELLER',
    };

    const sellerInstances = await UserModel.findAll(filter).limit(limit).skip(skip);
    const sellersCount = await UserModel.countDocuments(filter);

    const response = {
      data: sellerInstances,
      count: sellersCount,
    };

    return res.send(response);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

module.exports = getSellers;
