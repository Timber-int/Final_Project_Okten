import React from 'react';
import { useSelector } from 'react-redux';

import { SelectedIngredient } from '../SelectedIngredient/SelectedIngredient';
import css from './SelectedProductIngredients.module.css';

const SelectedProductIngredients = ({id}) => {

    const {
        selectedProductIngredients,
        selectedProductIngredientsId
    } = useSelector(state => state['categoryReducer']);

    return (
        <div className={css.selected_product_ingredients_container}>
            {
                selectedProductIngredients && selectedProductIngredientsId && selectedProductIngredientsId.map(selectedId => <SelectedIngredient
                    key={selectedId} selectedIngredient={selectedProductIngredients[selectedId]} productId={id}
                />)
            }
        </div>
    );
};

export { SelectedProductIngredients };
