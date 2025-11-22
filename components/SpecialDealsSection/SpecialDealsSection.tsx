// components/SpecialDealsSection/SpecialDealsSection.tsx
import React from 'react';
import Image from 'next/image';
import './SpecialDealsSection.css';

export interface SpecialDeal {
  id: string;
  title: string;
  image: string;
  url: string;
  description: string;
  button_text: string;
}

export interface SpecialDealsSectionProps {
  title: string;
  deals: SpecialDeal[];
}

const SpecialDealsSection: React.FC<SpecialDealsSectionProps> = ({
  title,
  deals
}) => {
  return (
    <section className="special-deals-section">
      <div className="container">
        <div className="special-deals-section__header">
          <h2 className="special-deals-section__title">{title}</h2>
        </div>

        <div className="special-deals-section__grid">
          {deals.map((deal) => (
            <div key={deal.id} className="special-deals-section__card">
              <div className="special-deals-section__image-container">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  width={400}
                  height={250}
                  className="special-deals-section__image"
                />
                <div className="special-deals-section__overlay">
                  <span className="special-deals-section__icon">✨</span>
                </div>
              </div>
              
              <div className="special-deals-section__content">
                <h3 className="special-deals-section__deal-title">{deal.title}</h3>
                {deal.description && (
                  <p className="special-deals-section__description">{deal.description}</p>
                )}
                <a 
                  href={deal.url} 
                  className="special-deals-section__button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {deal.button_text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialDealsSection;