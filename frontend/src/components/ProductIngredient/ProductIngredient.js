import React from 'react';

import { baseURL } from '../../config';
import css from './ProductIngredient.module.css';
import { useDispatch } from 'react-redux';
import { productIngredientAction } from '../../store';

const ProductIngredient = ({ productIngredient }) => {

    const dispatch = useDispatch();

    const {
        id,
        productIngredientName,
        productPhoto,
        productPrice,
        productWeight,
        status,
    } = productIngredient;

    const choseIngredient = (ingredient) => {
        dispatch(productIngredientAction.setSelectedProductIngredients({ ingredient }));
    };
    const deleteChosenIngredient = (id) => {
        dispatch(productIngredientAction.deleteChosenSelectedIngredients({ id }));
    };

    return (
        <div className={status === true ? css.single_product_ingredient_active : css.single_product_ingredient}>
            {status === true ?
                <div className={css.product_ingredient_button_box}>
                    <div>
                        Added:
                    </div>
                    <div>
                        <button className={css.product_ingredient_delete_button} onClick={() => deleteChosenIngredient(id)}>X</button>
                    </div>
                </div> : <div className={css.not_activated}/>}
            <div className={css.product_ingredient_box}
                 onClick={() => choseIngredient(productIngredient)}>
                <div>
                    <img className={css.product_ingredient_image} src={baseURL + '/' + productPhoto} alt={productIngredientName}/>
                </div>
                <div>{productIngredientName}</div>
                <div className={css.product_ingredient_information}>
                    <div>{productWeight} g</div>
                    <div>{productPrice} UAH</div>
                </div>
            </div>
        </div>
    );
};

export { ProductIngredient };
