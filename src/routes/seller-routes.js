const express = require('express');
const { createCatalogsController } = require('../controllers/sellers');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/create-catalog').post(authenticate, createCatalogsController);

module.exports = router;
