const express = require('express');
const { getCatalogsController, getSellersController } = require('../controllers/buyers');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/get-sellers').get(authenticate, getSellersController);
router.route('/get-catalog').get(authenticate, getCatalogsController);

module.exports = router;
