import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';

import { userBodyForRegistrationValidator } from '../../validator';
import { registration } from '../../store';
import css from './Registration.module.css';
import { CONSTANTS } from '../../constants';

const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(userBodyForRegistrationValidator),
        mode: 'onTouched',
    });

    const dispatch = useDispatch();

    const {
        user,
        status,
    } = useSelector(state => state['authReducer']);

    const submit = (data) => {
        dispatch(registration({ registrationPayload: data }));
    };

    useEffect(() => {

    }, [user]);

    return (
        <form onSubmit={handleSubmit(submit)} className={css.registration_form}>
            <div className={css.errors_span}>{errors.firstName && <span>{errors.firstName.message}</span>}</div>
            <div className={css.input_box}><input className={css.registration_input} type="text" {...register('firstName')} required
                                                  placeholder={'firstName'}/></div>
            <div className={css.errors_span}>{errors.lastName && <span>{errors.lastName.message}</span>}</div>
            <div className={css.input_box}><input className={css.registration_input} type="text" {...register('lastName')} required
                                                  placeholder={'lastName'}/></div>
            <div className={css.errors_span}>{errors.email && <span>{errors.email.message}</span>}</div>
            <div className={css.input_box}><input className={css.registration_input} type="email" {...register('email')} required
                                                  placeholder={'email'}/></div>
            <div className={css.errors_span}>{errors.password && <span>{errors.password.message}</span>}</div>
            <div className={css.input_box}><input className={css.registration_input} type="text" {...register('password')} required
                                                  placeholder={'password'}/></div>
            <div className={css.input_box}><input className={
                status === CONSTANTS.LOADING
                    ? css.registration_button_disabled
                    : css.registration_button} type="submit" value={'Registration'}/>
            </div>
        </form>
    );
};

export { Registration };
