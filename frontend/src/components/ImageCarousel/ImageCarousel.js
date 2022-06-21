import React, { useEffect, useRef, useState } from 'react';

import { Image } from '../Image/Image';
import { ImageCarouselControl } from '../ImageCarouselControl/ImageCarouselControl';
import { CarouselIndicators } from '../CarouselIndicators/CarouselIndicators';
import css from './ImageCarousel.module.css';
import { useDispatch, useSelector } from 'react-redux';

const ImageCarousel = ({
        interval = 3000,
        controls = false,
        indicators = false,
    }) => {

        const dispatch = useDispatch();

        const { slides } = useSelector(state => state['sliderReducer']);

        const slideInterval = useRef();

        const [currentSlide, setCurrentSlide] = useState(0);

        const prev = () => {
            startSlideTimer();
            const index = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
            setCurrentSlide(index);
        };

        const next = () => {
            startSlideTimer();
            const index = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
            setCurrentSlide(index);
        };

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
                {controls && <ImageCarouselControl prev={prev} next={next}/>}
            </div>
        );
    }
;

export { ImageCarousel };
