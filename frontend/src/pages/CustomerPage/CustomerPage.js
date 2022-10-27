import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store';
import { customerOrderAction, getCustomerOrder, getCustomerOrderSelfPickup } from '../../store/customerOrderSlice';
import { OrderElement, SelfPickupElement } from '../../components';
import css from './CustomerPage.module.css';

const CustomerPage = () => {

    const [searchData, setSearchData] = useState('');

    const dispatch = useDispatch();

    const { user } = useSelector(state => state['authReducer']);
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
    };
    return (
        <div className={css.container}>

            <div className={css.logout_button_container}>
                <button onClick={() => logoutFormCustomerPage()} className={css.logout_button}>Logout</button>
            </div>

            <div className={css.search_input_container}>
                <input className={css.search_input} type="text"
                       onChange={(e) => setSearchData(e.target.value)} value={searchData}
                placeholder={'Please enter one of these: street, city, address, totalOrderCount...'}
                />
            </div>

            <div className={css.main_order_container}>
                <div className={css.orders_container}>
                    {
                        [...orders].filter(order => order.email === user.email)
                            .filter(order => searchData
                                ?
                                order.street.toLowerCase()
                                    .includes(searchData.toLowerCase())
                                ||
                                order.city.toLowerCase()
                                    .includes(searchData.toLowerCase())
                                ||
                                String(order.totalOrderCount)
                                    .toLowerCase()
                                    .includes(searchData.toLowerCase())
                                :
                                order)
                            .map((order, index) => (
                                <OrderElement key={order.id} order={order} numElem={index + 1}/>
                            ))
                    }
                </div>
                <div className={css.self_pickup_orders_container}>
                    {
                        [...selfPickupOrders].filter(order => order.email === user.email)
                            .filter(order => searchData
                                ?
                                order.address.toLowerCase()
                                    .includes(searchData.toLowerCase())
                                ||
                                String(order.totalOrderCount)
                                    .toLowerCase()
                                    .includes(searchData.toLowerCase())
                                :
                                order)
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
