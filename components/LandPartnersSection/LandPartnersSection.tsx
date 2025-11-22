// components/LandPartnersSection/LandPartnersSection.tsx
import React from 'react';
import Image from 'next/image';
import './LandPartnersSection.css';

export interface LandPartnersSectionProps {
  title: string;
  image: string;
}

const LandPartnersSection: React.FC<LandPartnersSectionProps> = ({
  title,
  image
}) => {
  return (
    <section className="land-partners-section">
      <div className="container">
        <div className="land-partners-section__header">
          <h2 className="land-partners-section__title">{title}</h2>
        </div>
        
        <div className="land-partners-section__image-container">
          <Image
            src={image}
            alt={title}
            width={800}
            height={400}
            className="land-partners-section__image"
          />
        </div>
      </div>
    </section>
  );
};

export default LandPartnersSection;