import React, { useState } from 'react';

import { HiOutlineArrowCircleUp } from 'react-icons/hi';
import { HiOutlineArrowCircleDown } from 'react-icons/hi';

import css from './AccordionQuestion.module.css';

const AccordionQuestion = () => {

    const data = [
        {
            emo: '💰',
            question: 'Is delivery free?',
            answer: 'Shipping is Free. The minimum delivery amount is UAH 200 or UAH 300, depending on the delivery address.'
        },
        {
            emo: '💳',
            question: 'Is it possible to pay by card?',
            answer: 'So! You can pay by card on the website, or upon receipt of orders.'
        },
        {
            emo: '🚀',
            question: 'How long to wait for delivery?',
            answer: 'Delivery to the green zone of Ivano-Frankivsk - up to 29 minutes ' +
                '(from 10:00 AM to 11:00 PM, at another time 59 minutes).' +
                ' Delivery to the yellow zone - up to 59 minutes.'
        },
        {
            emo: '⏰',
            question: 'What is your work schedule?',
            answer: 'We work from 10:00 AM to 09:30 PM.'
        },
        {
            emo: '🍕',
            question: 'In which cities does LA PIEC pizza delivery work?',
            answer: 'We work in Lviv, Vinnytsia, Ivano-Frankivsk, Kharkiv, Stryi, Khmelnytsky, Rivne, Chernivtsi, Cherkasy and Drohobych.'
        },
    ];

    const [selected, setSelected] = useState(null);

    const toggle = (item) => {
        if (selected === item) {
            return setSelected(null);
        }

        setSelected(item);
    };

    return (
        <div className={css.accordion}>
            {
                data.map((item, index) => (
                    <div className={css.item} key={index}>
                        <div className={css.title} onClick={() => toggle(index)}>
                            <h1>{item.emo} {item.question}</h1>
                            <span>{selected === index ? <HiOutlineArrowCircleUp className={css.arrow}/> : <HiOutlineArrowCircleDown className={css.arrow}/>}</span>
                        </div>
                        <div className={selected === index ? css.content_show : css.content}>
                            {item.answer}
                        </div>
                        <div className={css.separator}/>
                    </div>
                ))
            }
        </div>
    );
};

export { AccordionQuestion };
