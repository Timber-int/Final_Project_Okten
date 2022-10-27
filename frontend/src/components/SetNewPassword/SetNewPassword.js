import React from 'react';

import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { useDispatch, useSelector } from 'react-redux';
import { setNewUserPasswordValidator } from '../../validator';
import { useNavigate } from 'react-router-dom';
import { CONSTANTS } from '../../constants';
import { setNewPassword } from '../../store';
import css from './SetNewPassword.module.css';

const SetNewPassword = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(setNewUserPasswordValidator),
        mode: 'onTouched',
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        status,
    } = useSelector(state => state['authReducer']);

    const submit = (data) => {
        dispatch(setNewPassword({ passwordData: data.password }));
        navigate('/login', { replace: true });
    };

    return (
        <form onSubmit={handleSubmit(submit)} className={css.change_password_form}>
            <div className={css.errors_span}>{errors.password && <span>{errors.password.message}</span>}</div>
            <div className={css.change_box}>
                <input className={css.change_input}
                       type="password" {...register('password')}
                       required
                       placeholder={'password'}
                />
            </div>
            <div className={css.errors_span}>{errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}</div>
            <div className={css.change_box}>
                <input className={css.change_input}
                       type="confirmPassword" {...register('confirmPassword')}
                       required
                       placeholder={'confirm password'}
                />
            </div>
            <div className={css.change_box}><input className={
                status === CONSTANTS.LOADING
                    ? css.change_button_disabled
                    : css.change_button} type="submit" value={'Confirm'}/>
            </div>
        </form>
    );
};

export { SetNewPassword };
