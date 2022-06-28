import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import css from './Layout.module.css';
import { useSelector } from 'react-redux';

const Layout = () => {

    const { totalOrderCount } = useSelector(state => state['orderReducer']);

    useEffect(() => {
    }, [totalOrderCount]);

    return (
        <div>
            <div className={css.header}>
                <NavLink to={'/registration'}>Registration</NavLink>
                <NavLink to={'/products'}>Products</NavLink>
                <NavLink to={'/OrderPage'}>
                    <div className={css.order_content}>
                        <div>
                            <img className={css.basket_image}
                                  src={'https://la.ua/wp-content/themes/lapiec/assets/frontend/img/icons/shopping-cart.svg'} alt="basket"/>
                        </div>
                        <div>
                            <span className={css.total_count}>{totalOrderCount}</span>
                            <span>грн</span>
                        </div>
                    </div>
                </NavLink>
            </div>
            <div className={css.outlet}>
                <Outlet/>
            </div>
            <div className={css.footer}>
                Hello it's Jonny!!!
            </div>
        </div>
    );
};

export { Layout };
