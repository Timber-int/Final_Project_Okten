import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '../Product/Product';
import { getAllProducts, getAllSliders } from '../../store';
import css from './Product.module.css';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';

const Products = () => {

    const { products } = useSelector(state => state['productReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllSliders());
    }, []);

    return (
        <div className={css.content}>
            <div className={css.product_carousel}>
                <ImageCarousel controls indicators/>
            </div>

            <div className={css.product_container}>
                {products.map(product => <Product key={product.id} product={product}/>)}
            </div>
        </div>
    );
};

export { Products };
