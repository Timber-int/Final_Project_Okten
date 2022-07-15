import React from 'react';

import { SelectedIngredient } from '../SelectedIngredient/SelectedIngredient';
import css from './SelectedProductIngredients.module.css';

const SelectedProductIngredients = ({
    id,
    selectedProductIngredients,
    selectedProductIngredientsId
}) => {

    return (
        <div className={css.selected_product_ingredients_container}>
            {
                selectedProductIngredients
                && selectedProductIngredientsId.length > 0
                && selectedProductIngredientsId.map(selectedId =>
                    <SelectedIngredient
                        key={selectedId}
                        selectedIngredient={selectedProductIngredients[selectedId]}
                        productId={id}
                    />
                )
            }
        </div>
    );
};

export { SelectedProductIngredients };
