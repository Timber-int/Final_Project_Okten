import React, { useState, useRef, useEffect } from 'react';

import { ProductImageCarouselControl } from '../ProductImageCarouselControl/ProductImageCarouselControl';
import { baseURL } from '../../config';
import css from './ProductImageCarousel.module.css';

const ProductImageCarousel = ({
    carouselArray,
    interval = 5000,
}) => {

    const slideInterval = useRef();

    const [currentSlide, setCurrentSlide] = useState(0);

    const startSlideTimer = () => {
        stopSlideTimer();
        slideInterval.current = setInterval(() => {
            setCurrentSlide(currentSlide => currentSlide < carouselArray.length - 1 ? currentSlide + 1 : 0);
        }, interval);
    };

    const stopSlideTimer = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
    };

    useEffect(() => {
        startSlideTimer();

        return () => stopSlideTimer();
    }, []);

    const prev = () => {
        const index = currentSlide > 0 ? currentSlide - 1 : carouselArray.length - 1;
        setCurrentSlide(index);
    };
    const next = () => {
        const index = currentSlide < carouselArray.length - 1 ? currentSlide + 1 : 0;
        setCurrentSlide(index);
    };

    return (
        <div className={css.carousel}>
            <div className={css.carousel_inner}
                 style={{ transform: `translateX(${-currentSlide * 100}%)` }}
            >
                {
                    carouselArray.map((image, index) => (
                        <div className={css.carousel_item} key={index} onMouseEnter={stopSlideTimer} onMouseOut={startSlideTimer}>
                            <img className={css.carousel_item_image} src={baseURL + '/' + image} alt={'image'}/>
                        </div>
                    ))
                }
            </div>
            <ProductImageCarouselControl next={next} prev={prev} currentSlide={currentSlide}/>
        </div>
    );
};

export { ProductImageCarousel };
