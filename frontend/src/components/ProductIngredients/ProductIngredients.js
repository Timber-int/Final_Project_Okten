import React from 'react';

import { ProductIngredient } from '../ProductIngredient/ProductIngredient';
import css from './ProductIngredients.module.css';

const ProductIngredients = ({
    id,
    categoryId,
    productIngredients
}) => {

    return (
        <div className={css.product_ingredients_container}>
            {
                [...productIngredients]
                    .filter(productIngredient => productIngredient.categoryId === categoryId)
                    .map(productIngredient =>
                        <ProductIngredient key={productIngredient.id}
                                           productIngredient={productIngredient}
                                           productId={id}
                        />
                    )
            }
        </div>
    );
};

export { ProductIngredients };
