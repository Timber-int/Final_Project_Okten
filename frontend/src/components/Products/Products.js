import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '../Product/Product';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import { getAllProducts, productIngredientAction } from '../../store';
import css from './Product.module.css';

const Products = () => {

    const { products } = useSelector(state => state['productReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(productIngredientAction.clearSelectedIngredientsArray())
    }, []);

    return (
        <div className={css.content}>
            <div className={css.product_carousel}>
                <ImageCarousel controls indicators/>
            </div>

            <h1 className={css.products_text}>
                Піца
            </h1>

            <div className={css.product_container}>
                {products.map(product => <Product key={product.id} product={product}/>)}
            </div>
        </div>
    );
};

export { Products };
