import React from 'react';

import { baseURL } from '../../config';
import css from './CustomerProduct.module.css';
import { CONSTANTS } from '../../constants';

const CustomerProduct = ({ product }) => {
    const {
        productName,
        productPhoto,
        productBigPhoto,
        productPrice,
        productWeight,
        description,
        productIngredients
    } = product;

    return (
        <div className={css.product_box}>
            <div className={css.product_first_block}>
                {
                    productBigPhoto
                        ?
                        <div className={css.images_container}>
                            <img className={css.product_image} src={baseURL + '/' + productPhoto} alt={productName}/>
                            <img className={css.product_image} src={baseURL + '/' + productBigPhoto} alt={productName}/>
                        </div>
                        :
                        <div className={css.images_container}>
                            <img className={css.product_image} src={baseURL + '/' + productPhoto} alt={productName}/>
                            <img className={css.product_image}
                                 src={'https://previews.123rf.com/images/shopplaywood/shopplaywood1603/shopplaywood160300005/53170750-flat-pizza-icon-.jpg'}
                                 alt={productName}/>
                        </div>
                }
            </div>
            <div className={css.product_second_block}>
                <div>Product name: <span className={css.product_name}>{productName}</span></div>
                <div>Product price: <span className={css.product_price}>{productPrice}</span> UAH</div>
                <div>Product weight: {productWeight} g</div>
                <div className={css.product_description}>
                    Description: {description}
                </div>
                {
                    productIngredients.length > 0
                        ?
                        <div className={css.product_ingredients}>Product ingredients: <span
                            className={css.product_ingredients_elements}>{productIngredients}</span></div>
                        :
                        <></>
                }
            </div>
        </div>
    );
};

export { CustomerProduct };
