import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { baseURL } from '../../config';
import { productAction } from '../../store';
import css from './Product.module.css';

const Product = ({ product }) => {

    const dispatch = useDispatch();

    const {
        productName,
        productPhoto,
        productPrice,
        productWeight,
        description,
        id,
        categoryId,
        totalCount,
    } = product;

    return (
        <div className={css.product_box}>
            <div className={css.product_main}>
                <div className={css.product_header}>
                    <NavLink to={'/' + id} state={product}>
                        <img className={css.product_photo} src={baseURL + '/' + productPhoto} alt={productPhoto}/>
                        <div className={css.product_header_details}>
                            <div><span className={css.product_weight}>{productWeight}</span> g</div>
                            <div>30 cm</div>
                        </div>
                    </NavLink>
                </div>
                <div className={css.product_name}> {productName}</div>
            </div>
            <div className={css.product_description}>{description}</div>
            <div className={css.product_separator}>
                <hr/>
            </div>
            <div className={css.product_footer}>
                <div><span className={css.product_price}>{productPrice}</span> UAH</div>
                <div>
                    <span  className={css.nav_button} onClick={() => dispatch(productAction.minusProductCount({ id }))}>-</span>
                    <span>
                    <input  type="number" onChange={event => dispatch(productAction.setProductCount({
                        id,
                        count: event.target.value
                    }))}
                           className={css.product_order_input}
                           value={`${totalCount}`}
                    />
                    </span>
                    <span  className={css.nav_button} onClick={() => dispatch(productAction.plusProductCount({ id }))}>+</span>
                </div>
                <div>
                    <button className={css.product_button}>Order</button>
                </div>
            </div>
        </div>
    );
};

export { Product };
