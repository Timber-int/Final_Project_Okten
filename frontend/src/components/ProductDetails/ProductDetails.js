import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductIngredients } from '../ProductIngredients/ProductIngredients';
import { OrderComponentButton } from '../OrderComponentButton/OrderComponentButton';
import { getAllProductIngredients, getProductInformationById } from '../../store';
import { baseURL } from '../../config';
import css from './ProductDetails.module.css';

const ProductDetails = () => {

    const { state } = useLocation();

    const dispatch = useDispatch();

    const { productDetails } = useSelector(state => state['productReducer']);

    const { selectedProductIngredients } = useSelector(state => state['productIngredientReducer']);

    const { productIngredients } = useSelector(state => state['productIngredientReducer']);

    // const {
    //     productFats,
    //     productCarbohydrates,
    //     productCalories,
    //     productProteins
    // } = productDetails;

    console.log(selectedProductIngredients)

    const {
        id,
        productPhoto,
        productName,
        description,
        productWeight,
        totalCount,
        productPrice,
    } = state;

    useEffect(() => {
        dispatch(getProductInformationById({ id }));
        dispatch(getAllProductIngredients());
    }, [id, productPrice]);

    return (
        <div>
            <div className={css.product_details_container}>
                <div className={css.image_box}>
                    <img src={baseURL + '/' + productPhoto} alt={productPhoto}/>
                </div>
                <div className={css.information_box}>
                    <div className={css.product_details_header}>
                        <div className={css.product_name}>{productName}</div>
                        <div className={css.product_description}>{description}</div>
                    </div>
                    <div className={css.product_information}>
                        <div className={css.product_information_box}>
                            <div> Size: 30cm</div>
                            <div> Weight: {productWeight}</div>
                        </div>
                        <div className={css.product_information_box}>
                            <div>fds</div>
                            <div>fds</div>
                        </div>
                    </div>
                    <div className={css.product_additional}>
                        <div>
                            <div>+ Add ingredients</div>
                            <div>Additional (+)</div>
                        </div>
                        <div>
                            <div>Amount: {totalCount}</div>
                            <div>Total: {productPrice} UAH</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={css.product_ingredients_container}>
                <div className={css.product_ingredients_title}>Extra ingredients for pizza</div>
                <ProductIngredients productIngredients={productIngredients}/>
            </div>

        </div>
    );
};

export { ProductDetails };
