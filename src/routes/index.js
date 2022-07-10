const express = require('express');
const userRoutes = require('./user');

const router = express.Router();

router.use('/api/auth', userRoutes);

module.exports = router;
