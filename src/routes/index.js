const express = require('express');
const userRoutes = require('./user-routes');
const sellerRoutes = require('./seller-routes');
const buyerRoutes = require('./buyer-routes');

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/seller', sellerRoutes);
router.use('/buyer', buyerRoutes);

module.exports = router;
