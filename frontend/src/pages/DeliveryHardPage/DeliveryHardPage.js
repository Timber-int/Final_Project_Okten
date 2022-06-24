import React from 'react';
import { useLocation } from 'react-router-dom';

import { baseURL } from '../../config';
import css from './DeliveryHardPage.module.css';

const DeliveryHardPage = () => {

    const { state } = useLocation();

    const {
        text,
        pathUrl
    } = state;

    return (
        <div className={css.hard_page_content}>
            <div className={css.image_content}><img className={css.image} src={pathUrl} alt={pathUrl}/></div>
            <div className={css.text}>{text}</div>
        </div>
    );
};

export { DeliveryHardPage };