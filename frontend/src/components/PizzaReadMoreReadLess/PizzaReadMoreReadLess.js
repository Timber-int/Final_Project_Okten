import React, { useState } from 'react';

import css from './PizzaReadMoreReadLess.module.css';

const PizzaReadMoreReadLess = () => {

    const [isReadMoreShown, setReadMoreShown] = useState(false);

    const toggleBtn = () => {
        setReadMoreShown(prevState => !prevState);
    };

    return (
        <div className={css.information_block}>
            <div>
                <div>
                    <h1 className={css.information_block_header}>Wood-fired pizza La Piec in Lviv</h1>
                    <p>
                        *The photos presented on the website are for informative purposes only and may look different from the actual
                        products.
                    </p>

                    <p>
                        **The order is considered received from the moment of its processing by a call center operator during a call to the
                        client.
                    </p>

                    <p>
                        Our delivery service is convenient and simple. Choose your favorite pizza and make an order, confirm it with our
                        manager
                        and wait for the delivery of the most delicious wood-fired pizza.
                    </p>


                    <p>
                        “La Piec” Pizza is cooked specifically for each order, so you can rest assured knowing that the quality of your
                        dish will
                        be the best.
                    </p>
                </div>
                {
                    isReadMoreShown
                        ?
                        <div>
                            <p>
                                We are the fastest pizza delivery service. We make sure that you receive your wood-fired pizza order fast and on
                                time. The
                                appearance of dishes may vary from the one presented in the photos.
                            </p>
                            <p>The descriptions presented in our menu are for informative purposes only.</p>

                            <p>Pizza is surely one of the favorite dishes of many people around the world. Who could possibly say no to this crispy
                                crust, melted cheese, and incredible aroma? This dish is loved by everyone, both adults and kids. So if you want to
                                enjoy
                                the tastiest wood-fired pizza, order La Piec delivery in Lviv.
                            </p>
                            <p>
                                Our wood-fired pizza is a tiny part of Italy in your home, it’s a unique and special taste of traditional pizza that
                                will
                                definitely impress you. Aromatic pizza on a thin crust cooked in accordance with the best classic recipes by
                                professional
                                pizzaiolo — here’s what sets us apart from other pizza delivery services. We took the best from the wisdom of
                                centuries
                                and created an ideal pizza affordable to everybody!
                            </p>
                            <h1> Free pizza delivery</h1>
                            <p>To make a pizza cooked by our pizzaiolo hot and tasty as if it has just been taken out of the oven, we have divided
                                Lviv
                                into two delivery zones and have set the specific time, during which our courier must deliver an order to you. For
                                example, if you live in a city center, you’ll receive your order in 29 minutes. Hot and tasty pizza in 29 minutes
                                only,
                                sounds amazing, isn’t it?
                            </p>
                            <p> We love our clients and value your time, so if for some reason you won’t get your pizza on time, you’ll get a
                                pleasant
                                bonus from us.
                            </p>
                            <p> We are a modern company that takes care of the comfort of our clients. You can pay for the pizza delivery in any
                                convenient way for you — both in cash or by a credit card when receiving your order.
                            </p>
                            <h1>Order pizza in Lviv cheap</h1>
                            <p> We have a wide choice of pizzas, so everyone will be able to find something for their own taste. Are you a
                                traditional
                                Italian pizza lover? Then Capricciosa, Carbonara, or Quattro Formaggi is exactly what you need. Or maybe you like some
                                spiciness in pizza? Then choose Diabola — a favorable combination of chili and signature sauce will definitely impress
                                you. Of course, not everybody likes standard sets, and we’ve also got a solution for you — combine your own wood-fired
                                pizza, we have a wide choice of ingredients that will satisfy the wildest whims of any gourmand.
                            </p>

                            <p> We use fresh ingredients, cooperate with the best Ukrainian producers, combine professionalism and the best recipes
                                so
                                that you could enjoy the most delicious wood-fired pizza in the end. Don’t hesitate, order wood-fired pizza delivery
                                “La
                                Piec”!
                            </p>
                        </div>
                        :
                        <></>
                }

            </div>
            <div onClick={toggleBtn} className={css.information_block_button}>{isReadMoreShown ? 'Hide' : 'Read more...'}</div>
        </div>
    );
};

export { PizzaReadMoreReadLess };
