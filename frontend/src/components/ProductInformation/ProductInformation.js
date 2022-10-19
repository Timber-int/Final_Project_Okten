import React from 'react';

import css from './ProductInformation.module.css';

const ProductInformation = ({ singleProductInformation }) => {

    const {
        productProteins,
        productCarbohydrates,
        productFats,
        productCalories
    } = singleProductInformation;

    return (
        <div className={css.product_details_more_information_container}>
            <div className={css.small_information_box}>
                <span className={css.default_name}>Proteins</span>
                <span className={css.info_content}>{productProteins} g</span>
            </div>
            <div className={css.small_information_box}>
                <span className={css.default_name}>Carbohydrates</span>
                <span className={css.info_content}>{productCarbohydrates} g</span>
            </div>
            <div className={css.small_information_box}>
                <span className={css.default_name}>Fats</span>
                <span className={css.info_content}>{productFats} g</span>
            </div>
            <div className={css.small_information_box}>
                <span className={css.default_name}>Calories</span>
                <span className={css.info_content}>{productCalories} kcal</span>
            </div>
        </div>
    );
};

export { ProductInformation };
