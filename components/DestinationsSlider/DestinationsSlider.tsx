'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  const [direction, setDirection] = useState(0);
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
        setDirection(1);
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
        setDirection(1);
        setCurrentIndex((prev) => {
          const maxIndex = destinations.length - slidesPerView;
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoplayInterval);
    }
  };

  const goToSlide = (index: number) => {
    const maxIndex = destinations.length - slidesPerView;
    const newIndex = Math.max(0, Math.min(index, maxIndex));
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    }
  };

  const goToNext = () => {
    const maxIndex = destinations.length - slidesPerView;
    if (currentIndex < maxIndex) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    }
  };

  if (destinations.length === 0) {
    return (
      <motion.div 
        className="destinations-slider__empty"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p>No destinations available at the moment.</p>
      </motion.div>
    );
  }

  const maxIndex = destinations.length - slidesPerView;
  const showArrows = destinations.length > slidesPerView;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="destinations-slider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="destinations-slider__container">
        {showArrows && (
          <motion.button
            className="destinations-slider__arrow destinations-slider__arrow--prev"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            aria-label="Previous slide"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaChevronLeft size={20} />
          </motion.button>
        )}

        <div className="destinations-slider__track">
          <motion.div
            className="destinations-slider__slides"
            animate={{
              x: `-${currentIndex * (100 / slidesPerView)}%`
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {destinations.map((destination, index) => (
              <motion.div 
                key={destination.id} 
                className="destinations-slider__slide"
                style={{
                  flex: `0 0 ${100 / slidesPerView}%`,
                  minWidth: 0,
                }}
                variants={slideVariants}
              >
                <motion.div 
                  className="destinations-slider__item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {destination.image && (
                    <div className="destinations-slider__image-wrapper">
                      <img
                        src={destination.image}
                        alt={destination.title}
                        className="destinations-slider__image"
                        loading="lazy"
                      />
                      <div className="destinations-slider__overlay">
                        <h3 className="destinations-slider__title">
                          {destination.title}
                        </h3>
                        {destination.description && (
                          <p className="destinations-slider__description">
                            {destination.description}
                          </p>
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
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {showArrows && (
          <motion.button
            className="destinations-slider__arrow destinations-slider__arrow--next"
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next slide"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaChevronRight size={20} />
          </motion.button>
        )}
      </div>

      {destinations.length > slidesPerView && (
        <motion.div 
          className="destinations-slider__dots"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <motion.button
              key={index}
              className={`destinations-slider__dot ${currentIndex === index ? 'destinations-slider__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              animate={{
                // width: currentIndex === index ? 32 : 12,
                // backgroundColor: currentIndex === index ? '#0ea5e9' : '#cbd5e1'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DestinationsSlider;