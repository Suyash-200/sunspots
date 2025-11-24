// components/AboutSection/AboutSection.tsx
'use client'
import React from 'react';
import './AboutSection.css';
import { AboutParagraph, AboutSectionProps } from '@/lib/types';

const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  paragraphs,
  media = [],
  stats = []
}) => {
  const renderParagraph = (paragraph: AboutParagraph) => {
    if (paragraph.body_format === 'full_html') {
      return (
        <div
          key={paragraph.id}
          className="about-section__paragraph"
          dangerouslySetInnerHTML={{ __html: paragraph.body }}
        />
      );
    }
    
    return (
      <p key={paragraph.id} className="about-section__paragraph">
        {paragraph.body}
      </p>
    );
  };

  const renderMedia = () => {
    if (media.length === 0) return null;

    return media.map((item) => {
      if (item.type === 'iframe') {
        return (
          <iframe
            key={item.id}
            src={item.src}
            className={`about-section__media about-section__iframe ${item.class || ''}`}
            height={item.height}
            width={item.width}
            title={item.title}
            loading="lazy"
          />
        );
      }
      
      // For images
      return (
        <div key={item.id} className="about-section__media about-section__image">
          <img
            src={item.src}
            alt={item.alt || item.title || 'About section image'}
            className={item.class}
            style={{
              width: item.width ? `${item.width}px` : 'auto',
              height: item.height ? `${item.height}px` : 'auto',
              maxWidth: '100%',
            }}
          />
        </div>
      );
    });
  };

  const renderStats = () => {
    if (stats.length === 0) return null;

    return (
      <div className="about-section__stats">
        {stats.map((stat) => (
          <div key={stat.id} className="about-stat">
            <div className="about-stat__value">{stat.value}</div>
            <div className="about-stat__label">{stat.label}</div>
            <div className="about-stat__description">{stat.description}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-section__header">
          <h2 className="about-section__title">{title}</h2>
          {paragraphs.find(p => p.title === 'about-tagline') && (
            <p className="about-section__tagline">
              {paragraphs.find(p => p.title === 'about-tagline')?.body}
            </p>
          )}
        </div>

        <div className="about-section__content">
          <div className="about-section__text">
            {paragraphs
              .filter(p => !p.title.includes('tagline'))
              .map(renderParagraph)}
          </div>

          {media.length > 0 && (
            <div className="about-section__media-container">
              {renderMedia()}
            </div>
          )}
        </div>

        {stats.length > 0 && renderStats()}
      </div>
    </section>
  );
};

export default AboutSection;