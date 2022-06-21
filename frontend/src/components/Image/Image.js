import React from 'react';

import { NavLink } from 'react-router-dom';
import { slides } from '../../constants';
import css from './Image.module.css';

const Image = ({
    slide,
    stopSlide,
    startSlide,
}) => {

    return (
        <div className={css.carousel_item} onMouseEnter={stopSlide} onMouseOut={startSlide}>
            {/* <NavLink to={'/deliveryHardPage' + slide}> */}
                <img className={css.carousel_item_image} src={slide} alt={'image'}/>
            {/* </NavLink> */}
        </div>
    );
};

export { Image };
