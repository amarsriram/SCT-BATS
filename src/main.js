import './styles/index.css';
import { renderBatSections } from './components/sections/bat-sections/bat-sections.js';
import { renderFooter } from './components/layout/footer/footer.js';

// Prevent browser from restoring scroll position (which often causes the "open at bottom" bug)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  renderBatSections();
  renderFooter();

  // Force scroll to top immediately after render
  const scrollRoot = document.getElementById('scroll-root');
  if (scrollRoot) {
    scrollRoot.scrollTop = 0;
    // Some browsers need a tiny delay if content is still rendering
    requestAnimationFrame(() => {
      scrollRoot.scrollTop = 0;
    });
  }

  // Smooth scroll for nav links if needed
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
