// components/ServicesSection/ServicesSection.tsx
import React from 'react';
import './ServicesSection.css';

export interface Service {
  id: string;
  title: string;
  icon: string;
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
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-section__header">
          <h2 className="services-section__title">{title}</h2>
        </div>

        <div className="services-section__grid">
          {services.map((service) => (
            <div key={service.id} className="services-section__card">
              <div className="services-section__icon">{service.icon}</div>
              <h3 className="services-section__service-title">{service.title}</h3>
              <p className="services-section__description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;