import React from 'react';

import css from './OrderComponentButtonOrderPage.module.css';
import { plusOrderProduct } from '../../store';
import { useDispatch } from 'react-redux';

const OrderComponentButtonOrderPage = ({
    totalCount,
    defaultPrice,
    id,
}) => {

    const dispatch = useDispatch();

    return (
        <div className={css.order_counter}>
            <span className={css.nav_button}>-</span>
            <span className={css.order_container}><input onChange={event => console.log(event)} type="number" className={css.product_order_input}
                                                         value={`${totalCount}`}/></span>
            <span className={css.nav_button} onClick={() => dispatch(plusOrderProduct({
                productData: {
                    defaultPrice,
                    id
                }
            }))}>+</span>
        </div>
    );
};

export { OrderComponentButtonOrderPage };
