import React from 'react';

import css from './ProductAdminContent.module.css';
import { baseURL } from '../../config';
import { useDispatch } from 'react-redux';
import { deleteProductById, productAction } from '../../store';

const ProductAdminContent = ({ product }) => {
    const {
        productName,
        productPhoto,
        productBigPhoto,
        productPrice,
        productWeight,
        description,
        id,
        categoryId,
        totalCount,
    } = product;

    const dispatch = useDispatch();

    const deleteProduct = (id) => {
        dispatch(deleteProductById({ id }));
    };

    const updateProductGetData = (product) => {
        dispatch(productAction.updateProductGetData({ productDataToUpdate: product }));
    };

    return (
        <div className={css.product_block}>
            <div className={css.image_block}>
                <div>
                    <img className={css.image} src={baseURL + '/' + productPhoto} alt={productName}/>
                </div>
                <div>
                    {productBigPhoto
                        ? <img className={css.image} src={baseURL + '/' + productBigPhoto} alt={productName}/>
                        : <img className={css.image} src={'https://la.ua/wp-content/uploads/2022/02/virtualna-picza2.png'} alt={productName}/>
                    }
                </div>
            </div>
            <div className={css.product_information}>
                <div>ProductPrice: <span>{productPrice} UAH</span></div>
                <div>ProductWeight: <span>{productWeight} g</span></div>
            </div>
            <div>
                Description
            </div>
            <div className={css.product_description}>
                {description}
            </div>
            <div>
                <button className={css.product_button} onClick={() => deleteProduct(id)}>Delete</button>
            </div>
            <div>
                <button className={css.product_button} onClick={() => updateProductGetData(product)}>Update</button>
            </div>
        </div>
    );
};

export { ProductAdminContent };
