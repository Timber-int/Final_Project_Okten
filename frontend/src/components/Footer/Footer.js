import React from 'react';

import { UserChosenAddress } from '../UserChosenAddress/UserChosenAddress';
import css from './Footer.module.css';

const Footer = () => {
    return (
        <div className={css.footer_container}>
            <div className={css.block_first}>
                <img src="https://la.ua/ivano-frankivsk/wp-content/themes/lapiec/assets/frontend/img/logo-dark.svg" alt="photo"/>
            </div>
            <div className={css.block_second}>
                <UserChosenAddress/>
            </div>
            <div className={css.block_third}>

            </div>
        </div>
    );
};

export { Footer };
