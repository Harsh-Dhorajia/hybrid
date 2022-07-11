const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  products: [{
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
  }],
  buyerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  sellerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
  },
}, {
  version: false,
  timestamps: true,
});

module.exports = mongoose.model('Order', OrderSchema);
