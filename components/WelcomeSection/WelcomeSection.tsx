// components/WelcomeSection/WelcomeSection.tsx
import React from 'react';

const WelcomeSection: React.FC = () => {
  return (
    <section className="home-section home-section--welcome" data-section-type="welcome">
      <div className="home-section__content">
        {/* Welcome Main Paragraph */}
        <div className="home-section__paragraph home-section__paragraph--welcome-main">
          <div className="home-section__paragraph-body">
            <h2>Welcome to Sleepers Holidays' 55th Anniversary</h2>
            <p className="lead">
              For 55 years, we've been planning tailor-made trips for travellers. With decades of experience and an Excellent rating and nearly 5,000 verified TrustPilot reviews, you can rely on the trusted travel experts at Sleepers Holidays to plan your next tailor-made trip. Enjoy the best service in the business while we plan a vacation that's perfect for you.
            </p>
          </div>
        </div>

        {/* Welcome Features Grid */}
        <div className="home-section__paragraph home-section__paragraph--welcome-features">
          <div className="home-section__content">
            <div className="feature-card">
              <h3>Tailor-made vacations as unique as you are</h3>
              <p>Every trip is customized to your preferences, interests, and travel style.</p>
            </div>
            
            <div className="feature-card">
              <h3>24/7/365 support to ensure your trip is perfect</h3>
              <p>Round-the-clock assistance before, during, and after your journey.</p>
            </div>
            
            <div className="feature-card">
              <h3>Authentic experts who know your destinations</h3>
              <p>Our travel specialists have first-hand knowledge of every destination we offer.</p>
            </div>
            
            <div className="feature-card">
              <h3>Global adventures to 115 destinations, your way</h3>
              <p>From tropical beaches to arctic expeditions, we cover the globe.</p>
            </div>
            
            <div className="feature-card">
              <h3>Elevated journeys with 5-star stays and private tours</h3>
              <p>Luxury accommodations and exclusive experiences designed for discerning travelers.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;