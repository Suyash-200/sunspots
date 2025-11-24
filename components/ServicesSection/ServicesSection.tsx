// components/ServicesSection/ServicesSection.tsx
"use client"

import './ServicesSection.css';

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
  return (
    <section className="services-section">
      <div className="container">
        <div className="services-section__header">
          <h2 className="services-section__title">{title}</h2>
        </div>

        <div className="services-section__grid">
          {services.map((service) => (
            <div key={service.id} className="services-section__card">
              <img 
                src={service.image} 
                alt={service.title}
                className="services-section__image"
              />
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