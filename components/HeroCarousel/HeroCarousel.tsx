// components/HeroCarousel/HeroCarousel.tsx
'use client'
import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export interface CarouselItem {
  id: string;
  image: string;
  alt: string;
  title?: string;
  description?: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  items, 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || items.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, autoPlay, interval, isPaused, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div 
      className="hero-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hero-carousel__slides">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`hero-carousel__slide ${
              index === currentSlide ? 'hero-carousel__slide--active' : ''
            }`}
          >
            <img
              src={item.image}
              alt={item.alt}
              className="hero-carousel__image"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="hero-carousel__overlay" />
            
            {/* Optional content overlay */}
            {(item.title || item.description) && (
              <div className="hero-carousel__content">
                {item.title && (
                  <h3 className="hero-carousel__title">{item.title}</h3>
                )}
                {item.description && (
                  <p className="hero-carousel__description">{item.description}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      {items.length > 1 && (
        <>
          {/* <div className="hero-carousel__controls">
            <button 
              className="hero-carousel__button hero-carousel__button--prev" 
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <FaChevronLeft size={20}/>
            </button>
            <button 
              className="hero-carousel__button hero-carousel__button--next" 
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <FaChevronRight size={24} />
            </button>
          </div> */}

          <div className="hero-carousel__dots">
            {items.map((_, index) => (
              <button
                key={index}
                className={`hero-carousel__dot ${
                  index === currentSlide ? 'hero-carousel__dot--active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentSlide}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroCarousel;