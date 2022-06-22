import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ProductIngredients } from '../ProductIngredients/ProductIngredients';
import { getAllProductIngredients, getProductInformationById } from '../../store';
import { baseURL } from '../../config';
import css from './ProductDetails.module.css';

const ProductDetails = () => {

    const { state } = useLocation();

    const dispatch = useDispatch();

    const { productDetails } = useSelector(state => state['productReducer']);

    const { productIngredients } = useSelector(state => state['productIngredientReducer']);

    // const {
    //     productFats,
    //     productCarbohydrates,
    //     productCalories,
    //     productProteins
    // } = productDetails;

    const {
        id,
        productPhoto,
        productName,
        description,
        productWeight,
    } = state;

    useEffect(() => {
        dispatch(getProductInformationById({ id }));
        dispatch(getAllProductIngredients());
    }, [id]);

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
                            <div>Amount: -(0)+</div>
                            <div>Total: 213 UAH</div>
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
