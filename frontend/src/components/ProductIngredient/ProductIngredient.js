import React from 'react';
import { useDispatch } from 'react-redux';

import { baseURL } from '../../config';
import { productAction } from '../../store';
import css from './ProductIngredient.module.css';

const ProductIngredient = ({
    productIngredient,
    productId
}) => {

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
        dispatch(productAction.setSelectedProductIngredients({chosenData:{ ingredient,productId }}));
    };
    const deleteChosenIngredient = (id) => {
        dispatch(productAction.deleteChosenSelectedIngredients({
            deletedData: {
                id,
                productId
            }
        }));
    };

    return (
        <div className={status === true ? css.single_product_ingredient_active : css.single_product_ingredient}>
            {status === true ?
                <div className={css.product_ingredient_button_box}>
                    <div>
                        Added:
                    </div>
                    <div>
                        <button className={css.product_ingredient_delete_button} onClick={() => deleteChosenIngredient(id)}>✖</button>
                    </div>
                </div> : <div className={css.not_activated}/>}
            <div className={status === true ? css.product_ingredient_box_active : css.product_ingredient_box}
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
