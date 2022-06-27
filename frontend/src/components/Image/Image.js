import React from 'react';

import { NavLink } from 'react-router-dom';
import css from './Image.module.css';

const Image = ({
    slide,
    stopSlide,
    startSlide,
}) => {

    const {
        id,
        image,
    } = slide;

    return (
        <div className={css.carousel_item} onMouseEnter={stopSlide} onMouseOut={startSlide}>
            <NavLink to={'/deliveryHardPage/' + id} state={slide}>
                <img className={css.carousel_item_image} src={image} alt={'image'}/>
            </NavLink>
        </div>
    );
};

export { Image };
