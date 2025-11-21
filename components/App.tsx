// Standalone App component - works in both standalone and Drupal contexts

import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import HomeSection from './HomeSection/HomeSection'
import DestinationsGrid from './DestinationsGrid/DestinationsGrid'
import { fetchHomeSections } from '@/lib/api'
import { HomeSection as HomeSectionType } from '@/lib/types'
import { getSampleData, getSampleDestinations } from '@/lib/data'
import { initScrollAnimations } from '@/lib/scrollAnimations'
import '../app/page.css'

export default function App() {
  const [sections, setSections] = useState<HomeSectionType[]>([])
  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Check if we should use mock data (default: true)
  // Can be overridden via environment variable or data attribute
  const getUseMockData = () => {
    // Check data attribute on react-app container
    const container = document.getElementById('react-app')
    if (container) {
      const useMock = container.getAttribute('data-use-mock')
      if (useMock !== null) {
        return useMock === 'true'
      }
    }
    // Check environment variable
    if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_USE_MOCK_DATA !== undefined) {
      return process.env.NEXT_PUBLIC_USE_MOCK_DATA !== 'false'
    }
    // Default to true (use mock data)
    return true
  }
  
  const useMockData = getUseMockData()

  useEffect(() => {
    const loadSections = async () => {
      setLoading(true)
      try {
        if (useMockData) {
          // Use sample data
          setSections(getSampleData())
          setDestinations(getSampleDestinations())
        } else {
          // Fetch from Drupal API
          const data = await fetchHomeSections()
          setSections(data)
          // TODO: Fetch destinations from API
          setDestinations([])
        }
      } catch (error) {
        console.error('Error loading sections:', error)
        // Fallback to sample data on error
        setSections(getSampleData())
      } finally {
        setLoading(false)
        // Initialize scroll animations after content loads
        setTimeout(() => {
          initScrollAnimations()
        }, 100)
      }
    }

    loadSections()
  }, [useMockData])

  if (loading) {
    return <div className="loading">Loading homepage...</div>
  }

  // Helper to get section by type
  const getSection = (sectionType: string) => {
    return sections.find(s => s.section_type === sectionType)
  }

  // Render section - use Drupal content if available, otherwise use static component
  const renderSection = (sectionType: string, StaticComponent?: React.ComponentType) => {
    const section = getSection(sectionType)
    
    if (section) {
      return (
        <HomeSection
          key={section.id}
          sectionType={section.section_type}
          title={section.title}
          paragraphs={section.paragraphs}
          image={section.image}
        />
      )
    } else if (StaticComponent) {
      // Fallback to static component if section not found
      return <StaticComponent />
    }
    return null
  }

  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <div className="home-page">
          {/* Hero Section */}
          {renderSection('hero')}
          
          {/* Welcome Section */}
          {renderSection('welcome')}
          
          {/* Travel Styles Section */}
          {renderSection('trip_styles')}
          
          {/* Destinations Section */}
          {getSection('destinations') ? (
            <>
              {renderSection('destinations')}
              {destinations.length > 0 && (
                <section className="home-page__section home-page__section--destinations-grid">
                  <div className="home-page__container">
                    <DestinationsGrid destinations={destinations} />
                  </div>
                </section>
              )}
            </>
          ) : (
            <section className="home-page__section">
              <div className="home-page__container">
                <div className="home-page__section-header">
                  <h2 className="home-page__section-title">Where are you headed to next?</h2>
                  <p className="home-page__section-subtitle">Top Places To Travel</p>
                </div>
                <DestinationsGrid destinations={destinations} />
              </div>
            </section>
          )}
          
          {/* Travel Inspiration Section */}
          {renderSection('travel_inspiration')}
          
          {/* Testimonials Section */}
          {renderSection('testimonials')}
          
          {/* Specials Section */}
          {renderSection('specials')}
          
          {/* Newsletter Section */}
          {renderSection('newsletter')}
          
          {/* Start Planning Section */}
          {renderSection('start_planning')}
        </div>
      </main>
      <Footer />
    </div>
  )
}

