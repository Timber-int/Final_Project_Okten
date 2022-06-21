import React from 'react';

import css from './ImageCarouselControl.module.css';

const ImageCarouselControl = ({
    prev,
    next
}) => {
    return (
        <div>
            <button className={css.carousel_control_left} onClick={prev}>Prev</button>
            <button className={css.carousel_control_right} onClick={next}>Next</button>
        </div>
    );
};

export { ImageCarouselControl };
