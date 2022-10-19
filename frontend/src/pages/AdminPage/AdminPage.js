import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OrderElement, SelfPickupElement } from '../../components';
import { customerOrderAction, getCustomerOrder, getCustomerOrderSelfPickup } from '../../store/customerOrderSlice';
import css from './AdminPage.module.css';
import { logout } from '../../store';

const AdminPage = () => {

    const dispatch = useDispatch();

    const navigator = useNavigate();

    const {
        orders,
        selfPickupOrders
    } = useSelector(state => state['customerOrderReducer']);

    useEffect(() => {
        dispatch(getCustomerOrder());
        dispatch(getCustomerOrderSelfPickup());
    }, []);

    const logoutFormCustomerPage = () => {
        dispatch(logout());
        dispatch(customerOrderAction.deleteUserData());
        return navigator('/');
    };

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
            <div>
                <div className={css.logout_button_container}>
                    <button onClick={() => logoutFormCustomerPage()} className={css.logout_button}>Logout</button>
                </div>
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
                                    <OrderElement key={order.id} order={order} numElem={index + 1}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className={css.separator}>

                    </div>
                    <div className={css.admin_information_box}>
                        <h1 className={css.information_order_header}>Customer order self pickup</h1>
                        <div className={css.order_container}>
                            {
                                selfPickupOrders.map((order, index) => (
                                    <SelfPickupElement key={order.id} order={order} numElem={index + 1}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AdminPage };
