const express = require('express');
const { getCatalogsController, getSellersController, createOrder } = require('../controllers/buyers');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/get-sellers').get(authenticate, getSellersController);
router.route('/get-catalog').get(authenticate, getCatalogsController);
router.route('/create-order/:seller_id').post(authenticate, createOrder);

module.exports = router;
