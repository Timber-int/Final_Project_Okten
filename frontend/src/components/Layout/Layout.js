import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import css from './Layout.module.css';

const Layout = () => {
    return (
        <div>
            <div className={css.header}>
                <NavLink to={'/registration'}>Registration</NavLink>
                <NavLink to={'/products'}>Products</NavLink>
            </div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
            <div className={css.footer}>
            </div>
        </div>
    );
};

export { Layout };
