import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { OrderComponentButton } from '../OrderComponentButton/OrderComponentButton';
import { ProductInformation } from '../ProductInformation/ProductInformation';
import { baseURL } from '../../config';
import { getProductInformationById, orderAction } from '../../store';
import { DEFAULT_CATEGORY_NAME } from '../../constants';
import css from './Product.module.css';

const Product = ({ product }) => {

    const dispatch = useDispatch();

    const { category } = useSelector(state => state['categoryReducer']);

    const { productDetails } = useSelector(state => state['productReducer']);

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

    useEffect(() => {
        dispatch(getProductInformationById({ id }));
    }, [id]);

    return (
        <div className={css.product_box}>
            <div className={css.product_box_header}>
                {
                    category
                    &&
                    category.name.toLowerCase() === DEFAULT_CATEGORY_NAME.DRINKS.toLowerCase()
                    ||
                    category.name.toLowerCase() === DEFAULT_CATEGORY_NAME.DESERTS.toLowerCase()
                        ?
                        <div className={css.product_box_header_first_content}>
                            {
                                productBigPhoto
                                    ?
                                    <div className={css.images_container}>
                                        <img className={css.product_photo_one} src={baseURL + '/' + productPhoto} alt={productName}/>
                                        <img className={css.product_photo_two} src={baseURL + '/' + productBigPhoto} alt={productName}/>
                                    </div>
                                    :
                                    <div className={css.images_container_static}>
                                        <img className={css.product_photo_static} src={baseURL + '/' + productPhoto} alt={productName}/>
                                    </div>
                            }
                            <div className={css.product_name}>{productName}</div>
                        </div>
                        :
                        <NavLink to={'/productId/' + id} state={product} className={css.product_box_header_first_content}>
                            {
                                productBigPhoto
                                    ?
                                    <div className={css.images_container}>
                                        <img className={css.product_photo_one} src={baseURL + '/' + productPhoto} alt={productName}/>
                                        <img className={css.product_photo_two} src={baseURL + '/' + productBigPhoto} alt={productName}/>
                                    </div>
                                    :
                                    <div className={css.images_container_static}>
                                        <img className={css.product_photo_static} src={baseURL + '/' + productPhoto} alt={productName}/>
                                    </div>
                            }
                            <div className={css.product_name}>{productName}</div>
                        </NavLink>
                }
                {
                    category.name.toLowerCase() === DEFAULT_CATEGORY_NAME.DRINKS.toLowerCase()
                        ?
                        <></>
                        :
                        <div className={css.product_small_information}>
                            <div className={css.product_small_information_content}>
                                <span className={css.product_weight}>{productWeight}</span>
                                <span className={css.measure}>гр</span>
                            </div>
                            {
                                category && category.name.toLocaleLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLocaleLowerCase()
                                    ?
                                    <div className={css.product_small_information_content}>
                                        <span className={css.product_size}>30</span>
                                        <span className={css.measure}>см</span>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                }
            </div>
            {
                category.name.toLowerCase() === DEFAULT_CATEGORY_NAME.DRINKS.toLowerCase()
                    ?
                    <></>
                    :
                    <div className={css.product_box_content_description}>
                        {description}
                    </div>
            }
            {
                category && productDetails && category.name.toLocaleLowerCase() === DEFAULT_CATEGORY_NAME.DESERTS.toLowerCase()
                    ?
                    <div className={css.product_information_container}>
                        <ProductInformation productDetails={productDetails}/>
                    </div>
                    :
                    <></>
            }
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
