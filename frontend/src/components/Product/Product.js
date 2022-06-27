import React from 'react';
import { NavLink } from 'react-router-dom';

import { OrderComponentButton } from '../OrderComponentButton/OrderComponentButton';
import { baseURL } from '../../config';
import css from './Product.module.css';

const Product = ({ product }) => {

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
            <div className={css.product_box_header}>
                <NavLink to={'/' + id} state={product} className={css.product_box_header_first_content}>
                    <div><img className={css.product_photo} src={baseURL + '/' + productPhoto} alt={productName}/></div>
                    <div className={css.product_name}>{productName}</div>
                </NavLink>
                <div className={css.product_small_information}>
                    <div className={css.product_small_information_content}>
                        <span className={css.product_weight}>
                            {productWeight}
                        </span>
                        <span className={css.measure}>
                            гр
                        </span>
                    </div>
                    <div className={css.product_small_information_content}>
                          <span className={css.product_size}>
                            30
                        </span>
                        <span className={css.measure}>
                            см
                        </span>
                    </div>
                </div>
            </div>
            <div className={css.product_box_content_description}>
                {description}
            </div>
            <div className={css.product_box_separator}>
                <hr/>
            </div>
            <div className={css.product_box_order_content_container}>
                <div className={css.product_price_box}>
                    <span className={css.product_price}>{productPrice}</span>
                    <span className={css.product_price_measure}>грн</span>
                </div>
                <div><OrderComponentButton id={id} totalCount={totalCount}/></div>
                <div>
                    <button className={css.product_order_button}>Order</button>
                </div>
            </div>
        </div>
    );
};

export { Product };
