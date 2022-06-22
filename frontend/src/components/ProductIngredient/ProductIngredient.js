import React from 'react';

import { baseURL } from '../../config';
import css from './ProductIngredient.module.css';

const ProductIngredient = ({ productIngredient }) => {

    const {
        productIngredientName,
        productPhoto,
        productPrice,
        productWeight
    } = productIngredient;
    console.log(productIngredient);
    return (
        <div className={css.product_ingredient_box}>
            <div><img className={css.product_ingredient_image} src={baseURL + '/' + productPhoto} alt={productIngredientName}/></div>
            <div>{productIngredientName}</div>
            <div className={css.product_ingredient_information}>
                <div>{productWeight} g</div>
                <div>{productPrice} UAH</div>
            </div>
        </div>
    );
};

export { ProductIngredient };
