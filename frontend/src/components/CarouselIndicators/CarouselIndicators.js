import React from 'react';

import css from './CarouselIndicators.module.css';

const CarouselIndicators = ({
    slides,
    currentIndex,
    switchIndex,
}) => {
    return (
        <div className={css.carousel_indicators}>
            {slides.map((slide, index) => (
                <button key={index} className={`${currentIndex === index ? css.carousel_indicator_item_active : css.carousel_indicator_item}`}
                        onClick={() => switchIndex(index)}
                />
            ))}
        </div>
    );
};

export { CarouselIndicators };
