import React from 'react';

import css from './ThankYouForYourOrderPage.module.css';

const ThankYouForYourOrderPage = () => {
    return (
        <div className={css.thanks_container}>
            <div><img
                src="https://static.vecteezy.com/system/resources/previews/003/379/747/non_2x/the-mascot-of-the-pizza-holding-a-banner-that-says-thank-you-free-vector.jpg"
                alt="poster"/></div>
            <div className={css.thanks_text}>
                Thanks for your order. Bon appetit!!!
            </div>
        </div>
    );
};

export { ThankYouForYourOrderPage };
