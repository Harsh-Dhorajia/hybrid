const express = require('express');
const {
  getCatalogsController, getSellersController, createOrderController, getOrdersController,
} = require('../controllers/buyers');
const authenticate = require('../middlewares/authenticate');
const validation = require('../middlewares/validation');
const buyerValidation = require('../utils/validations/buyerValidation');

const router = express.Router();

router.route('/get-sellers').get(authenticate, getSellersController);
router.route('/get-catalog/:seller_id').get(authenticate, getCatalogsController);
router.route('/create-order/:seller_id').post(validation(buyerValidation.createOrder), authenticate, createOrderController);
router.route('/orders').get(authenticate, getOrdersController);

module.exports = router;
