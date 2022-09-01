import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { minusOrderProduct, minusTotalOrderCount, plusOrderProduct, plusTotalOrderCount } from '../../store';
import css from './OrderComponentButtonOrderPage.module.css';
import { CONSTANTS } from '../../constants';

const OrderComponentButtonOrderPage = ({
    orderData,
}) => {

    const {
        totalCount,
        id,
        categoryId,
        productId,
        productIngredients,
        productPrice,
        productName,
    } = orderData;

    const dispatch = useDispatch();

    const { status } = useSelector(state => state['orderReducer']);

    const minusOrderProductFunc = () => {
        dispatch(minusOrderProduct({
            productDataId: {
                id,
            },
            productData: {
                productId,
                categoryId,
                productPrice,
                totalCount,
                productName,
                productIngredients,
            }
        }));
    };

    const plusOrderProductFunc = () => {
        dispatch(plusOrderProduct({
            productDataId: {
                id,
            },
            productData: {
                productId,
                categoryId,
                productPrice,
                totalCount,
                productName,
                productIngredients,
            }
        }));
    };

    return (
        <div className={css.order_counter}>
            <span className={
                status === CONSTANTS.LOADING
                ||
                status === CONSTANTS.REJECTED
                    ? css.nav_button_disabled
                    : css.nav_button}
                  onClick={() => minusOrderProductFunc()}>-</span>
            <span className={css.order_container}>
                <div className={css.product_order_box}>{totalCount}</div>
            </span>
            <span className={
                status === CONSTANTS.LOADING
                ||
                status === CONSTANTS.REJECTED
                    ? css.nav_button_disabled
                    : css.nav_button}
                  onClick={() => plusOrderProductFunc()}>+</span>
        </div>
    );
};

export { OrderComponentButtonOrderPage };
