import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { baseURL } from '../../config';
import css from './Product.module.css';

const Product = ({ product }) => {

    const dispatch = useDispatch();

    const {
        productDetails,
        productFile
    } = useSelector(state => state['productReducer']);

    const {
        productName,
        productPhoto,
        productPrice,
        productWeight,
        description,
        id,
        categoryId
    } = product;

    return (
        <div className={css.product_box}>
            <div className={css.product_main}>
                <div className={css.product_header}>
                    <NavLink to={'/id'} state={product}>
                        <img className={css.product_photo} src={baseURL + '/' + productPhoto} alt={productPhoto}/>
                        <div className={css.product_header_details}>
                            <div>{productWeight} g</div>
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
                <div>{productPrice} UAH</div>
                <div>-[1]+</div>
                <div>
                    <button>Order</button>
                </div>
            </div>
        </div>
    );
};

export { Product };
