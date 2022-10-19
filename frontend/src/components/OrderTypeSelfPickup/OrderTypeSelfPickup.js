import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import ReactSelect from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

import { orderCardValidatorCustomerDeliver } from '../../validator';
import { getCityByName } from '../../store';
import { TokenType } from '../../constants';
import { customerOrderAction } from '../../store/customerOrderSlice';
import css from './OrderTypeSelfPickup.module.css';

const OrderTypeSelfPickup = () => {

    const dispatch = useDispatch();

    const city = localStorage.getItem('city');

    useEffect(() => {
        dispatch(getCityByName({ cityName: city }));
    }, [city]);

    const {
        filterCityAddress,
    } = useSelector(state => state['cityReducer']);
    const {
        user,
    } = useSelector(state => state['authReducer']);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: joiResolver(orderCardValidatorCustomerDeliver),
        mode: 'onTouched',
    });

    const getValueAddress = (value) => {
        return value ? filterCityAddress.find(address => address.value === value) : '';
    };
    const createUserOrderData = (data) => {
        dispatch(customerOrderAction.setUserData({ userData: data }));
    };

    return (
        <form onSubmit={handleSubmit(createUserOrderData)} className={css.self_pickup_container}>
            <div className={css.chosen_order_client_firstName_box}>
                <input type="text" {...register('firstName')}
                       className={css.chosen_order_client_firstName_input}
                       required={true}
                       value={user ? user.firstName : ''}
                />
                <label>Your name*</label>
                <div className={css.errors_span}>{errors.firstName && <span>{errors.firstName.message}</span>}</div>
            </div>
            <div className={css.chosen_order_client_firstName_box}>
                <input type="text" {...register('lastName')}
                       className={css.chosen_order_client_firstName_input}
                       required={true}
                       value={user ? user.lastName : ''}
                />
                <label>Your last name*</label>
                <div className={css.errors_span}>{errors.lastName && <span>{errors.lastName.message}</span>}</div>
            </div>
            <div className={css.chosen_order_client_email_box}>
                <input type="email" {...register('email')}
                       className={css.chosen_order_client_email_input}
                       required={true}
                       value={user ? user.email : ''}
                />
                <label>Email*</label>
                <div className={css.errors_span}>{errors.email && <span>{errors.email.message}</span>}</div>
            </div>
            {
                !localStorage.getItem(TokenType.ACCESS) && !localStorage.getItem(TokenType.REFRESH)
                    ?
                    <div className={css.checked_registration_block}>
                        You are not registered, <span className={css.move_to_login_box}>
                        <NavLink to={'/login'}
                                 className={css.move_to_login}>log
                        </NavLink>
                    </span>
                        in to use bonuses.
                    </div>
                    :
                    <></>
            }
            <div className={css.self_pickup_container_address_data_container}>
                <div className={css.address_self_pickup}>
                    <Controller
                        control={control}
                        name={'address'}
                        rules={{
                            required: 'Address is required'
                        }}
                        render={({
                            field: {
                                onChange,
                                value
                            },
                            fieldState: { error }
                        }) => (
                            <div className={css.selected_address_container}>
                                <ReactSelect
                                    placeholder={'Select an address...'}
                                    options={filterCityAddress}
                                    value={getValueAddress(value)}
                                    onChange={(newValue) => onChange(newValue.value)}
                                />
                                {
                                    error &&
                                    <div className={css.errors_span}>
                                        {errors.city &&
                                            <span>{errors.city.message}</span>
                                        }
                                    </div>}
                            </div>
                        )}
                    />
                </div>
                <div className={css.order_comment}>
                    <textarea type="text"{...register('orderComment')}
                           placeholder={'Comment on the order...'}
                           className={css.chosen_order_client_order_comment_input}
                    />
                    <div className={css.errors_span}>
                        {
                            errors.orderComment &&
                            <span>
                            {errors.orderComment.message}
                        </span>
                        }
                    </div>
                </div>
            </div>
            <div className={css.create_user_order_data_container}>
                <input type="submit" value={'Create'} className={css.create_user_order_button}/>
            </div>
        </form>
    );
};

export { OrderTypeSelfPickup };
