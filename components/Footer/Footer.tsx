import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">Sunspots Holidays</h3>
            <p className="footer__description">
              Your trusted partner for unforgettable travel experiences around the world.
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><a href="/">Home</a></li>
              <li><a href="/destinations">Destinations</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__heading">Contact</h4>
            <ul className="footer__contact">
              <li>Email: info@sunspotsholidays.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Sunspots Holidays. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

