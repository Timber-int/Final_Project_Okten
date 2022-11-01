import React from 'react';

import { ChangePassword } from '../../components';
import { useSelector } from 'react-redux';
import css from './ChangePasswordPage.module.css';

const ChangePasswordPage = () => {

    const {
        serverErrors,
    } = useSelector(state => state['authReducer']);

    return (
        <div className={css.change_password_container}>
            <div className={css.change_password_text}>
                Pleace enter your email
            </div>
            <div className={css.server_errors_container}>{serverErrors}</div>
            <ChangePassword/>
        </div>
    );
};

export { ChangePasswordPage };
