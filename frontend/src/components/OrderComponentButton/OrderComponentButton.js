import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { categoryAction, productAction } from '../../store';
import css from '../OrderComponentButton/OrderComponentButton.module.css';

const OrderComponentButton = ({
    id,
    totalCount
}) => {
    const dispatch = useDispatch();

    return (
        <div>
            <span className={css.nav_button}
                  onClick={() => dispatch(productAction.minusProductCount({
                      minusProduct: {
                          id,
                          totalCount,
                      }
                  }))}
            >
                -
            </span>
            <span>
                    <input type="number" onChange={event => dispatch(productAction.setProductCount({
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
            <span className={css.nav_button} onClick={() => dispatch(productAction.plusProductCount({ id }))}>+</span>
        </div>
    );
};

export { OrderComponentButton };
