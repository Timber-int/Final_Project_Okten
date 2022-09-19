import React, { useState } from 'react';
import css from './BurgerReadMoreReadLess.module.css';

const BurgerReadMoreReadLess = () => {

    const [isReadMoreShown, setReadMoreShown] = useState(false);

    const toggleBtn = () => {
        setReadMoreShown(prevState => !prevState);
    };

    return (
        <div className={css.information_block}>
            <div>
                <div>
                    <h1 className={css.category_name}>Burgers</h1>
                    <h1 className={css.information_block_header}>Burgers delivery in Lviv</h1>
                    <p>The first burger appeared more than a century ago and no wonder that a bap with cutlet, vegetables, cheese and sauces is a
                        favourite dish for many people now. Burgers are getting more and more popular every day. The best chefs are competing in the
                        skill
                        of making burgers, turning them into true culinary art.</p>

                    <p>And if you are among those who truly love this kind of food, then no doubt that burger delivery in Lviv will come in handy. La
                        Piec is the best food delivery service in the city with a real professional service.</p>
                </div>
                {
                    isReadMoreShown
                        ?
                        <div>
                            <h1>Burger + delivery in the city of Lviv</h1>
                            <p>Have you ever heard that a burger has its own place in the legendary Guinness Book of Records? That`s right! It is a
                                10,000-kcal burger with four cutlets, twenty pieces of bacon, sauces, eight servings of cheese and twenty pieces of
                                onion.
                                Even though you won`t find such a burger in Lviv, the one you will is going to be no less tasty or nutritious. The
                                best
                                chefs are making the best burgers, using only natural and best-quality ingredients.
                            </p>

                            <p>If you are hungry, want to have an office meeting or a friendly party and need food, the best idea is to order burgers.
                                And now you do not need to stand in line for a tasty snack, there is a burger delivery in Lviv. Just choose the dish
                                you
                                like and place your order on our user-friendly website. Couriers will deliver the packages so quickly that burgers
                                won`t
                                have the chance to lose their incredible taste and aroma.
                            </p>
                            <h1>What to consider when choosing a burger?</h1>
                            <p>When choosing burgers with delivery in Lviv, consider the followings:</p>
                            <ul>
                                <li>Composition. Look at what ingredients are added to a burger, what meat is used to make a juicy cutlet, as well as
                                    what cheese, vegetables and sauces, are used.
                                </li>
                                <li>Size. Will you be able to eat one serving, how many burgers do you need to feed yourself and your friends;</li>
                                <li>Side dish. It is common to order burgers in Lviv together with a portion of French fries or some additional
                                    sauces.
                                </li>
                            </ul>
                            <p>If it is difficult for you to make a choice on your own, call us and clarify all the details.</p>

                            <h1>How to order burgers delivery in Lviv?</h1>
                            <p>LA PIEC couriers in Lviv bring burgers within 29 minutes after the confirmation of your order.</p>

                            <p>To enjoy a bap with cutlet all you have is to take a few simple steps:</p>
                            <ul>
                                <li>choose a burger that you like</li>
                                <li>click the “Order” button</li>
                                <li>specify the exact address of the delivery</li>
                                <li>choose how to pay (cash, courier by card, online)</li>
                            </ul>
                            <p>Keep in mind that you may order the delivery to Lviv`s districts if your order price is higher than 200 hryvnias.</p>
                            <h1>Why choose us?</h1>
                            <p>Fresh, flavoured, nutritious burgers with delivery in Lviv. This is LA PIEC! We offer truly delicious burgers with
                                different fillings. Why choose us? Here are some advantages:</p>
                            <ul>
                                <li>the opportunity to choose a sandwich with the composition that you like the most;</li>
                                <li>proven quality and taste;</li>
                                <li>experienced fast couriers who know the city well and do not linger on the road.</li>
                            </ul>
                        </div>
                        :
                        <></>
                }
            </div>
            <div onClick={toggleBtn} className={css.information_block_button}>{isReadMoreShown ? 'Hide' : 'Read more...'}</div>
        </div>
    );
};

export { BurgerReadMoreReadLess };
