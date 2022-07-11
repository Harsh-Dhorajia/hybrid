const ProductModel = require('../../models/Product');

const getCatalogItems = async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const filter = {
      createdBy: req.params.seller_id,
    };

    const productInstances = await ProductModel.find(filter)
      .limit(parseInt(limit, 10))
      .skip(parseInt(skip, 10));

    const productCount = await ProductModel.countDocuments(filter);

    const response = {
      data: productInstances,
      count: productCount,
    };
    return res.send(response);
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

module.exports = getCatalogItems;
