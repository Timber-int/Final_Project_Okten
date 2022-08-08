import React from 'react';

import css from './AboutUsPage.module.css';

const AboutUsPage = () => {
    return (
        <div className={css.container}>
            <div className={css.header}>
                About us
            </div>
            <div className={css.text_content}>
                <div>
                    New pizza delivery service La Piec is not just another business. We have several advantages over competitors, which we will
                    describe in more detail below.
                </div>
                <div>Firstly, the pizza delivery in Ivano-Frankivsk “La Piec” uses only the freshest and most delicious products. This is not just a
                    marketing line. We cooperate with Ukrainian producers and suppliers, in particular, that is why your pizza is always baked from
                    organic products. Everything, from vegetables to different types of cheese, is genuine, environmentally friendly and cultivated on
                    Ukrainian soil.
                </div>
                <div>Secondly, we clearly indicate pizza delivery time. Fast delivery is our second advantage and reputation among our customers and
                    competitors. We divide Ivano-Frankivsk into two zones – Green and Yellow. For each one there is the specific delivery time and if
                    our courier is late – you get a free pizza for your next order. You can find the zoning map of Ivano-Frankivsk on the “Delivery
                    and Payment” page.
                </div>
                <div>Thirdly, we cook not an ordinary pizza. Our pizza is a wood-fired pizza in Ivano-Frankivsk. Wood-fired pizza is an extraordinary
                    taste of the dough and tender melted cheese. It almost impossible to describe its taste with words, you should simply taste it.
                </div>
                <div>“La Piec” can go on describing its benefits for a long time, but you came here because you want a hot pizza, aren’t you? Wouldn’t
                    it be better to just try it and be full, than to read all this over and over again, while being hungry?
                </div>
            </div>
        </div>
    );
};

export { AboutUsPage };
