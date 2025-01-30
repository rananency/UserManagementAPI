const express = require('express');
const { createUser } = require('../controllers/userController');
const validateRequest = require('../middlewares/validateUserRequest');

const router = express.Router();

router.post('/', validateRequest, createUser);

module.exports = router;
