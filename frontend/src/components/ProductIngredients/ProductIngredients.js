import React from 'react';
import { ProductIngredient } from '../ProductIngredient/ProductIngredient';

const ProductIngredients = ({ productIngredients }) => {
    return (
        <>
            {
                productIngredients.map(productIngredient => <ProductIngredient key={productIngredient.id} productIngredient={productIngredient}/>)
            }
        </>
    );
};

export { ProductIngredients };
