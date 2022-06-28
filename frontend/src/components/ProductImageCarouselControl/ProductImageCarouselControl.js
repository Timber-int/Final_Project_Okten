import React from 'react';

import css from './ProductImageCarouselControl.module.css';

const ProductImageCarouselControl = ({
    next,
    prev,
    currentSlide
}) => {
    return (
        <div>
            <button className={currentSlide === 0 ? css.carousel_control_left_not_active : css.carousel_control_left_active} onClick={prev}>
                Prev
            </button>
            <button className={currentSlide === 1 ? css.carousel_control_right_not_active : css.carousel_control_right_active} onClick={next}>
                Next
            </button>
        </div>
    );
};

export { ProductImageCarouselControl };
