import React from 'react';

import { ProductIngredient } from '../ProductIngredient/ProductIngredient';
import css from './ProductIngredients.module.css';

const ProductIngredients = ({ productIngredients }) => {
    return (
        <div className={css.product_ingredients_container}>
            {
                productIngredients.map(productIngredient => <ProductIngredient key={productIngredient.id} productIngredient={productIngredient}/>)
            }
        </div>
    );
};

export { ProductIngredients };
