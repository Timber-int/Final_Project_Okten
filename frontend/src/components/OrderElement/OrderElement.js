import React from 'react';

import css from './OrderElement.module.css';

const OrderElement = ({
    numElem,
    order
}) => {
    const {
        firstName,
        lastName,
        city,
        street,
        usedOrderType,
        totalOrderCount,
        createdAt
    } = order;
    return (
        <div className={css.order_box}>
            <div className={css.order_block}>
                <div>{numElem}) <span className={css.element}>{usedOrderType}</span></div>
                <div>Client: {firstName} {lastName}</div>
                <div>City: {city}</div>
                <div>Street: {street}</div>
                <div>Order price: <span className={css.element}>{totalOrderCount}</span> UAH</div>
                <div>Data: {createdAt.slice(0, 10)}</div>
                <div>Time: {createdAt.slice(11, 19)}</div>
            </div>
            <div className={css.products_block}>
                sdfsdf
            </div>
        </div>
    );
};

export { OrderElement };
