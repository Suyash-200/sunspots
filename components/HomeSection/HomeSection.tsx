import React from 'react';
import { Paragraph } from '@/lib/types';
import './HomeSection.css';

interface HomeSectionProps {
  sectionType: string;
  title?: string;
  paragraphs?: Paragraph[];
  image?: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  sectionType,
  title,
  paragraphs,
  image,
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

