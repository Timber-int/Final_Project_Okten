import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useDispatch, useSelector } from 'react-redux';

import { userBodyForLoginValidator } from '../../validator';
import { CONSTANTS } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store';
import css from './Login.module.css';

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(userBodyForLoginValidator),
        mode: 'onTouched',
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        status,
    } = useSelector(state => state['authReducer']);

    const submit = async (data) => {
        delete data['confirmPassword'];
        await dispatch(login({ loginPayload: data }));
        await navigate('/customerPanel', { replace: true });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={css.login_form}>
            <div className={css.errors_span}>{errors.email && <span>{errors.email.message}</span>}</div>
            <div className={css.input_box}><input className={css.login_input} type="email" {...register('email')} required
                                                  placeholder={'email'}/>
            </div>
            <div className={css.errors_span}>{errors.password && <span>{errors.password.message}</span>}</div>
            <div className={css.input_box}><input className={css.login_input} type="text" {...register('password')} required
                                                  placeholder={'password'}/>
            </div>
            <div className={css.errors_span}>{errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}</div>
            <div className={css.input_box}><input className={css.login_input} type="text" {...register('confirmPassword')} required
                                                  placeholder={'confirmPassword'}/>
            </div>
            <div className={css.input_box}><input className={
                status === CONSTANTS.LOADING
                    ? css.login_button_disabled
                    : css.login_button} type="submit" value={'Login'}/>
            </div>
        </form>
    );
};

export { Login };
