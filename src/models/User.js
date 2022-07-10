const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['BUYER', 'SELLER'],
    default: 'BUYER',
  },
  resetPasswordToken: String,
  resetPasswordExpires: String,
}, {
  version: false,
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
