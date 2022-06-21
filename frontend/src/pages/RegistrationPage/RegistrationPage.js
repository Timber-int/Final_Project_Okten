import React from 'react';

import { Registration } from '../../components';
import css from './RegistrationPage.module.css';


const RegistrationPage = () => {
    return (
        <div className={css.registration_container}>
            <Registration/>
        </div>
    );
};

export { RegistrationPage };
