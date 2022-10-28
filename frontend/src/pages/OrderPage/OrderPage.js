import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { OrderComponentButtonOrderPage, OrderTypeSelfPickup, OrderTypeShopDelivery } from '../../components';
import { orderAction } from '../../store';
import { baseURL } from '../../config';
import { createCustomerOrder, createCustomerOrderSelfPickup, customerOrderAction } from '../../store/customerOrderSlice';
import { CONSTANTS } from '../../constants';
import css from './OrderPage.module.css';

const OrderPage = () => {

    const navigate = useNavigate();

    const {
        usedOrderType,
        chosenOrderProducts,
        totalOrderCount,
        discount,
    } = useSelector(state => state['orderReducer']);

    const {
        userData,
        servetStatus,
        serverErrors,
        status,
    } = useSelector(state => state['customerOrderReducer']);

    const dispatch = useDispatch();

    const deleteOrderProduct = (orderElementId) => {
        dispatch(orderAction.deleteSingleOrderProductById({
            id: orderElementId,
        }));
    };

    const makeOrder = () => {
        if (usedOrderType === CONSTANTS.ORDER) {
            dispatch(createCustomerOrder({
                payload: {
                    userData,
                    totalOrderCount,
                    usedOrderType,
                    chosenOrderProducts,
                    servetStatus,
                }
            }));
        }

        if (usedOrderType === CONSTANTS.SELF_PICKUP) {
            dispatch(createCustomerOrderSelfPickup({
                payload: {
                    userData,
                    totalOrderCount,
                    usedOrderType,
                    chosenOrderProducts,
                    servetStatus,
                }
            }));
        }

        if (status === CONSTANTS.RESOLVED) {
            navigate('/thanks', { replace: true });
        }
    };

    return (
        <div className={css.order_container}>
            {
                new Date().getHours() < 7 || new Date().getHours() >= 22
                    ?
                    <div className={css.shop_is_closed}>
                        Orders are accepted from 10:00 to 22:00. Sorry for the inconvenience
                    </div>
                    :
                    !JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD))
                    ||
                    !JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD)).length
                    ||
                    JSON.parse(localStorage.getItem(CONSTANTS.TOTAL_ORDER_COUNT)) === 0
                        ?
                        <div className={css.not_order_container}>
                            <div className={css.bucket_empty}>Your basket is empty</div>
                            <div className={css.back_to_menu}>
                                <NavLink to={'/'}>On the main one</NavLink>
                            </div>
                        </div>
                        :
                        <div className={css.content}>
                            <div className={css.order_header}>
                                Your order
                            </div>
                            <div className={css.order_details_container}>
                                <div className={css.first_block}>
                                    <div className={css.delivery_method}>
                                        <span className={css.delivery_method_text}>Delivery method</span>
                                    </div>
                                    <div className={css.chosen_order_type}>
                                        <label>
                                            <input className={css.chosen_order_type_check_box} type="radio"
                                                   onClick={e => dispatch(orderAction.setOrderType({ orderType: e.target.value }))}
                                                   value={'order'}
                                                   name={'chosenOrderType'}
                                                   defaultChecked={true}
                                            />
                                            <span className={css.chosen_order_type_name}>Delivery</span>
                                        </label>
                                        <label>
                                            <input className={css.chosen_order_type_check_box} type="radio"
                                                   onClick={e => dispatch(orderAction.setOrderType({ orderType: e.target.value }))}
                                                   value={'selfPickup'}
                                                   name={'chosenOrderType'}
                                            />
                                            <span className={css.chosen_order_type_name}>Pickup</span>
                                        </label>
                                    </div>
                                    <div className={css.chosen_order_type_data}>
                                        {
                                            usedOrderType === CONSTANTS.SELF_PICKUP
                                                ?
                                                <div className={css.delivery_type}>
                                                    <OrderTypeSelfPickup/>
                                                </div>
                                                :
                                                <div className={css.delivery_type}>
                                                    <OrderTypeShopDelivery/>
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className={css.second_block}>
                                    <div className={css.order_table}>
                                        <div className={css.order_table_head}>
                                            <div className={css.table_container}>
                                                <div className={css.table_name_first}>Product</div>
                                                <div className={css.table_name_second}>Am-t</div>
                                                <div className={css.table_name_third}>Price</div>
                                            </div>
                                        </div>
                                        <div className={css.order_table_body}>
                                            {
                                                JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD))
                                                &&
                                                JSON.parse(localStorage.getItem(CONSTANTS.PRODUCT_CARD))
                                                    .map(orderElement => (
                                                        <div className={css.chosen_product_container_table} key={uuidv4()}>
                                                            <div className={css.first_element}>
                                                                <div>
                                                                    <img className={css.chosen_product_image}
                                                                         src={baseURL + '/' + orderElement.productPhoto}
                                                                         alt={`${orderElement.productName}`}/>
                                                                </div>
                                                                <div>
                                                                    <div className={css.product_information_element}>{orderElement.productName}</div>
                                                                    {
                                                                        orderElement.productIngredients.length > 0
                                                                            ?
                                                                            <div className={css.product_information_element_product_ingredients}>
                                                                                {
                                                                                    orderElement.productIngredients.split(',')
                                                                                        .map(element => (
                                                                                            <div key={element}>
                                                                                                {element},
                                                                                            </div>
                                                                                        ))
                                                                                }
                                                                            </div>
                                                                            :
                                                                            <></>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className={css.second_element}>
                                                                <OrderComponentButtonOrderPage
                                                                    orderData={orderElement}
                                                                />
                                                            </div>
                                                            <div className={css.third_element}>
                                                                <span className={css.productPrice}>{orderElement.productPrice}</span> <span>UAH</span>
                                                            </div>
                                                            <div className={css.delete_order_product}
                                                                 onClick={() => deleteOrderProduct(orderElement.id)}>
                                                                ✖
                                                            </div>
                                                            <hr/>
                                                        </div>
                                                    ))
                                            }
                                        </div>
                                        <div className={css.order_price_container}>
                                            <div className={css.question_servet_block}>
                                                <span className={css.checkbox_servet}>
                                                <input type="checkbox" onChange={() => dispatch(customerOrderAction.setServeStatus())}/>
                                                </span>
                                                <span className={css.servet_text}>Without napkins</span>
                                            </div>
                                            <div className={css.discount}>Discount: {discount} UAH</div>
                                            <div className={css.price}>Total: {totalOrderCount} UAH</div>
                                        </div>
                                        {
                                            userData
                                                ?
                                                <div className={css.order_button_container}>
                                                    <button onClick={() => makeOrder()} className={
                                                        status === CONSTANTS.LOADING
                                                        ||
                                                        status === CONSTANTS.REJECTED
                                                            ?
                                                            css.order_button_disabled
                                                            :
                                                            css.order_button
                                                    }
                                                    >
                                                        Order
                                                    </button>
                                                </div>
                                                :
                                                <div className={css.customer_information}>If you want to place an order, you must fill out the buyer's
                                                    form, also if you are not registered on our site, please do so. </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
};

export { OrderPage };
