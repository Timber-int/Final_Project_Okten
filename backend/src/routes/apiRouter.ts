import { Router } from 'express';

import { STATUS } from '../errorCode';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { categoryRouter } from './categoryRouter';
import { productRouter } from './productRouter';
import { productInformationRoute } from './productInformationRoute';
import { productIngredientRouter } from './productIngredientRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/productIngredients', productIngredientRouter);
router.use('/auth', authRouter);
router.use('/productInformation', productInformationRoute);

// @ts-ignore
router.use('*', (err, req, res, next) => {
    res
        .status(err.status || STATUS.CODE_500)
        .json({
            message: err.message,
            data: err.data,
        });
});

export const apiRouter = router;
