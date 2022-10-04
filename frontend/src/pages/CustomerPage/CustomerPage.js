import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store';
import { customerOrderAction, getCustomerOrder, getCustomerOrderSelfPickup } from '../../store/customerOrderSlice';
import css from './CustomerPage.module.css';
import { OrderElement, SelfPickupElement } from '../../components';

const CustomerPage = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state['authReducer']);
    const {
        orders,
        selfPickupOrders
    } = useSelector(state => state['customerOrderReducer']);

    // console.log(user, 'user');
    // console.log(orders, 'orders');
    // console.log(selfPickupOrders, 'selfPickupOrders');

    useEffect(() => {
        dispatch(getCustomerOrder());
        dispatch(getCustomerOrderSelfPickup());
    }, []);

    const logoutFormCustomerPage = () => {
        dispatch(logout());
        dispatch(customerOrderAction.deleteUserData());
    };
    return (
        <div className={css.container} >

            <div className={css.logout_button_container}><button onClick={() => logoutFormCustomerPage()} className={css.logout_button}>Logout</button></div>

            <div className={css.main_order_container}>

                <div className={css.orders_container}>
                    {
                        [...orders].filter(order => order.email === user.email)
                            .map((order, index) => (
                                <OrderElement key={order.id} order={order} numElem={index + 1}/>
                            ))
                    }
                </div>
                <div className={css.self_pickup_orders_container}>
                    {
                        [...selfPickupOrders].filter(order => order.email === user.email)
                            .map((order, index) => (
                                <SelfPickupElement key={order.id} order={order} numElem={index + 1}/>
                            ))
                    }
                </div>
            </div>
        </div>
    );
};

export { CustomerPage };
