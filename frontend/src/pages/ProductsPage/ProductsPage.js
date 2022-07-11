import React, { useEffect } from 'react';

import css from './ProductsPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { getAllCategories } from '../../store';

const ProductsPage = () => {

    const dispatch = useDispatch();

    const {
        categories,
    } = useSelector(state => state['categoryReducer']);

    useEffect(() => {
        if (!categories) {
            dispatch(getAllCategories());
        }
    }, [categories]);

    return (
        <div className={css.products_container}>
            {
                categories.map(category => (
                    <div key={category.id} className={css.product_data_box}>
                        <NavLink to={'/adminPage/products/productDetails/' + category.id} state={category}
                                 className={css.category_name}>{category.name}
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

export { ProductsPage };
