import axios from 'axios';
import { HomeSectionsResponse } from './types';

/**
 * Get API base URL
 * Works in both standalone and Drupal contexts
 */
function getApiBaseUrl(): string {
  if (typeof window === 'undefined') {
    return ''
  }
  
  // Check for data attribute on react-app container
  const container = document.getElementById('react-app')
  if (container) {
    const apiUrl = container.getAttribute('data-api-url')
    if (apiUrl) {
      return apiUrl
    }
  }
  
  // Check environment variable
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_DRUPAL_API_URL) {
    return process.env.NEXT_PUBLIC_DRUPAL_API_URL
  }
  
  // Default to current origin
  return window.location.origin
}

/**
 * Fetch home sections from REST API
 */
export async function fetchHomeSections(): Promise<HomeSectionsResponse['data']> {
  try {
    const baseUrl = getApiBaseUrl()
    const apiUrl = `${baseUrl}/api/home-sections`
    const response = await axios.get<HomeSectionsResponse>(apiUrl)
    return response.data.data
  } catch (error) {
    console.error('Error fetching home sections:', error)
    throw error
  }
}

