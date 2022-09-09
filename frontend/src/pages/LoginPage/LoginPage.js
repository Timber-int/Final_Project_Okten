import React from 'react';

import { useSelector } from 'react-redux';
import { Login } from '../../components';
import { CONSTANTS } from '../../constants';
import css from './LoginPage.module.css';

const LoginPage = () => {

    const {
        serverErrors,
        status
    } = useSelector(state => state['authReducer']);

    return (
        <div className={css.login_container}>
            <div className={css.server_errors_container}>{serverErrors}</div>
            {status === CONSTANTS.LOADING ? <div className={css.loading_container}>Loading...</div> : <></>}
            <Login/>
        </div>
    );
};

export { LoginPage };
