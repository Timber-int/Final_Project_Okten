import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { orderAction } from '../../store';
import { CONSTANTS } from '../../constants';
import css from './OrderComponentButtonOrderPage.module.css';

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
        dispatch(orderAction.minusOrderSingleProduct({
            productData: {
                id,
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
        dispatch(orderAction.plusOrderSingleProduct({
            productData: {
                id,
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
