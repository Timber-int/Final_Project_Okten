import React from 'react';
import { useDispatch } from 'react-redux';

import { categoryAction } from '../../store';
import css from '../OrderComponentButton/OrderComponentButton.module.css';

const OrderComponentButton = ({
    id,
    totalCount
}) => {

    const dispatch = useDispatch();

    return (
        <div>
            <span className={css.nav_button} onClick={() => dispatch(categoryAction.minusProductCount({ id }))}>-</span>
            <span>
                    <input type="number" onChange={event => dispatch(categoryAction.setProductCount({
                        id,
                        count: event.target.value
                    }))}
                           className={css.product_order_input}
                           value={`${totalCount}`}
                    />
                    </span>
            <span className={css.nav_button} onClick={() => dispatch(categoryAction.plusProductCount({ id }))}>+</span>
        </div>
    );
};

export { OrderComponentButton };
