import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { orderAction } from '../../store';
import css from './OrderPage.module.css';
import { joiResolver } from '@hookform/resolvers/joi';
import { orderCardValidator } from '../../validator';

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
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(orderCardValidator),
        mode: 'onTouched',
    });

    const createOrder = (data) => {
        console.log(data);
    };

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
                                        <div className={css.errors_span}>{errors.firstName && <span>{errors.firstName.message}</span>}</div>
                                    </div>
                                    <div className={css.chosen_order_client_email_box}>
                                        <input type="email" {...register('email')}
                                               className={css.chosen_order_client_email_input}
                                               required={true}
                                        />
                                        <label>Емейл*</label>
                                        <div className={css.errors_span}>{errors.email && <span>{errors.email.message}</span>}</div>
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
                                                    {/* <select name="select" {...register('city')} className={css.chosen_order_client_city_box}> */}
                                                    {/*     <option value="value1">Значение 1</option> */}
                                                    {/*     <option value="value2" selected>Значение 2</option> */}
                                                    {/*     <option value="value3">Значение 3</option> */}
                                                    {/* </select> */}
                                                    <input type="text" {...register('city')}
                                                           className={css.chosen_order_client_city_input}
                                                    />
                                                    <label>Місто*</label>
                                                    <div className={css.errors_span}>{errors.city && <span>{errors.city.message}</span>}</div>
                                                    </div>
                                                    <div className={css.address_details_box}>
                                                        <div className={css.address_details_box_first_block}>
                                                            <input type="text" {...register('street')}
                                                                   className={css.chosen_order_client_street_input}
                                                                   required={true}
                                                            />
                                                            <label>Вулиця*</label>
                                                            <div className={css.errors_span}>{errors.street &&
                                                                <span>{errors.street.message}</span>}</div>
                                                        </div>
                                                        <div className={css.address_details_box_second_block}>
                                                            <input type="text" {...register('houseNumber')}
                                                                   className={css.chosen_order_client_house_input}
                                                                   required={true}
                                                            />
                                                            <label>№ будинку*</label>
                                                            <div className={css.errors_span}>{errors.houseNumber &&
                                                                <span>{errors.houseNumber.message}</span>}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={errors.street || errors.houseNumber ? css.order_comment_bottom : css.order_comment}>
                                                        <input type="text"{...register('orderComment')}
                                                               className={css.chosen_order_client_order_comment_input}
                                                        />
                                                        <label>Коментар до замовлення</label>
                                                        <div className={css.errors_span}>{errors.orderComment &&
                                                            <span>{errors.orderComment.message}</span>}</div>
                                                    </div>
                                                    <div className={css.address_information_box}>
                                                        <div className={css.address_details_block_first}>
                                                            <input type="text" {...register('entrance')}
                                                                   className={css.chosen_order_client_entrance_input}
                                                                   required={true}
                                                            />
                                                            <label>Під'їзд</label>
                                                            <div className={css.errors_span}>{errors.entrance &&
                                                                <span>{errors.entrance.message}</span>}</div>
                                                        </div>
                                                        <div className={css.address_details_block_second}>
                                                            <input type="text"{...register('flour')}
                                                                   className={css.chosen_order_client_flour_input}
                                                                   required={true}
                                                            />
                                                            <label>Поверх</label>
                                                            <div className={css.errors_span}>{errors.flour &&
                                                                <span>{errors.flour.message}</span>}</div>
                                                        </div>
                                                        <div className={css.address_details_block_third}>
                                                            <input type="text" {...register('office')}
                                                                   className={css.chosen_order_client_office_input}
                                                                   required={true}
                                                            />
                                                            <label>Кв.\ офіс</label>
                                                            <div className={css.errors_span}>{errors.office &&
                                                                <span>{errors.office.message}</span>}</div>
                                                        </div>
                                                        <div className={css.address_details_block_four}>
                                                            <input type="text" {...register('intercom')}
                                                                   className={css.chosen_order_client_intercom_input}
                                                                   required={true}
                                                            />
                                                            <label>Домофон</label>
                                                            <div className={css.errors_span}>{errors.intercom &&
                                                                <span>{errors.intercom.message}</span>}</div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={errors.intercom || errors.office || errors.flour || errors.entrance
                                                            ?
                                                            css.address_comment_bottom
                                                            :
                                                            css.order_comment}>
                                                        <input type="text"{...register('addressComment')}
                                                               className={css.chosen_order_client_order_comment_input}
                                                        />
                                                        <label>Коментар до адреси</label>
                                                        <div className={css.errors_span}>{errors.addressComment &&
                                                            <span>{errors.addressComment.message}</span>}</div>
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
                                                        <div className={css.errors_span}>{errors.orderComment &&
                                                            <span>{errors.orderComment.message}</span>}</div>
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
