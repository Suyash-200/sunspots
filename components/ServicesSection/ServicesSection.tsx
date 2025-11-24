// components/ServicesSection/ServicesSection.tsx
"use client"

import './ServicesSection.css';
import { FaChevronRight } from 'react-icons/fa';

export interface Service {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface ServicesSectionProps {
  title: string;
  services: Service[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  title,
  services
}) => {
  const handleLearnMore = (serviceTitle: string) => {
    // Add your navigation logic here
    console.log(`Learn more about: ${serviceTitle}`);
    // Example: router.push(`/services/${serviceId}`)
  };

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-section__header">
          <h2 className="services-section__title">{title}</h2>
        </div>

        <div className="services-section__grid">
          {services.map((service) => (
            <div key={service.id} className="services-section__card">
              <div className="services-section__image-wrapper">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="services-section__image"
                />
              </div>
              <div className="services-section__content">
                <h3 className="services-section__service-title">{service.title}</h3>
                <p className="services-section__description">{service.description}</p>
                <button 
                  className="services-section__button"
                  onClick={() => handleLearnMore(service.title)}
                  aria-label={`Learn more about ${service.title}`}
                >
                  <span className="services-section__button-text">Learn More</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;