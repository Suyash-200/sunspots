/**
 * Entry point for mounting React app
 * Works both standalone and embedded in Drupal
 */

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import './styles/globals.css'

// Track if app is already mounted
let appMounted = false
let mountAttempts = 0
const MAX_ATTEMPTS = 10

/**
 * Mount React app to #react-app container
 */
function mountApp() {
  mountAttempts++
  
  // Prevent duplicate mounts
  if (appMounted) {
    console.log('[React App] Already mounted, skipping')
    return
  }

  const container = document.getElementById('react-app')
  
  if (!container) {
    console.log(`[React App] Container #react-app not found (attempt ${mountAttempts}/${MAX_ATTEMPTS})`)
    // Retry if not found and haven't exceeded max attempts
    if (mountAttempts < MAX_ATTEMPTS) {
      setTimeout(mountApp, 100)
    }
    return
  }

  // Check if already mounted
  if (container.hasAttribute('data-react-mounted')) {
    console.log('[React App] Container already marked as mounted')
    appMounted = true
    return
  }

  try {
    console.log('[React App] Mounting to #react-app container')
    // Create root and render
    const root = createRoot(container)
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
    
    // Mark as mounted
    container.setAttribute('data-react-mounted', 'true')
    appMounted = true
    console.log('[React App] Successfully mounted')
  } catch (error) {
    console.error('[React App] Error mounting:', error)
  }
}

// Mount when DOM is ready
if (typeof window !== 'undefined') {
  console.log('[React App] Script loaded, readyState:', document.readyState)
  
  // Try immediate mount
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('[React App] DOM already ready, attempting immediate mount')
    setTimeout(mountApp, 50)
  } else {
    console.log('[React App] Waiting for DOMContentLoaded')
    document.addEventListener('DOMContentLoaded', () => {
      console.log('[React App] DOMContentLoaded fired')
      setTimeout(mountApp, 50)
    })
  }
  
  // Fallback: try after a delay
  setTimeout(() => {
    if (!appMounted) {
      console.log('[React App] Fallback mount attempt')
      mountApp()
    }
  }, 500)
}

