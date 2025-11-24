'use client'
import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <div className="header__logo">
          <a href="/" className="header__logo-link">
            <img 
              src="/logo.png" 
              alt="Sunspots Holidays" 
              className="header__logo-image"
            />
            <span className="header__logo-text">Sunspots Holidays</span>
          </a>
        </div>

        <button
          className="header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`header__mobile-icon ${isMobileMenuOpen ? 'header__mobile-icon--open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <Navigation isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;

