import React, { useState } from 'react';

import css from './SushiReadMoreReadLess.module.css';

const SushiReadMoreReadLess = () => {

    const [isReadMoreShown, setReadMoreShown] = useState(false);

    const toggleBtn = () => {
        setReadMoreShown(prevState => !prevState);
    };

    return (
        <div className={css.information_block}>
            <div>
                <div>
                    <h1 className={css.information_block_header}>Sushi delivery in Lviv</h1>
                    <h1>Sushi delivery in Lviv</h1>
                    <p>
                        Sushi is a traditional dish of Asian cuisine, loved by millions around the world. There are different recipes, but almost all
                        of them contain rice, which is supplemented with other ingredients – seafood, vegetables, fruits, seaweed. There’s a special
                        technology to cook sushi. If you are hungry, want to enjoy a delicious meal or your friends came to visit you, and you’d like
                        to treat them, we recommend ordering sushi in Lviv with fast delivery at LA PIEC.
                    </p>
                </div>
                {
                    isReadMoreShown
                        ?
                        <div>
                            <h1>What to bear in mind when choosing sushi?</h1>
                            <p>
                                We suggest paying attention to the filling. Choose the option that you like the most. There is also a difference in
                                cooking and presentation of meals. For example, if you like maki, which is wrapped in thin sheets of dried seaweed
                                “nori”, then choose the appropriate section on the website, see the assortment and place an order.
                            </p>
                            <p>For those who appreciate fish sushi, there is an opportunity to enjoy such popular recipes as “Philadelphia” or
                                “California” with salmon, tuna, or eel. The menu also includes options of such sushi with shrimp. If you prefer hot
                                rolls, we also have such dishes in our menu – called “Banzai” with tuna and/or salmon.
                            </p>

                            <p>These days, this beverage has become a popular pizza pairing around the world. Even the young generation of Italians
                                finds
                                more benefits in beer compared with wine. This tradition also has found support among Germans too since beer is their
                                traditional drink. That being said, the most popular drinks in the Netherlands and France are juices and
                                Coca-cola.
                            </p>

                            <p>For parties and special occasions, when you need to treat many guests, we recommend ordering sets. Sushi sets differ in
                                composition and may include rolls with seafood, vegetable filling, and mango. The largest one is the “Super” set,
                                which weighs 2685 grams and includes several types of sushi.
                            </p>

                            <h1>Why choose us?</h1>

                            <p>Clients appreciate us for the following advantages:</p>
                            <ul>
                                <li>a large menu;</li>
                                <li>delicious meals, the freshest ingredients;</li>
                                <li>easy ordering and payment;</li>
                                <li>fast delivery up to 29/59 minutes even to remote areas of the city.</li>
                            </ul>

                            <p>Couriers working at LA PIEC are experienced professionals who know Lviv well and won’t be late. Each order is processed
                                without delay, and within a short period of time you receive your sushi in a neat package, along with the following
                                addition:
                            </p>

                            <ul>
                                <li>soy sauce;</li>
                                <li>wasabi;</li>
                                <li>pickled ginger;</li>
                                <li>sticks (you can choose educational ones as well).</li>
                            </ul>
                            <p>Add-ons are free. If you need more sauces, wasabi or ginger, please specify when creating your order.</p>
                            <h1>How to order sushi delivery in Lviv</h1>
                            <p>To do this, it is enough to follow the next steps:</p>

                            <p><span className={css.number}>#1</span> Open the page of our sushi menu.
                            </p>
                            <p><span className={css.number}>#2</span> Choose the options you like. When you click on the “Order” button, the dishes are
                                automatically added to the
                                “Basket”.
                            </p>
                            <p><span className={css.number}>#3</span> Go to the “Basket” and complete the order, specifying the delivery address.
                            </p>

                            <p>When placing an order, you should choose the delivery method (by our courier, self-delivery, in advance). Then enter
                                the
                                recipient’s name and phone number. It is also necessary to specify the address in Lviv (street, house, office or
                                apartment
                                number, entrance, floor, and entry code, if available).</p>

                            <p>Choose the payment method that is most convenient for you – by card online or in cash/by card to a courier. If you pay
                                by
                                cash and will need change, please, indicate the bill with which you’ll pay.
                            </p>

                            <h1>Sushi delivery in Lviv</h1>
                            <p>The order is accepted after confirmation by the operator – we’ll call you or send a Viber or SMS message. You won’t
                                have
                                to wait long for delicious and fresh sushi. If the address is in the “green zone” of Lviv, delivery takes place within
                                29
                                minutes. In the “yellow zone”, which includes remote areas of the city, delivery can take up to 59 minutes.</p>

                            <p>Prices for sushi in Lviv depend on the recipe and weight. There are descriptions of each meal with weight indicated, a
                                list of ingredients, and cost in the menu. Choose your favorite option – rolls, maki, hot rolls, “Philadelphia” or a
                                set
                                and place an order without loss of time!</p>
                        </div>
                        :
                        <></>
                }

            </div>
            <div onClick={toggleBtn} className={css.information_block_button}>{isReadMoreShown ? 'Hide' : 'Read more...'}</div>
        </div>
    );
};

export { SushiReadMoreReadLess };
