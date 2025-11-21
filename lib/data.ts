import { HomeSection, HomeSectionsResponse } from './types';
import sampleDataJson from '../data/sample-home-sections.json';

// Load sample data from JSON file
export function getSampleData(): HomeSection[] {
  // Type assertion for JSON import
  const data = sampleDataJson as HomeSectionsResponse;
  return data.data;
}

// Load sample destinations from JSON file
export function getSampleDestinations(): any[] {
  const data = sampleDataJson as any;
  return data.destinations || [];
}

// Legacy function - kept for backward compatibility
export function getSampleDataLegacy(): HomeSection[] {
  return [
    {
      id: '1',
      title: 'Hero Section',
      section_type: 'hero',
      paragraphs: [
        {
          id: '1',
          title: 'hero-main',
          body: '<div class="hero-content"><h1>Discover tailor-made travel.</h1><p class="lead">Trust Sunspots Holidays\' experience planning trips to destinations around the world.</p><div class="trust-indicators"><div class="trust-item"><span class="trust-number">25+</span><span class="trust-label">Years of Experience</span></div><div class="trust-item"><span class="trust-number">50+</span><span class="trust-label">Countries</span></div><div class="trust-item"><span class="trust-number">7</span><span class="trust-label">Continents</span></div></div></div>',
          body_format: 'full_html',
        },
      ],
    },
    {
      id: '2',
      title: 'Why Choose Us',
      section_type: 'why_choose_us',
      paragraphs: [
        {
          id: '2',
          title: 'why-choose-main',
          body: '<h2>Why Choose Sunspots Holidays</h2><p>We are your trusted partner for creating unforgettable travel experiences around the world.</p>',
          body_format: 'full_html',
        },
        {
          id: '3',
          title: 'why-choose-experience',
          body: '<h3>25+ Years of Experience</h3><p>With over 25 years in the travel industry, we have the expertise and knowledge to create perfect trips tailored to your needs.</p>',
          body_format: 'full_html',
        },
        {
          id: '4',
          title: 'why-choose-global',
          body: '<h3>50+ Countries, 7 Continents</h3><p>We offer travel experiences across 50+ countries spanning all 7 continents, from tropical paradises to arctic adventures.</p>',
          body_format: 'full_html',
        },
        {
          id: '5',
          title: 'why-choose-advisors',
          body: '<h3>Expert Travel Advisors</h3><p>Our team of travel experts are passionate about travel and dedicated to making your dream vacation a reality.</p>',
          body_format: 'full_html',
        },
      ],
    },
    {
      id: '3',
      title: 'Trip Styles',
      section_type: 'trip_styles',
      paragraphs: [
        {
          id: '6',
          title: 'trip-styles-main',
          body: '<h2>Find Your Perfect Trip Style</h2><p>Whether you\'re seeking adventure, relaxation, or cultural immersion, we have the perfect trip for you.</p>',
          body_format: 'full_html',
        },
        {
          id: '7',
          title: 'trip-styles-adventure',
          body: '<h3>Adventure & Active</h3><p>From hiking in the Himalayas to diving in the Great Barrier Reef, we offer thrilling adventures for the active traveler.</p>',
          body_format: 'full_html',
        },
        {
          id: '8',
          title: 'trip-styles-beach',
          body: '<h3>Beach & Relaxation</h3><p>Unwind on pristine beaches, enjoy luxury resorts, and experience ultimate relaxation in tropical paradises.</p>',
          body_format: 'full_html',
        },
        {
          id: '9',
          title: 'trip-styles-cultural',
          body: '<h3>Cultural Immersion</h3><p>Experience authentic local cultures, visit historic sites, and connect with communities around the world.</p>',
          body_format: 'full_html',
        },
        {
          id: '10',
          title: 'trip-styles-luxury',
          body: '<h3>Luxury Travel</h3><p>Indulge in world-class accommodations, private tours, and exclusive experiences designed for the discerning traveler.</p>',
          body_format: 'full_html',
        },
      ],
    },
    {
      id: '4',
      title: 'Travel Inspiration',
      section_type: 'travel_inspiration',
      paragraphs: [
        {
          id: '11',
          title: 'inspiration-main',
          body: '<h2>Get Inspired</h2><p>Discover amazing destinations and travel stories from around the world.</p>',
          body_format: 'full_html',
        },
        {
          id: '12',
          title: 'inspiration-destinations',
          body: '<h3>Featured Destinations</h3><p>Explore our curated selection of must-visit destinations, from iconic landmarks to hidden gems.</p>',
          body_format: 'full_html',
        },
        {
          id: '13',
          title: 'inspiration-stories',
          body: '<h3>Travel Stories</h3><p>Read inspiring travel stories and tips from fellow travelers who have explored the world with us.</p>',
          body_format: 'full_html',
        },
      ],
    },
    {
      id: '5',
      title: 'Testimonials',
      section_type: 'testimonials',
      paragraphs: [
        {
          id: '14',
          title: 'testimonials-main',
          body: '<h2>What Our Travelers Say</h2><p>Read reviews from travelers who have experienced our exceptional service.</p>',
          body_format: 'full_html',
        },
        {
          id: '15',
          title: 'testimonial-sarah',
          body: '<blockquote><p>"Our trip to Bali was absolutely perfect! Sunspots Holidays planned every detail flawlessly. The accommodations were stunning and the local experiences were unforgettable."</p><cite>— Sarah Johnson, New York</cite></blockquote>',
          body_format: 'full_html',
        },
        {
          id: '16',
          title: 'testimonial-michael',
          body: '<blockquote><p>"The 14-day European tour exceeded all expectations. The itinerary was well-balanced, and our guide was knowledgeable and friendly. Highly recommend!"</p><cite>— Michael Chen, San Francisco</cite></blockquote>',
          body_format: 'full_html',
        },
        {
          id: '17',
          title: 'testimonial-emma',
          body: '<blockquote><p>"An incredible safari experience in Kenya! We saw the Big Five and the Great Migration. The lodges were luxurious and the guides were experts. Truly a trip of a lifetime."</p><cite>— Emma Williams, London</cite></blockquote>',
          body_format: 'full_html',
        },
      ],
    },
    {
      id: '6',
      title: 'Specials',
      section_type: 'specials',
      paragraphs: [
        {
          id: '18',
          title: 'specials-main',
          body: '<h2>Exclusive Travel Specials</h2><p>Don\'t miss out on these limited-time offers and special deals.</p>',
          body_format: 'full_html',
        },
        {
          id: '19',
          title: 'special-europe',
          body: '<div class="special-offer"><h3>Early Bird Special: Save 20%</h3><p><strong>Destination:</strong> Europe</p><p><strong>Valid Until:</strong> March 31, 2025</p><p>Book your European adventure early and save up to 20% on select packages.</p></div>',
          body_format: 'full_html',
        },
        {
          id: '20',
          title: 'special-africa',
          body: '<div class="special-offer"><h3>Luxury Safari Package</h3><p><strong>Destination:</strong> Africa</p><p><strong>Save:</strong> 15%</p><p>Experience the ultimate African safari with our luxury package deal.</p></div>',
          body_format: 'full_html',
        },
        {
          id: '21',
          title: 'special-pacific',
          body: '<div class="special-offer"><h3>Tropical Paradise Deal</h3><p><strong>Destination:</strong> South Pacific</p><p><strong>Save:</strong> 25%</p><p>Escape to tropical paradise with our exclusive South Pacific offer.</p></div>',
          body_format: 'full_html',
        },
      ],
    },
    {
      id: '7',
      title: 'Newsletter',
      section_type: 'newsletter',
      paragraphs: [
        {
          id: '22',
          title: 'newsletter-main',
          body: '<h2>Stay Connected</h2><p>Subscribe to our newsletter for travel inspiration, exclusive deals, and destination guides.</p>',
          body_format: 'full_html',
        },
        {
          id: '23',
          title: 'newsletter-benefits',
          body: '<h3>What You\'ll Get</h3><ul><li>Exclusive travel deals and special offers</li><li>Destination guides and travel tips</li><li>Inspirational travel stories</li><li>Early access to new packages</li></ul>',
          body_format: 'full_html',
        },
      ],
    },
  ];
}

