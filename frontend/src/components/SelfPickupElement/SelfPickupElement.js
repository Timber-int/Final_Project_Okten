import React from 'react';
import css from './SelfPickupElement.module.css';
import { CustomerProduct } from '../CustomerProduct/CustomerProduct';

const SelfPickupElement = ({
    numElem,
    order
}) => {
    const {
        firstName,
        lastName,
        address,
        usedOrderType,
        products,
        totalOrderCount,
        createdAt,
    } = order;

    return (
        <div className={css.order_box}>
            <div className={css.order_block}>
                <div>{numElem}) <span className={css.element}>{usedOrderType}</span></div>
                <div>Client: {firstName} {lastName}</div>
                <div>Address: {address}</div>
                <div>Order price: <span className={css.element}>{totalOrderCount}</span> UAH</div>
                <div>Data: {createdAt.slice(0, 10)}</div>
                <div>Time: {createdAt.slice(11, 19)}</div>
            </div>
            <div className={css.products_container}>
                {
                    products.map(product => (<CustomerProduct key={product.id} product={product}/>))
                }
            </div>
        </div>
    );
};

export { SelfPickupElement };
