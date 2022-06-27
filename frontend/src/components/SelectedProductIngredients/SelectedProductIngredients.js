import React from 'react';
import { useSelector } from 'react-redux';

import { SelectedIngredient } from '../SelectedIngredient/SelectedIngredient';
import css from './SelectedProductIngredients.module.css';

const SelectedProductIngredients = () => {

    const { selectedProductIngredients } = useSelector(state => state['productIngredientReducer']);

    return (
        <div className={css.selected_product_ingredients_container}>
            {
                selectedProductIngredients && selectedProductIngredients.map(selectedIngredient => <SelectedIngredient
                    key={selectedIngredient.id} selectedIngredient={selectedIngredient}/>)
            }
        </div>
    );
};

export { SelectedProductIngredients };
