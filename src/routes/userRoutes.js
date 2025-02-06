import express from 'express';
import controller from '../controllers/userController.js';
import validateRequest from '../middlewares/validateUserRequest.js';

const router = express.Router();

router.post('/', validateRequest, controller.createUser);
router.get('/:id', controller.getUser);
router.delete('/:id', controller.deleteUser);
router.put('/:id', validateRequest, controller.updateUser);
router.post('/search', controller.searchUsers);

export default router;
