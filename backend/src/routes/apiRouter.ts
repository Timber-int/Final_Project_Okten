import { Router } from 'express';

import { STATUS } from '../errorCode';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { categoryRouter } from './categoryRouter';
import { productRouter } from './productRouter';
import { productInformationRoute } from './productInformationRoute';
import { productIngredientRouter } from './productIngredientRouter';
import { cityRouter } from './cityRouter';
import { cityAddressRouter } from './cityAddressRouter';
import { userOrderRouter } from './userOrderRouter';
import { totalOrderCountRouter } from './totalOrderCountRouter';
import { partnersRequestRouter } from './partnersRequestRouter';
import { customerOrderRouter } from './customerOrderRouter';
import { customerOrderSelfPickupRouter } from './customerOrderSelfPickupRouter';
import { customerProductsForOrderRouter } from './customerProductsForOrderRouter';
import { customerProductsForSelfPickupRouter } from './customerProductsForSelfPickupRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/orders', userOrderRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);
router.use('/productIngredients', productIngredientRouter);
router.use('/auth', authRouter);
router.use('/productInformation', productInformationRoute);
router.use('/cities', cityRouter);
router.use('/cityAddress', cityAddressRouter);
router.use('/totalCounts', totalOrderCountRouter);
router.use('/partnerRequests', partnersRequestRouter);
router.use('/customerOrders', customerOrderRouter);
router.use('/customerOrderSelfPickup', customerOrderSelfPickupRouter);
router.use('/customerProductsForOrder', customerProductsForOrderRouter);
router.use('/customerProductsForSelfPickup', customerProductsForSelfPickupRouter);

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
