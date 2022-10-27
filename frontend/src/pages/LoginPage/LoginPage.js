import React from 'react';

import { useSelector } from 'react-redux';
import { Login } from '../../components';
import { CONSTANTS } from '../../constants';
import css from './LoginPage.module.css';
import { NavLink } from 'react-router-dom';

const LoginPage = () => {

    const {
        serverErrors,
        status
    } = useSelector(state => state['authReducer']);

    return (
        <div className={css.login_container}>
            <div className={css.server_errors_container}>{serverErrors}</div>
            <div className={css.login_form}>Login form</div>
            {status === CONSTANTS.LOADING ? <div className={css.loading_container}>Loading...</div> : <></>}
            <Login/>
            <NavLink to={'/changePassword'} className={css.move_to_change_password}>I forgot my password</NavLink>
        </div>
    );
};

export { LoginPage };
