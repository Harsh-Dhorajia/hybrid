const express = require('express');
const { createCatalogsController, getOrdersController } = require('../controllers/sellers');
const authenticate = require('../middlewares/authenticate');
const validation = require('../middlewares/validation');
const sellerValidation = require('../utils/validations/sellerValidation');

const router = express.Router();

router.route('/create-catalog').post(authenticate, validation(sellerValidation.createCatalog), createCatalogsController);
router.route('/orders').get(authenticate, getOrdersController);

module.exports = router;
