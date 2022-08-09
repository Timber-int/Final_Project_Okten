import React from 'react';
import { useDispatch } from 'react-redux';

import { minusOrderProduct, minusTotalOrderCount, plusOrderProduct, plusTotalOrderCount } from '../../store';
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

    const minusOrderProductFunc = async () => {
        try {
            await dispatch(minusOrderProduct({
                productDataId: {
                    totalCount,
                    id
                }
            }));
            await dispatch(minusTotalOrderCount({
                product: {
                    productId,
                    categoryId,
                    productPrice: productPrice / totalCount,
                    productName,
                    productIngredients,
                    totalCount
                }
            }));
        } catch (e) {
            if (e) {
                document.alert(e);
                return;
            }
        }
    };

    const plusOrderProductFunc = async () => {
        try {
            await dispatch(plusOrderProduct({
                productDataId: {
                    id,
                }
            }));
            await dispatch(plusTotalOrderCount({
                product: {
                    productId,
                    categoryId,
                    productPrice: productPrice / totalCount,
                    productName,
                    productIngredients,
                }
            }));
        } catch (e) {
            if (e) {
                document.alert(e);
                return;
            }
        }
    };

    return (
        <div className={css.order_counter}>
            <span className={css.nav_button}
                  onClick={() => minusOrderProductFunc()}>-</span>
            <span className={css.order_container}>
                <div className={css.product_order_box}>{totalCount}</div>
            </span>
            <span className={css.nav_button}
                  onClick={() => plusOrderProductFunc()}>+</span>
        </div>
    );
};

export { OrderComponentButtonOrderPage };
