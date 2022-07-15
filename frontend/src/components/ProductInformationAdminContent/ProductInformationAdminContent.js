import React from 'react';

import css from './ProductInformationAdminContent.module.css';
import { useDispatch } from 'react-redux';
import { deleteProductsInformationById, productInformationAction } from '../../store';

const ProductInformationAdminContent = ({ productInformation }) => {

    const dispatch = useDispatch();

    const {
        id,
        productCalories,
        productCarbohydrates,
        productFats,
        productProteins,
    } = productInformation;

    const deleteProductInformation = (id) => {
        dispatch(deleteProductsInformationById({ id }));
    };

    const updateProductInformationGetData = (productInformationDataToUpdate) => {
        dispatch(productInformationAction.updateProductInformationGetData({ productInformationDataToUpdate }));
    };

    return (
        <div className={css.product_information_box}>
            <div>ProductCalories: <span className={css.product_information_name}>{productCalories}</span></div>
            <div>ProductCarbohydrates: <span className={css.product_information_name}>{productCarbohydrates}</span></div>
            <div>ProductFats: <span className={css.product_information_name}>{productFats}</span></div>
            <div>ProductProteins: <span className={css.product_information_name}>{productProteins}</span></div>
            <div>
                <button className={css.product_button} onClick={() => deleteProductInformation(id)}>Delete</button>
            </div>
            <div>
                <button className={css.product_button} onClick={() => updateProductInformationGetData(productInformation)}>Update</button>
            </div>
        </div>
    );
};

export { ProductInformationAdminContent };
