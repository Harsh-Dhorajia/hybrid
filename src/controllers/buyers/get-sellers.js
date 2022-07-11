const UserModel = require('../../models/User');

const getSellers = async (req, res) => {
  try {
    const { skip = 0, limit = 1 } = req.query;
    const filter = {
      role: 'SELLER',
    };

    const sellerInstances = await UserModel
      .find(filter)
      .limit(parseInt(limit, 10))
      .skip(parseInt(skip, 10))
      .select(['_id', 'username', 'role']);

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
