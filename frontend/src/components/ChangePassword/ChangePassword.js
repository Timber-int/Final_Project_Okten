import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi/dist/joi';
import { changePasswordUserEmailValidator } from '../../validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../../constants';
import { changePassword } from '../../store';
import css from './ChangePassword.module.css';

const ChangePassword = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(changePasswordUserEmailValidator),
        mode: 'onTouched',
    });

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        status,
        changePasswordUserData
    } = useSelector(state => state['authReducer']);

    const submit = (data) => {
        dispatch(changePassword({ emailData: data }));
    };

    useEffect(() => {
        if (status === CONSTANTS.RESOLVED && changePasswordUserData) {
            navigate('/setNewPassword', { replace: true });
        }
    }, [status]);

    return (
        <form onSubmit={handleSubmit(submit)} className={css.change_password_form}>
            <div className={css.errors_span}>{errors.email && <span>{errors.email.message}</span>}</div>
            <div className={css.change_box}><input className={css.change_input} type="email" {...register('email')} required
                                                   placeholder={'email'}/></div>
            <div className={css.change_box}><input className={
                status === CONSTANTS.LOADING
                    ? css.change_button_disabled
                    : css.change_button} type="submit" value={'Confirm'}/>
            </div>
        </form>
    );
};

export { ChangePassword };
