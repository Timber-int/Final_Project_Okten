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
                <span className={css.default_name}>Білки</span>
                <span className={css.info_content}>{productProteins} г</span>
            </div>
            <div className={css.small_information_box}>
                <span className={css.default_name}>Вуглеводи</span>
                <span className={css.info_content}>{productCarbohydrates} г</span>
            </div>
            <div className={css.small_information_box}>
                <span className={css.default_name}>Жири</span>
                <span className={css.info_content}>{productFats} г</span>
            </div>
            <div className={css.small_information_box}>
                <span className={css.default_name}>Калорійність</span>
                <span className={css.info_content}>{productCalories} ккал</span>
            </div>
        </div>
    );
};

export { ProductInformation };
