import React from 'react';
import { useDispatch } from 'react-redux';

import { productIngredientAction } from '../../store';
import css from './SelectedIngredient.module.css';

const SelectedIngredient = ({ selectedIngredient }) => {
    const {
        productIngredientName,
        id
    } = selectedIngredient;

    const dispatch = useDispatch();

    return (
        <div className={css.selected_ingredient_box}>
            <button className={css.selected_ingredient_button}
                    onClick={() => dispatch(productIngredientAction.deleteChosenSelectedIngredients({ id }))}>
                <div className={css.selected_ingredient_button_element}>
                    ❌
                </div>
                <div className={css.selected_ingredient_text}>
                    {productIngredientName}
                </div>
            </button>
        </div>
    );
};

export { SelectedIngredient };
