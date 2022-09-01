import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import { getAllProducts, getCategoryById, productAction } from '../../store';
import { DEFAULT_CATEGORY_NAME } from '../../constants';
import { Product } from '../Product/Product';
import { SearchBar } from '../SearchBar/SearchBar';
import css from './Product.module.css';

const Products = () => {

    const { state: productCategory } = useLocation();

    const {
        products,
    } = useSelector(state => state['productReducer']);

    const {
        category,
    } = useSelector(state => state['categoryReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productAction.clearSelectedIngredientsArray());
        dispatch(getAllProducts());
        dispatch(getCategoryById({ id: productCategory ? productCategory.id : 1 }));
    }, [productCategory]);

    return (
        <div className={css.content}>
            {
                category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLowerCase()
                    ?
                    <div className={css.product_carousel}>
                        <ImageCarousel controls indicators/>
                    </div>
                    :
                    <></>
            }

            <h1 className={
                category && category?.name.toLowerCase() === DEFAULT_CATEGORY_NAME.PIZZA.toLowerCase()
                    ?
                    css.products_text
                    :
                    css.products_text_min_margin
            }>
                {category?.name}
            </h1>
            <div className={css.search_bar_container}>
                <SearchBar category={category} products={products}/>
            </div>

            <div className={css.product_container}>
                {
                    [...products].filter(product => product.categoryId === category?.id)
                        .map(product =>
                            <Product key={product.id} product={product} category={category}/>
                        )
                }
            </div>
        </div>
    );
};

export { Products };
