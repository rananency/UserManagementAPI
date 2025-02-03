const express = require('express');
const { createUser, getUser, deleteUser } = require('../controllers/userController');
const validateRequest = require('../middlewares/validateUserRequest');

const router = express.Router();

router.post('/', validateRequest, createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
module.exports = router;
