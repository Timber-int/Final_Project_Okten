import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { SetNewPassword } from '../../components';
import { authAction } from '../../store';
import css from './SetNewPasswordPage.module.css';

const SetNewPasswordPage = () => {

    const {
        serverErrors,
    } = useSelector(state => state['authReducer']);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authAction.deleteChangePasswordUserData());
    }, []);

    return (
        <div className={css.change_password_container}>
            <div className={css.change_password_text}>
                Pleace enter your new password
            </div>
            <div className={css.server_errors_container}>{serverErrors}</div>
            <SetNewPassword/>
        </div>
    );
};

export { SetNewPasswordPage };
