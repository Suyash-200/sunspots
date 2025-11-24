'use client'

import React, { useState, useEffect } from 'react';
import './Navigation.css';

export interface NavigationItem {
  title: string;
  url: string;
  children?: NavigationItem[];
}

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock navigation data - can be replaced with API call later
const mockNavigation: NavigationItem[] = [
  { title: 'Home', url: '/' },
  {
    title: 'About',
    url: '/about'
  },
  {
    title: 'Special Packages',
    url: '/experiences',
    // children: [
    //   { title: 'Active & Adventure', url: '/experiences/adventure' },
    //   { title: 'Beach', url: '/experiences/beach' },
    //   { title: 'Classics', url: '/experiences/classics' },
    //   { title: 'Family', url: '/experiences/family' },
    //   { title: 'Luxury', url: '/experiences/luxury' },
    //   { title: 'Safari & Wildlife', url: '/experiences/safari' },
    //   { title: 'Solo & Women Travel', url: '/experiences/solo' },
    //   { title: 'Wellness', url: '/experiences/wellness' },
    // ],
  },
  {
    title: 'Flights',
    url: '/inspiration',
  },
  {
    title: 'Groups',
    url: '/about',
  },
  {
    title: 'E-Brochure',
    url: '/contact',
    children: [
      { title: 'Weekly E-Flyers', url: '/' },
      { title: 'Truesun Rewards', url: '/' },
    ],
  },
  {
    title: 'PNR Transfer',
    url: '/contact',
  },
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const [menuItems, setMenuItems] = useState<NavigationItem[]>([]);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    // Load navigation from mock data
    // TODO: Replace with API call when available
    setMenuItems(mockNavigation);
  }, []);

  // Add Home to menu items
  const allMenuItems: NavigationItem[] = [
    ...menuItems,
  ];

  const isActive = (url: string): boolean => {
    if (typeof window === 'undefined') return false;
    const currentPath = window.location.pathname;
    
    // Remove trailing slashes for comparison
    const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' 
      ? currentPath.slice(0, -1) 
      : currentPath;
    const normalizedUrl = url.endsWith('/') && url !== '/' 
      ? url.slice(0, -1) 
      : url;
    
    // Exact match
    return normalizedPath === normalizedUrl;
  };

  const handleSubmenuToggle = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title);
  };

  return (
    <nav className={`navigation ${isOpen ? 'navigation--open' : ''}`}>
      <ul className="navigation__list">
        {allMenuItems.map((item) => (
          <li 
            key={item.url} 
            className={`navigation__item ${item.children ? 'navigation__item--has-children' : ''} ${activeSubmenu === item.title ? 'navigation__item--open' : ''}`}
          >
            <a
              href={item.url}
              className={`navigation__link ${isActive(item.url) ? 'navigation__link--active' : ''}`}
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault();
                  handleSubmenuToggle(item.title);
                } else {
                  onClose();
                }
              }}
            >
              {item.title}
              {item.children && (
                <span className="navigation__arrow">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </a>
            {item.children && (
              <ul className="navigation__submenu">
                {item.children.map((child: NavigationItem) => (
                  <li key={child.url} className="navigation__submenu-item">
                    <a
                      href={child.url}
                      className={`navigation__submenu-link ${isActive(child.url) ? 'navigation__submenu-link--active' : ''}`}
                      onClick={onClose}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;