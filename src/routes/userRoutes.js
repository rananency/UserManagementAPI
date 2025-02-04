const express = require('express');
const { createUser, getUser, deleteUser, updateUser, searchUsers } = require('../controllers/userController');
const validateRequest = require('../middlewares/validateUserRequest');

const router = express.Router();

router.post('/', validateRequest, createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', validateRequest, updateUser);
router.post('/search', searchUsers);

module.exports = router;
