import React from 'react';

import { baseURL } from '../../config';
import css from './ProductIngredientAdminContent.module.css';
import { useDispatch } from 'react-redux';
import { deleteProductIngredientById, productAction } from '../../store';

const ProductIngredientAdminContent = ({ productIngredient }) => {

    const {
        categoryId,
        createdAt,
        id,
        productIngredientName,
        productPhoto,
        productPrice,
        productWeight,
        status,
    } = productIngredient;

    const dispatch = useDispatch();

    const deleteProductIngredient = (id) => {
        dispatch(deleteProductIngredientById({ id }));
    };
    const updateProductIngredientGetData = (productIngredient) => {
        dispatch(productAction.updateProductIngredientGetData({ productDataToUpdate: productIngredient }));
    };

    return (
        <div className={css.product_ingredient_box}>
            <div>
                <img className={css.image} src={baseURL + '/' + productPhoto} alt={productIngredientName}/>
            </div>
            <div className={css.product_name}>
                {productIngredientName}
            </div>
            <div className={css.product_information}>
                <div>ProductPrice: <span>{productPrice} UAH</span></div>
                <div>ProductWeight: <span>{productWeight} g</span></div>
            </div>
            <div>
                CreatedAt: {createdAt}
            </div>
            <div>
                <button className={css.product_button} onClick={() => deleteProductIngredient(id)}>Delete</button>
            </div>
            <div>
                <button className={css.product_button} onClick={() => updateProductIngredientGetData(productIngredient)}>Update</button>
            </div>
        </div>
    );
};

export { ProductIngredientAdminContent };
