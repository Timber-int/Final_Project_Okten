import React, { useEffect } from 'react';

import { ProductIngredient } from '../ProductIngredient/ProductIngredient';
import css from './ProductIngredients.module.css';
import { useDispatch } from 'react-redux';
import { getAllProductIngredients } from '../../store';

const ProductIngredients = ({
    id,
    categoryId,
    productIngredients
}) => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllProductIngredients());
    }, [categoryId]);

    return (
        <div className={css.product_ingredients_container}>
            {
                productIngredients.map(productIngredient => <ProductIngredient key={productIngredient.id} productIngredient={productIngredient}
                                                                               productId={id}/>)
            }
        </div>
    );
};

export { ProductIngredients };
