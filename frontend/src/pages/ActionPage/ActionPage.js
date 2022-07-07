import React from 'react';

import css from './ActionPage.module.css';
import { slides } from '../../constants';
import { NavLink } from 'react-router-dom';

const ActionPage = () => {
    return (
        <div className={css.action_container}>
            <div className={css.action_header}>
                Акції
            </div>
            <div className={css.action_box}>
                {
                    slides.map((slide,index) => (
                        <div key={index} className={css.slide_box}>
                            <div className={css.action_image_box}><img src={slide.image} alt={'action'}/></div>
                            <NavLink to={'/deliveryHardPage/' + slide.id} state={slide} className={css.action_text}><span>Детальніше</span></NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export { ActionPage };
