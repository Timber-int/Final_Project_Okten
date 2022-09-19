import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';

import { orderCardValidatorShopDeliver } from '../../validator';
import { TokenType } from '../../constants';
import css from './OrderTypeShopDelivery.module.css';
import { customerOrderAction } from '../../store/customerOrderSlice';

const OrderTypeShopDelivery = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: joiResolver(orderCardValidatorShopDeliver),
        mode: 'onTouched',
    });

    const dispatch = useDispatch();

    const { user } = useSelector(state => state['authReducer']);

    const createUserOrderData = (data) => {
        dispatch(customerOrderAction.setUserData({ userData: data }));
    };
    return (
        <form className={css.delivery_container} onSubmit={handleSubmit(createUserOrderData)}>
            <div className={css.chosen_order_client_firstName_box}>
                <input type="text" {...register('firstName')}
                       className={css.chosen_order_client_firstName_input}
                       required={true}
                       value={user ? user.firstName : ''}
                />
                <label>Ваше ім`я*</label>
                <div className={css.errors_span}>{errors.firstName && <span>{errors.firstName.message}</span>}</div>
            </div>
            <div className={css.chosen_order_client_firstName_box}>
                <input type="text" {...register('lastName')}
                       className={css.chosen_order_client_firstName_input}
                       required={true}
                       value={user ? user.lastName : ''}
                />
                <label>Ваше прізвище*</label>
                <div className={css.errors_span}>{errors.lastName && <span>{errors.lastName.message}</span>}</div>
            </div>
            <div className={css.chosen_order_client_email_box}>
                <input type="email" {...register('email')}
                       className={css.chosen_order_client_email_input}
                       required={true}
                       value={user ? user.email : ''}
                />
                <label>Емейл*</label>
                <div className={css.errors_span}>{errors.email && <span>{errors.email.message}</span>}</div>
            </div>
            <div className={css.chosen_order_client_city_box}>
                <input type="text" {...register('city')}
                       className={css.chosen_order_client_city_input}
                       required={true}
                       value={localStorage.getItem('city') ? localStorage.getItem('city') : ''}
                />
                <label>City*</label>
                <div className={css.errors_span}>{errors.city && <span>{errors.city.message}</span>}</div>
            </div>
            {
                !localStorage.getItem(TokenType.ACCESS) && !localStorage.getItem(TokenType.REFRESH)
                    ?
                    <div className={css.checked_registration_block}>
                        Ви не зареєстровані, <span className={css.move_to_login_box}>
                        <NavLink to={'/login'}
                                 className={css.move_to_login}>увійдіть
                        </NavLink>
                    </span>
                        щоб
                        використати бонуси.
                    </div>
                    :
                    <></>
            }
            <div className={css.address_details_box}>
                <div className={css.address_details_box_first_block}>
                    <input type="text" {...register('street')}
                           className={css.chosen_order_client_street_input}
                           required={true}
                    />
                    <label>Вулиця*</label>
                    <div className={css.errors_span}>{errors.street &&
                        <span>{errors.street.message}</span>}
                    </div>
                </div>
                <div className={css.address_details_box_second_block}>
                    <input type="text" {...register('houseNumber')}
                           className={css.chosen_order_client_house_input}
                           required={true}
                    />
                    <label>№ будинку*</label>
                    <div className={css.errors_span}>{errors.houseNumber &&
                        <span>{errors.houseNumber.message}</span>}
                    </div>
                </div>
            </div>
            <div className={errors.houseNumber || errors.street ? css.order_comment_button : css.order_comment}>
                <input type="text"{...register('orderComment')}
                       placeholder={'Коментар до замовлення...'}
                       className={css.order_comment_input}
                />
                <div className={css.errors_span}>{errors.orderComment &&
                    <span>{errors.orderComment.message}</span>}
                </div>
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
                    css.address_comment}>
                <input type="text"{...register('addressComment')}
                       placeholder={'Коментар до адреси...'}
                       className={css.chosen_address_comment_input}
                />
                <div className={css.errors_span}>{errors.addressComment &&
                    <span>{errors.addressComment.message}</span>}
                </div>
            </div>
            <div className={css.map_container}>

            </div>
            <div className={css.create_user_order_data_container}>
                <input type="submit" value={'Create'} className={css.create_user_order_button}/>
            </div>
        </form>
    );
};

export { OrderTypeShopDelivery };
