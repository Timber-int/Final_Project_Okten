import React from 'react';
import { NavLink } from 'react-router-dom';

import { Registration } from '../../components';
import { useSelector } from 'react-redux';
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {

    const {
        serverErrors,
    } = useSelector(state => state['authReducer']);

    return (
        <div className={css.registration_container}>
            <div className={css.server_errors_container}>{serverErrors}</div>
            <div className={css.registration_form}>Registration form</div>
            <Registration/>
            <NavLink to={'/login'} className={css.move_to_login}>I already have an account</NavLink>
        </div>
    );
};

export { RegistrationPage };
