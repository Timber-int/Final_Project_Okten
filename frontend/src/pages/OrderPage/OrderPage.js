import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { OrderTypeSelfPickup, OrderTypeShopDelivery } from '../../components';
import { deleteOrderProductById, getAllOrder, orderAction } from '../../store';
import css from './OrderPage.module.css';
import { baseURL } from '../../config';

const OrderPage = () => {

    const {
        usedOrderType,
        totalOrderCount,
        chosenOrderProducts,
    } = useSelector(state => state['orderReducer']);
    console.log(chosenOrderProducts);
    const dispatch = useDispatch();

    const deleteOrderProduct = (id) => {
        dispatch(deleteOrderProductById({ id }));
    };

    useEffect(() => {
        dispatch(getAllOrder());
    }, []);

    return (
        <div className={css.order_container}>
            {
                new Date().getHours() < 8 || new Date().getHours() >= 22
                    ?
                    <div className={css.shop_is_closed}>
                        Замовлення приймаються з 10:00 до 22:00. Вибачте за тимчасові незручності
                    </div>
                    :
                    totalOrderCount === 0
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
                                            <div className={css.chosen_product_container}>
                                                {
                                                    chosenOrderProducts.map(orderElement => (
                                                        <div className={css.chosen_product_container_table}>
                                                            <div className={css.first_element}>
                                                                <div>
                                                                    <img className={css.chosen_product_image}
                                                                         src={baseURL + '/' + orderElement.productPhoto}
                                                                         alt={`${orderElement.productName}`}/>
                                                                </div>
                                                                <div>
                                                                    {orderElement.productName}
                                                                </div>
                                                            </div>
                                                            <div className={css.second_element}>sfdsdf</div>
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
                                        </div>
                                        <div className={css.order_price_container}>
                                            <div className={css.question_servet_block}>[] Без серветок</div>
                                            <div className={css.discount}>Знижка: 324 грн</div>
                                            <div className={css.price}>Разом: 213 грн</div>
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
