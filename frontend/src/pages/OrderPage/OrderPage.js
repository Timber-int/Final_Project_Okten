import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { OrderTypeSelfPickup, OrderTypeShopDelivery } from '../../components';
import { deleteOrderProductById, deleteTotalOrderCount, getAllOrder, orderAction } from '../../store';
import { baseURL } from '../../config';
import css from './OrderPage.module.css';

const OrderPage = () => {

    const [servetStatus, setServetStatus] = useState(false);

    const {
        usedOrderType,
        chosenOrderProducts,
        discount,
    } = useSelector(state => state['orderReducer']);

    const {
        totalOrderCount,
    } = useSelector(state => state['totalOrderCountReducer']);

    const dispatch = useDispatch();

    const deleteOrderProduct = (orderElement) => {
        dispatch(deleteOrderProductById({
            orderElement,
        }));
        dispatch(deleteTotalOrderCount({ orderElement }));
    };

    useEffect(() => {
        dispatch(getAllOrder());
    }, []);

    return (
        <div className={css.order_container}>
            {
                new Date().getHours() < 7 || new Date().getHours() >= 22
                    ?
                    <div className={css.shop_is_closed}>
                        Замовлення приймаються з 10:00 до 22:00. Вибачте за тимчасові незручності
                    </div>
                    :
                    totalOrderCount === 0 && chosenOrderProducts.length === 0
                        ?
                        <div className={css.not_order_container}>
                            <div className={css.bucket_empty}>Ваш кошик порожній</div>
                            <div className={css.back_to_menu}>
                                <NavLink to={'/'}>На головну</NavLink>
                            </div>
                        </div>
                        :
                        <div className={css.content}>
                            <div className={css.order_header}>
                                Ваше замовлення
                            </div>
                            <div className={css.order_details_container}>
                                <div className={css.first_block}>
                                    <div className={css.delivery_method}>
                                        <span className={css.delivery_method_text}>Спосіб доставки</span>
                                    </div>
                                    <div className={css.chosen_order_type}>
                                        <label>
                                            <input className={css.chosen_order_type_check_box} type="radio"
                                                   onClick={e => dispatch(orderAction.setOrderType({ orderType: e.target.value }))}
                                                   value={'order'}
                                                   name={'chosenOrderType'}
                                                   defaultChecked={true}
                                            />
                                            <span className={css.chosen_order_type_name}>Доставка</span>
                                        </label>
                                        <label>
                                            <input className={css.chosen_order_type_check_box} type="radio"
                                                   onClick={e => dispatch(orderAction.setOrderType({ orderType: e.target.value }))}
                                                   value={'selfPickup'}
                                                   name={'chosenOrderType'}
                                            />
                                            <span className={css.chosen_order_type_name}>Самовивіз</span>
                                        </label>
                                    </div>
                                    <div className={css.chosen_order_type_data}>
                                        {
                                            usedOrderType === 'selfPickup'
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
                                                <div className={css.table_name_first}>Товар</div>
                                                <div className={css.table_name_second}>К-ть</div>
                                                <div className={css.table_name_third}>Ціна</div>
                                            </div>
                                        </div>
                                        <div className={css.order_table_body}>
                                                {
                                                    chosenOrderProducts.map(orderElement => (
                                                        <div className={css.chosen_product_container_table} key={uuidv4()}>
                                                            {console.log(orderElement,'element')}
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
                                                            <div className={css.second_element}>{orderElement.totalCount}</div>
                                                            <div className={css.third_element}>
                                                                <span className={css.productPrice}>{orderElement.productPrice}</span> <span>UAH</span>
                                                            </div>
                                                            <div className={css.delete_order_product}
                                                                 onClick={() => deleteOrderProduct(orderElement)}>
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
                                                <input type='checkbox' onChange={() => setServetStatus(!servetStatus)}/>
                                                </span>
                                                <span className={css.servet_text}>Без серветок</span>
                                            </div>
                                            <div className={css.discount}>Знижка: {discount} грн</div>
                                            <div className={css.price}>Разом: {totalOrderCount} грн</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
};

export { OrderPage };
