import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { categoryAction } from '../../store';
import css from '../OrderComponentButton/OrderComponentButton.module.css';

const OrderComponentButton = ({
    id,
    totalCount
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
    }, [totalCount]);

    return (
        <div>
            <span className={css.nav_button}
                  onClick={() => dispatch(categoryAction.minusProductCount({
                      minusProduct: {
                          id,
                          totalCount,
                      }
                  }))}>-</span>
            <span>
                    <input type="number" onChange={event => dispatch(categoryAction.setProductCount({
                        setProduct: {
                            id,
                            count: event.target.value,
                            totalCount
                        }
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
