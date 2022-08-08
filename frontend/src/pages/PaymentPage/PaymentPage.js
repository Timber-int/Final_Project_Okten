import React from 'react';

import css from './PaymentPage.module.css';

const PaymentPage = () => {
    return (
        <div className={css.container}>
            <div className={css.header}>
                Payment method
            </div>
            <div className={css.content_payment}>
                <div className={css.block}>
                    <div className={css.image_box}><img className={css.image_payment} src="https://la.ua/ivano-frankivsk/wp-content/uploads/sites/4/2021/06/money_1.svg" alt="valet"/></div>
                    <div className={css.text_main_head}>Payment in cash</div>
                    <div className={css.text_main}>Pay for your favorite LA П’ЄЦ pizza in cash upon receipt.</div>
                </div>
                <div className={css.block}>
                    <div className={css.image_box}><img className={css.image_payment} src="https://la.ua/ivano-frankivsk/wp-content/uploads/sites/4/2021/06/money_2.svg" alt="card"/></div>
                    <div className={css.text_main_head}>Payment online through the LiqPay service</div>
                    <div className={css.text_main}>Pay for your favorite LA PIEC pizza online through the LiqPay service or by card upon receipt.</div>
                </div>
            </div>
            <div className={css.text_content}>
                <div>** The order is considered received from the moment of its processing by a call center operator during a call to the client.
                </div>
                <div>Now, let’s talk about the convenience of payment. We trust our clients, that is why payment with cash takes place upon the
                    delivery. Credit card or cash — the choice is yours. Pizza delivery service “La Piec” tries to demonstrate maximum loyalty towards
                    the customers. That is why you can pay with a credit card. Simply indicate that you’d like to pay with a card while placing the
                    order or let the operator know by the phone. In fact, you must agree that the cash is becoming less common and we use credit cards
                    more often when paying for everything, even for the ride in public transport.
                </div>
                <div>Pizza delivery “La Piec” is the most up to date, most comfortable, and most delicious delivery service in Ivano-Frankivsk. We
                    partner with Ukrainian producers, combine professionalism and unusual recipes, and you get a tasty and hot pizza at any time. Yes,
                    we work for you every day, only choose the pizza and place an order! Besides, you can choose extra ingredients for any pizza —
                    vegetables, cheese, and many other options. Try our delivery service and you’ll always be choosing us!.
                </div>
            </div>
        </div>
    );
};

export { PaymentPage };
