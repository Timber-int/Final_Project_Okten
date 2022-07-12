import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './AdminPage.module.css';

const AdminPage = () => {

    return (
        <div className={css.admin_content}>
            <div className={css.navigation_block}>
                <NavLink to={'/adminPage/category'}>Category</NavLink>
                <NavLink to={'/adminPage/products'}>Products</NavLink>
                <NavLink to={'/adminPage/productIngredients'}>ProductIngredients</NavLink>
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
