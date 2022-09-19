import React, { useState } from 'react';

import css from './DrinkReadMoreReadLess.module.css';

const DrinkReadMoreReadLess = () => {

    const [isReadMoreShown, setReadMoreShown] = useState(false);

    const toggleBtn = () => {
        setReadMoreShown(prevState => !prevState);
    };

    return (
        <div className={css.information_block}>
            <div>
                <div>
                    <h1 className={css.information_block_header}>Order drinks with pizza</h1>
                    <p>
                        In order to feel the taste of the dish to its fullest, it is desirable to choose the right drink. Pizza is not an exception,
                        although it’s a common subject of controversy among gourmands. What should you drink with this dish? The answer will depend on
                        the
                        person’s gastronomic preferences, regional peculiarities, and tastes.
                    </p>

                    <h1>Drinks delivery in Lviv</h1>

                    <p>
                        Let’s recall how it all started in the first place. Pizza the way we know it now first appeared at the tables of noble
                        Italians around the end of 16th century. Without a doubt, the most popular drink in Italy is and has always been wine. People
                        in this country consider this drink the best pairing for pizza. Most often, they serve red wine, less often — white. As an
                        alternative, you can choose regular or mineral water. It’s commonly believed that it cannot interrupt the real taste of an
                        exquisite dish.
                    </p>
                </div>
                {
                    isReadMoreShown
                        ?
                        <div>
                            <p>
                                However, across the borders, neither wine nor water has become popular additions. For example, in the Czech Republic,
                                it’s a custom to wash the food down with becherovka. And in the United States, this dish has long gone far beyond the
                                restaurant tables. There emerged a special delivery of many corporate get-togethers and meetings with friends. There
                                was no longer any talk about graceful glasses of wine as it was replaced by beer.
                            </p>
                            <p>The dishes popular in America are spicy and filled with salami or other meat toppings. They go very well with beer, so
                                the
                                choice was obvious to some extent. It emphasizes the spices and makes the dish taste pretty zesty.</p>

                            <p>These days, this beverage has become a popular pizza pairing around the world. Even the young generation of Italians
                                finds
                                more benefits in beer compared with wine. This tradition also has found support among Germans too since beer is their
                                traditional drink. That being said, the most popular drinks in the Netherlands and France are juices and
                                Coca-cola.</p>

                            <p>Such unusual combinations are also available here in Ukraine. Pizza delivery “La Piec” in Lviv offers not only the
                                delivery of aromatic pizza cooked in the best Italian traditions but also the drinks of your choice.</p>

                            <p>Pizza by “La Piec” will have an amazing taste since pizzeria does their best to ensure that the dishes preserve their
                                taste and incredible aroma for as long as possible. That is why the delivery is made in special thermos bags, due to
                                which
                                a pizza will taste as if it was just taken out of the oven. Do you want to try it already? Place an order on “La Piec”
                                website and enjoy freshly cooked pizza!</p>
                        </div>
                        :
                        <></>
                }

            </div>
            <div onClick={toggleBtn} className={css.information_block_button}>{isReadMoreShown ? 'Hide' : 'Read more...'}</div>
        </div>
    );
};

export { DrinkReadMoreReadLess };
