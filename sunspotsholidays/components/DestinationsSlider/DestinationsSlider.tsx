'use client'

import React, { useState, useEffect, useRef } from 'react';
import './DestinationsSlider.css';

interface Destination {
  id: string;
  title: string;
  description?: string;
  image?: string;
}

interface DestinationsSliderProps {
  destinations: Destination[];
  slidesToShow?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
}

const DestinationsSlider: React.FC<DestinationsSliderProps> = ({
  destinations,
  slidesToShow = 3,
  autoplay = true,
  autoplayInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(slidesToShow);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive slides per view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(slidesToShow);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, [slidesToShow]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && destinations.length > slidesPerView) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = destinations.length - slidesPerView;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoplayInterval);

      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [autoplay, autoplayInterval, destinations.length, slidesPerView]);

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && destinations.length > slidesPerView) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = destinations.length - slidesPerView;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoplayInterval);
    }
  };

  const goToSlide = (index: number) => {
    const maxIndex = destinations.length - slidesPerView;
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const goToNext = () => {
    const maxIndex = destinations.length - slidesPerView;
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  if (destinations.length === 0) {
    return (
      <div className="destinations-slider__empty">
        <p>No destinations available at the moment.</p>
      </div>
    );
  }

  const maxIndex = destinations.length - slidesPerView;
  const showArrows = destinations.length > slidesPerView;

  return (
    <div
      className="destinations-slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="destinations-slider__container" ref={sliderRef}>
        {showArrows && (
          <button
            className="destinations-slider__arrow destinations-slider__arrow--prev"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <div className="destinations-slider__track">
          <div
            className="destinations-slider__slides"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            }}
          >
            {destinations.map((destination) => (
              <div 
                key={destination.id} 
                className="destinations-slider__slide"
                style={{
                  flex: `0 0 ${100 / slidesPerView}%`,
                  minWidth: 0,
                }}
              >
                <div className="destinations-slider__item">
                  {destination.image && (
                    <div className="destinations-slider__image-wrapper">
                      <img
                        src={destination.image}
                        alt={destination.title}
                        className="destinations-slider__image"
                        loading="lazy"
                      />
                      <div className="destinations-slider__overlay">
                        <h3 className="destinations-slider__title">{destination.title}</h3>
                        {destination.description && (
                          <p className="destinations-slider__description">{destination.description}</p>
                        )}
                      </div>
                    </div>
                  )}
                  {!destination.image && (
                    <div className="destinations-slider__content">
                      <h3 className="destinations-slider__title">{destination.title}</h3>
                      {destination.description && (
                        <p className="destinations-slider__description">{destination.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showArrows && (
          <button
            className="destinations-slider__arrow destinations-slider__arrow--next"
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {destinations.length > slidesPerView && (
        <div className="destinations-slider__dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`destinations-slider__dot ${currentIndex === index ? 'destinations-slider__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationsSlider;

