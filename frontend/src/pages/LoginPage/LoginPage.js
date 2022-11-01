import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login } from '../../components';
import css from './LoginPage.module.css';

const LoginPage = () => {

    const {
        serverErrors,
    } = useSelector(state => state['authReducer']);

    return (
        <div className={css.login_container}>
            <div className={css.server_errors_container}>{serverErrors}</div>
            <div className={css.login_form}>Login form</div>
            <Login/>
            <NavLink to={'/changePassword'} className={css.move_to_change_password}>I forgot my password</NavLink>
        </div>
    );
};

export { LoginPage };
