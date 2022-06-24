import React, { useEffect, useRef, useState } from 'react';

import { Image } from '../Image/Image';
import { CarouselIndicators } from '../CarouselIndicators/CarouselIndicators';
import css from './ImageCarousel.module.css';
import { useSelector } from 'react-redux';

const ImageCarousel = ({
        interval = 3000,
        indicators = false,
    }) => {

        const { slides } = useSelector(state => state['sliderReducer']);

        const slideInterval = useRef();

        const [currentSlide, setCurrentSlide] = useState(0);

        const startSlideTimer = () => {
            stopSlideTimer();
            slideInterval.current = setInterval(() => {
                setCurrentSlide(currentSlide => currentSlide < slides.length - 1 ? currentSlide + 1 : 0);
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

        const switchIndex = (index) => {
            startSlideTimer();
            setCurrentSlide(index);
        };

        return (
            <div className={css.carousel}>
                <div
                    className={css.carousel_inner}
                    style={{ transform: `translateX(${-currentSlide * 100}%)` }}
                >
                    {slides.map((slide, index) => <Image key={index} slide={slide} stopSlide={stopSlideTimer} startSlide={startSlideTimer}/>)}
                </div>
                {indicators && <CarouselIndicators slides={slides} currentIndex={currentSlide} switchIndex={switchIndex}/>}
            </div>
        );
    }
;

export { ImageCarousel };
