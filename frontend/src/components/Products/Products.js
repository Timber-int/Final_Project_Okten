import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '../Product/Product';
import { getAllProducts } from '../../store';
import css from './Product.module.css';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';

const Products = () => {

    const { products } = useSelector(state => state['productReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
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
