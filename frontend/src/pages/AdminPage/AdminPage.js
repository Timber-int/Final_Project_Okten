import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { OrderElement, SelfPickupElement } from '../../components';
import { customerOrderAction, getCustomerOrder, getCustomerOrderSelfPickup } from '../../store/customerOrderSlice';
import css from './AdminPage.module.css';
import { getProductsOrder, getProductsSelfPickup, logout } from '../../store';

const checkIsTodayOrder = (array) => {
    return array.reduce((acc, order) => {
        if (new Date()
                .toString()
                .split('', 16)
                .join('')
            ===
            new Date(order.createdAt)
                .toString()
                .split('', 16)
                .join('')) {
            ++acc;
        }
        return acc;
    }, 0);
};

const AdminPage = () => {

    const dispatch = useDispatch();

    const navigator = useNavigate();

    const {
        orders,
        selfPickupOrders
    } = useSelector(state => state['customerOrderReducer']);

    const {
        productsOrder,
        productSelfPickup
    } = useSelector(state => state['productOrderReducer']);

    const [searchData, setSearchData] = useState('');
    console.log(productsOrder);
    useEffect(() => {
        dispatch(getCustomerOrder());
        dispatch(getCustomerOrderSelfPickup());
        dispatch(getProductsOrder());
        dispatch(getProductsSelfPickup());
    }, []);

    const logoutFormCustomerPage = () => {
        dispatch(logout());
        dispatch(customerOrderAction.deleteUserData());
        return navigator('/');
    };

    const sortOrderByPrice = () => {
        dispatch(customerOrderAction.sortAllCustomerOrderByTotalCount());
    };
    const sortOrderByDate = () => {
        dispatch(customerOrderAction.sortAllCustomerOrderDate());
    };
    const sortOrderByAddress = () => {
        // NOT FINISH MUST TO DONE!!!!!!!!!!!!!!

        dispatch(customerOrderAction.sortAllCustomerOrderByAddress());
    };

    const sortOrderByProductsCount = () => {
        dispatch(customerOrderAction.sortAllCustomerOrderByProductsCount());
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
            <div className={css.admin_form_container}>
                <div className={css.content_block}>
                    <Outlet/>
                </div>
                <div className={css.admin_information_container}>
                    <div className={css.logout_button_container}>
                        <button onClick={() => logoutFormCustomerPage()} className={css.logout_button}>Logout</button>
                    </div>
                    <div className={css.admin_information_content}>
                        {

                        }
                    </div>
                </div>
            </div>
            <div className={css.search_input_container}>
                <input className={css.search_input} type="text"
                       onChange={(e) => setSearchData(e.target.value)} value={searchData}
                       placeholder={'Please enter one of these: firstName, lastName, street, city, address, totalOrderCount...'}
                />
            </div>

            <div className={css.sort_container}>
                <button className={css.sort_button} onClick={() => sortOrderByPrice()}>Order total price</button>
                <button className={css.sort_button} onClick={() => sortOrderByDate()}>Order date</button>
                <button className={css.sort_button} onClick={() => sortOrderByAddress()}>Order address</button>
                <button className={css.sort_button} onClick={() => sortOrderByProductsCount()}>Total products</button>
            </div>

            <div className={css.content_container}>
                <div className={css.admin_information_block}>
                    <div className={css.admin_information_box}>
                        <h1 className={css.information_order_header}>
                            <span>Customer orders:</span>
                            <span className={css.order_count}>{orders.length}</span>
                            <span>Today order:</span>
                            <span className={css.order_count}>
                                {
                                    checkIsTodayOrder(orders)
                                }
                            </span>
                        </h1>
                        <div className={css.order_container}>
                            {
                                orders.filter(order => searchData
                                    ?
                                    order.firstName.toLowerCase()
                                        .includes(searchData.toLowerCase())
                                    ||
                                    order.lastName.toLowerCase()
                                        .includes(searchData.toLowerCase())
                                    ||
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
                    </div>
                    <div className={css.separator}>

                    </div>
                    <div className={css.admin_information_box}>
                        <h1 className={css.information_order_header}>
                            <span>Customer order self pickup:</span>
                            <span className={css.order_count}>{selfPickupOrders.length}</span>
                            <span>Today order: </span>
                            <span className={css.order_count}>
                                  {
                                      checkIsTodayOrder(selfPickupOrders)
                                  }
                            </span>
                        </h1>
                        <div className={css.order_container}>
                            {
                                selfPickupOrders.filter(order => searchData
                                    ?
                                    order.firstName.toLowerCase()
                                        .includes(searchData.toLowerCase())
                                    ||
                                    order.lastName.toLowerCase()
                                        .includes(searchData.toLowerCase())
                                    ||
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
            </div>
        </div>
    );
};

export { AdminPage };
