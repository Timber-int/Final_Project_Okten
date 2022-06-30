import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { orderAction } from '../../store';
import css from './OrderPage.module.css';

const OrderPage = () => {
    // chosenProductIdArray.map((element, index) =>
    //     <div key={index}>{chosenProduct[element].description}</div>)

    const {
        chosenProduct,
        chosenProductIdArray,
        usedOrderType,
        totalOrderCount
    } = useSelector(state => state['orderReducer']);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit
    } = useForm();

    console.log(new Date().getHours());

    const createOrder = (data) => {
        console.log(data);
    };

    return (
        <div className={css.order_container}>
            {
                new Date().getHours() < 10 || new Date().getHours() >= 22
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
                            <form className={css.order_details_container} onSubmit={handleSubmit(createOrder)}>
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
                                    <div className={css.chosen_order_client_name_box}>
                                        <input type="text" {...register('firstName')}
                                               className={css.chosen_order_client_name_input}
                                               required={true}
                                        />
                                        <label>Ваше ім`я*</label>
                                    </div>
                                    <div className={css.chosen_order_client_telephone_box}>
                                        <input type="text" {...register('telephone')}
                                               className={css.chosen_order_client_telephone_input}
                                               required={true}
                                        />
                                        <label>Телефон*</label>
                                    </div>
                                    <div className={css.checked_registration_block}>
                                        Ви не зареєстровані, увійдіть щоб використати бонуси.
                                    </div>

                                    <div className={css.chosen_order_type_data}>
                                        {
                                            usedOrderType === 'order' || usedOrderType === ''
                                                ?
                                                <div className={css.first_data_type}>
                                                    <div className={css.chosen_order_client_city_box}>
                                                        <input type="text" {...register('city')}
                                                               className={css.chosen_order_client_city_input}
                                                               required={true}
                                                        />
                                                        <label>Місто*</label>
                                                    </div>
                                                    <div className={css.address_details_box}>
                                                        <div className={css.address_details_box_first_block}>
                                                            <input type="text" {...register('street')}
                                                                   className={css.chosen_order_client_street_input}
                                                                   required={true}
                                                            />
                                                            <label>Вулиця*</label>
                                                        </div>
                                                        <div className={css.address_details_box_second_block}>
                                                            <input type="text" {...register('houseNumber')}
                                                                   className={css.chosen_order_client_house_input}
                                                                   required={true}
                                                            />
                                                            <label>№ будинку*</label>
                                                        </div>
                                                    </div>
                                                    <div className={css.order_comment}>
                                                        <input type="text"{...register('orderComment')}
                                                               className={css.chosen_order_client_order_comment_input}
                                                               required={true}
                                                        />
                                                        <label>Коментар до замовлення</label>
                                                    </div>
                                                    <div className={css.address_information_box}>
                                                        <div className={css.address_details_block_first}>
                                                            <input type="text" {...register('entrance')}
                                                                   className={css.chosen_order_client_entrance_input}
                                                                   required={true}
                                                            />
                                                            <label>Під'їзд</label>
                                                        </div>
                                                        <div className={css.address_details_block_second}>
                                                            <input type="text"{...register('flour')}
                                                                   className={css.chosen_order_client_flour_input}
                                                                   required={true}
                                                            />
                                                            <label>Поверх</label>
                                                        </div>
                                                        <div className={css.address_details_block_third}>
                                                            <input type="text" {...register('office')}
                                                                   className={css.chosen_order_client_office_input}
                                                                   required={true}
                                                            />
                                                            <label>Кв.\ офіс</label>
                                                        </div>
                                                        <div className={css.address_details_block_four}>
                                                            <input type="text" {...register('intercom')}
                                                                   className={css.chosen_order_client_intercom_input}
                                                                   required={true}
                                                            />
                                                            <label>Домофон</label>
                                                        </div>
                                                    </div>
                                                    <div className={css.order_comment}>
                                                        <input type="text"{...register('addressComment')}
                                                               className={css.chosen_order_client_order_comment_input}
                                                               required={true}
                                                        />
                                                        <label>Коментар до адреси</label>
                                                    </div>
                                                    <div className={css.map_container}>

                                                    </div>
                                                </div>
                                                :
                                                <div className={css.second_data_type}>
                                                    <div className={css.address_self_pickup}>
                                                        value
                                                    </div>
                                                    <div className={css.order_comment}>
                                                        <input type="text"{...register('orderComment')}
                                                               className={css.chosen_order_client_order_comment_input}
                                                               required={true}
                                                        />
                                                        <label>Коментар до замовлення</label>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className={css.second_block}>

                                    <input type="submit" value={'Готово'}/>
                                </div>
                            </form>
                        </div>
            }
        </div>
    );
};

export { OrderPage };
