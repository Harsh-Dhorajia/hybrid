const express = require('express');
const { createCatalogsController, getOrdersController } = require('../controllers/sellers');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/create-catalog').post(authenticate, createCatalogsController);
router.route('/orders').post(authenticate, getOrdersController);

module.exports = router;
