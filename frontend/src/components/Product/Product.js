import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { OrderComponentButton } from '../OrderComponentButton/OrderComponentButton';
import { baseURL } from '../../config';
import css from './Product.module.css';
import { orderAction } from '../../store';

const Product = ({ product }) => {

    const dispatch = useDispatch();

    const {
        productName,
        productPhoto,
        productBigPhoto,
        productPrice,
        productWeight,
        description,
        id,
        categoryId,
        totalCount,
    } = product;

    const createOrder = (productPrice, product, id) => {
        dispatch(orderAction.setTotalOrderCount({
            productData: {
                productPrice,
                product,
                id,
            }
        }));
    };

    return (
        <div className={css.product_box}>
            <div className={css.product_box_header}>
                <NavLink to={'/' + id} state={product} className={css.product_box_header_first_content}>
                    <div className={css.images_container}>
                        <img className={css.product_photo_one} src={baseURL + '/' + productPhoto} alt={productName}/>
                        <img className={css.product_photo_two} src={baseURL + '/' + productBigPhoto} alt={productName}/>
                    </div>
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
                    <button className={css.product_order_button} onClick={() => createOrder(productPrice, product, id)}>Замовити</button>
                </div>
            </div>
        </div>
    );
};

export { Product };
