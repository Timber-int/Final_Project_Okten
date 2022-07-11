import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import { getAllProductIngredients, getAllProducts } from '../../store';
import css from './AdminPage.module.css';

const AdminPage = () => {

    const dispatch = useDispatch();

    const {
        products,
    } = useSelector(state => state['productReducer']);
    const {
        productIngredients,
    } = useSelector(state => state['productIngredientReducer']);
    const {
        cities,
    } = useSelector(state => state['cityReducer']);

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllProductIngredients());
    }, []);

    // console.log(products, 'products');
    // console.log(productIngredients, 'productIngredients');
    // console.log(cities, 'cities');

    return (
        <div className={css.admin_content}>
            <div className={css.navigation_block}>
                <NavLink to={'/adminPage/category'}>Category</NavLink>
                <NavLink to={'/adminPage/products'}>Products</NavLink>
            </div>
            <div className={css.content_container}>
                <div className={css.content_block}>
                    <Outlet/>
                </div>
                <div className={css.admin_information_block}>

                </div>
            </div>
        </div>
    );
};

export { AdminPage };
