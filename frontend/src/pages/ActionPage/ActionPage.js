import React from 'react';
import { NavLink } from 'react-router-dom';

import { slides } from '../../constants';
import css from './ActionPage.module.css';

const ActionPage = () => {

    const city = localStorage.getItem('city');

    return (
        <div className={css.action_container}>
            <div className={css.action_header}>
                Special offers in {city ? city : ''}
            </div>
            <div className={css.action_box}>
                {
                    slides.map((slide, index) => (
                        <div key={index} className={css.slide_box}>
                            <div className={css.action_image_box}><img src={slide.image} alt={'action'}/></div>
                            <NavLink to={'/deliveryHardPage/' + slide.id} state={slide} className={css.action_text}><span>Read more</span></NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export { ActionPage };
