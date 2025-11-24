/**
 * Scroll animation utility
 * Adds animate-in class to elements when they come into viewport
 */

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll('.home-section:not(.home-section--hero)');
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Observe cards and grid items
  const animatedElements = document.querySelectorAll(
    '.feature-card, .trip-style-card, .special-card, .destination-item, .testimonial-card'
  );
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

