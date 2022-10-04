import { Router } from 'express';
import { userController } from '../controller';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

export const userRouter = router;
