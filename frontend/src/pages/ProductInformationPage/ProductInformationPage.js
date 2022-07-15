import React, { useEffect } from 'react';

import css from './ProductInformationPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store';
import { NavLink, Outlet } from 'react-router-dom';

const ProductInformationPage = () => {
    const dispatch = useDispatch();

    const {
        products,
    } = useSelector(state => state['productReducer']);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getAllProducts());
        }
    }, [products]);

    return (
        <div className={css.products_container}>
            {
                products.map(product => (
                    <div key={product.id} className={css.product_data_box}>
                        <NavLink to={'/adminPage/productInformation/productDetailInformation/' + product.id} state={product}
                                 className={css.product_name}>{product.productName}
                        </NavLink>
                    </div>
                ))
            }
            <div className={css.content_container}>
                <Outlet/>
            </div>
        </div>
    );
};

export { ProductInformationPage };
