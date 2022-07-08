import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Product } from '../Product/Product';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import { categoryAction, getCategoryById } from '../../store';
import { DEFAULT_CATEGORY_NAME } from '../../constants';
import css from './Product.module.css';

const Products = () => {

    const { state: category } = useLocation();

    const {
        products,
    } = useSelector(state => state['categoryReducer']);

    const dispatch = useDispatch();

    const { id } = category;

    useEffect(() => {
        dispatch(getCategoryById({ id }));
        dispatch(categoryAction.clearSelectedIngredientsArray());
    }, [id]);

    return (
        <div className={css.content}>
            {
                category && category.name.toLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLowerCase()
                    ?
                    <div className={css.product_carousel}>
                        <ImageCarousel controls indicators/>
                    </div>
                    :
                    <></>
            }

            <h1 className={
                category && category.name.toLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLowerCase()
                    ?
                    css.products_text
                    :
                    css.products_text_min_margin
            }>
                {category.name}
            </h1>

            <div className={css.product_container}>
                {products.map(product => <Product key={product.id} product={product}/>)}
            </div>
        </div>
    );
};

export { Products };
