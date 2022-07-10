const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  catalogId: {
    type: mongoose.Types.ObjectId,
    ref: 'Catalog',
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
}, {
  version: false,
  timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema);
