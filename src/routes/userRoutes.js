import express from 'express';
import validateRequest from '../middlewares/validateUserRequest.js';
import { createUser, deleteUser, getUser, searchUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/', validateRequest, createUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', validateRequest, updateUser);
router.post('/search', searchUsers);

export default router;
