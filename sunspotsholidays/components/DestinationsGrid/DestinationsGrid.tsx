import React from 'react';
import './DestinationsGrid.css';

interface Destination {
  id: string;
  title: string;
  description?: string;
  image?: string;
}

interface DestinationsGridProps {
  destinations: Destination[];
}

const DestinationsGrid: React.FC<DestinationsGridProps> = ({ destinations }) => {
  if (destinations.length === 0) {
    return (
      <div className="destinations-grid__empty">
        <p>No destinations available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="destinations-grid">
      {destinations.map((destination) => (
        <div key={destination.id} className="destinations-grid__item">
          {destination.image && (
            <div className="destinations-grid__image-wrapper">
              <img
                src={destination.image}
                alt={destination.title}
                className="destinations-grid__image"
                loading="lazy"
              />
            </div>
          )}
          <div className="destinations-grid__content">
            <h3 className="destinations-grid__title">{destination.title}</h3>
            {destination.description && (
              <p className="destinations-grid__description">{destination.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationsGrid;

