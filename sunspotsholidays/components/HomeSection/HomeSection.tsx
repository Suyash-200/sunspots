import React from 'react';
import { AboutMedia, AboutStat, Paragraph, AirPartner, SpecialDeal, Service } from '@/lib/types';
import './HomeSection.css';
import HeroCarousel, { CarouselItem } from '../HeroCarousel/HeroCarousel';
import AboutSection from '../AboutSection/AboutSection';
import AirPartnersSection from '../AirPartnersSection/AirPartnersSection';
import SpecialDealsSection from '../SpecialDealsSection/SpecialDealsSection';
import ServicesSection from '../ServicesSection/ServicesSection';
import LandPartnersSection from '../LandPartnersSection/LandPartnersSection'

interface HomeSectionProps {
  sectionType: string;
  title?: string;
  paragraphs?: Paragraph[];
  image?: string;
  carousel?: CarouselItem[];
  media?: AboutMedia[];
  stats?: AboutStat[];
  partners?: AirPartner[]; // Add this line
  deals?:SpecialDeal[];
  services ?: Service[]
}

const HomeSection: React.FC<HomeSectionProps> = ({
  sectionType,
  title,
  paragraphs,
  image,
  carousel,
  media,
  stats,
  partners, 
  deals,
  services
}) => {
  
  // Render paragraphs - title is identifier only, used for CSS classes
  const renderContent = () => {
    if (paragraphs && paragraphs.length > 0) {
      return paragraphs.map((paragraph, index) => {
        // Use paragraph title as CSS identifier (kebab-case)
        const paragraphClass = paragraph.title 
          ? `home-section__paragraph home-section__paragraph--${paragraph.title.replace(/_/g, '-')}`
          : `home-section__paragraph home-section__paragraph--${index}`;
        
        return (
          <div key={paragraph.id || index} className={paragraphClass}>
            <div
              className="home-section__paragraph-body"
              dangerouslySetInnerHTML={{ __html: paragraph.body }}
            />
          </div>
        );
      });
    }
    return null;
  };

  // Special handling for hero section with carousel
  if (sectionType === 'hero') {
    return (
      <section className="home-section home-section--hero">
        {/* Hero Carousel */}
        {carousel && carousel.length > 0 ? (
          <HeroCarousel items={carousel} autoPlay={true} interval={5000} />
        ) : image ? (
          <div className="home-section__image">
            <img src={image} alt={title || 'Hero image'} />
          </div>
        ) : null}
        
        {/* Hero Content Overlay - Ensure it doesn't block carousel controls */}
        <div className="home-section__content" style={{ pointerEvents: 'none', zIndex: 2 }}>
          {renderContent()}
        </div>
      </section>
    );
  }

  // About section using the dedicated AboutSection component
  if (sectionType === 'about') {
    return (
      <AboutSection
        title={title || 'About Us'}
        paragraphs={paragraphs || []}
        media={media}
        stats={stats}
      />
    );
  }

  // Air Partners section using the dedicated AirPartnersSection component
  if (sectionType === 'air_partners') {
    return (
      <AirPartnersSection
        title={title || 'Our Airline Partners'}
        partners={partners || []}
      />
    );
  }

  if (sectionType === 'special_deals') {
  return (
    <SpecialDealsSection
      title={title || 'Special Deals'}
      deals={deals || []}
    />
  );
}

if (sectionType === 'services') {
  return (
    <ServicesSection
      title={title || 'Our Services'}
      services={services || []}
    />
  );
}

if (sectionType === 'land_partners') {
  return (
    <LandPartnersSection
      title={title || 'Land Partners'}
      image={image || ''}
    />
  );
}

  // Regular sections
  return (
    <section className={`home-section home-section--${sectionType}`}>
      {image && (
        <div className="home-section__image">
          <img src={image} alt={title || sectionType} />
        </div>
      )}
      <div className="home-section__content">
        {title && <h2 className="home-section__title">{title}</h2>}
        {renderContent()}
      </div>
    </section>
  );
};

export default HomeSection;