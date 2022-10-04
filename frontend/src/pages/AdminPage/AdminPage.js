import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OrderElement } from '../../components';
import { getCustomerOrder, getCustomerOrderSelfPickup } from '../../store/customerOrderSlice';
import css from './AdminPage.module.css';

const AdminPage = () => {

    const dispatch = useDispatch();

    const {
        orders,
        selfPickupOrders
    } = useSelector(state => state['customerOrderReducer']);

    useEffect(() => {
        dispatch(getCustomerOrder());
        dispatch(getCustomerOrderSelfPickup());
    }, []);

    return (
        <div className={css.admin_content}>
            <div className={css.navigation_block}>
                <NavLink to={'/adminPage/category'}>Category</NavLink>
                <NavLink to={'/adminPage/products'}>Products</NavLink>
                <NavLink to={'/adminPage/productIngredients'}>ProductIngredients</NavLink>
                <NavLink to={'/adminPage/cities'}>Cities</NavLink>
                <NavLink to={'/adminPage/cityAddress'}>CityAddress</NavLink>
                <NavLink to={'/adminPage/productInformation'}>ProductInformation</NavLink>
                <NavLink to={'/'}>Home</NavLink>
            </div>
            <div className={css.content_container}>
                <div className={css.content_block}>
                    <Outlet/>
                </div>
                <div className={css.admin_information_block}>
                    <div className={css.admin_information_box}>
                        <h1 className={css.information_order_header}>Customer orders</h1>
                        <div className={css.order_container}>
                            {
                                orders.map((order, index) => (
                                    <div>{index + 1}</div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={css.admin_information_box}>
                        <h1 className={css.information_order_header}>Customer order self pickup</h1>
                        <div className={css.order_container}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AdminPage };
