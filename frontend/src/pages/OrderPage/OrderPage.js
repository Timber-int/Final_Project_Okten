import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { OrderTypeSelfPickup, OrderTypeShopDelivery } from '../../components';
import { orderAction } from '../../store';
import css from './OrderPage.module.css';

const OrderPage = () => {
    // chosenProductIdArray.map((element, index) =>
    //     <div key={index}>{chosenProduct[element].description}</div>)

    const {
        usedOrderType,
        totalOrderCount
    } = useSelector(state => state['orderReducer']);

    const dispatch = useDispatch();

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
                                <NavLink to={'/products'}>На головну</NavLink>
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

                                </div>
                            </div>
                        </div>
            }
        </div>
    );
};

export { OrderPage };
