import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CONSTANTS } from '../../constants';
import css from './SetNewPasswordPage.module.css';
import { authAction } from '../../store';
import { SetNewPassword } from '../../components';

const SetNewPasswordPage = () => {

    const {
        serverErrors,
        status,
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
            {status === CONSTANTS.LOADING ? <div className={css.loading_container}>Loading...</div> : <></>}
            <SetNewPassword/>
        </div>
    );
};

export { SetNewPasswordPage };
