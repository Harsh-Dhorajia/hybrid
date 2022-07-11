const mongoose = require('mongoose');

const CatalogSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
}, {
  version: false,
  timestamps: true,
});

module.exports = mongoose.model('Catalog', CatalogSchema);
