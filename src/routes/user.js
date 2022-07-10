const express = require('express');
const { loginController, signupController } = require('../controllers/auth');
const validation = require('../middlewares/validation');
const userValidation = require('../utils/validations/userValidation');

const router = express.Router();

router.route('/signup').post(validation(userValidation.signup), signupController);
router.route('/login').post(validation(userValidation.login), loginController);

module.exports = router;
