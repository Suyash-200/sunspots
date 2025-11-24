// components/AirPartnersSection/AirPartnersSection.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AirPartnersSection.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export interface AirPartner {
  id: string;
  name: string;
  logo: string;
  logoHover?: string;
  url: string;
  alt: string;
}

export interface AirPartnersSectionProps {
  title: string;
  partners: AirPartner[];
}

const AirPartnersSection: React.FC<AirPartnersSectionProps> = ({
  title,
  partners
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);

  const slidesToShow = 3;
  const totalSlides = Math.ceil(partners.length / slidesToShow);

  useEffect(() => {
    if (!isAutoPlaying || partners.length <= slidesToShow) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, partners.length, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const getSlidePartners = () => {
    const startIndex = currentIndex * slidesToShow;
    return partners.slice(startIndex, startIndex + slidesToShow);
  };

  // Trail animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: 45
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    },
    exit: {
      opacity: 0,
      y: -60,
      scale: 0.8,
      rotateX: -45,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  // Slide variants for smooth transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
        mass: 1,
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
        mass: 1,
        duration: 0.6
      }
    })
  };

  return (
    <section 
      className="air-partners-section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <div className="air-partners-section__header">
          <motion.h2 
            className="air-partners-section__title"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="air-partners-section__subtitle"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Partnering with {partners.length}+ major international airlines worldwide
          </motion.p>
        </div>

        <div className="air-partners-section__carousel">
          {partners.length > slidesToShow && (
            <motion.button 
              className="air-partners-section__nav air-partners-section__nav--prev"
              onClick={handlePrev}
              aria-label="Previous partners"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaChevronLeft size={20} />
            </motion.button>
          )}

          <div className="air-partners-section__carousel-container">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="air-partners-section__slide"
              >
                <motion.div
                  className="air-partners-section__partners-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {getSlidePartners().map((partner, index) => (
                    <motion.a
                      key={`${partner.id}-${currentIndex}`}
                      href={partner.url}
                      className="air-partners-section__partner"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredPartner(partner.id)}
                      onMouseLeave={() => setHoveredPartner(null)}
                      variants={itemVariants}
                      whileHover={{ 
                        y: -8,
                        scale: 1.02,
                        transition: { 
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="air-partners-section__logo">
                        <motion.img
                          src={hoveredPartner === partner.id && partner.logoHover ? partner.logoHover : partner.logo}
                          alt={partner.alt}
                          className="air-partners-section__logo-image"
                          whileHover={{ 
                            scale: 1.1,
                            transition: { 
                              type: "spring",
                              stiffness: 400,
                              damping: 10
                            }
                          }}
                          onError={(e) => {
                            console.error(`Failed to load image: ${partner.logo}`);
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <motion.span 
                        className="air-partners-section__partner-name"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {partner.name}
                      </motion.span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {partners.length > slidesToShow && (
            <motion.button 
              className="air-partners-section__nav air-partners-section__nav--next"
              onClick={handleNext}
              aria-label="Next partners"
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaChevronRight size={20} />
            </motion.button>
          )}
        </div>

        {partners.length > slidesToShow && (
          <div className="air-partners-section__dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                className={`air-partners-section__dot ${
                  index === currentIndex ? 'air-partners-section__dot--active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                transition={{ 
                  type: "spring",
                  stiffness: 500,
                  damping: 30
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AirPartnersSection;