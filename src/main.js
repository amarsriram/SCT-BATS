import './styles/index.css';
import { renderBatSections } from './components/sections/bat-sections/bat-sections.js';
import { renderFooter } from './components/layout/footer/footer.js';

document.addEventListener('DOMContentLoaded', () => {
  renderBatSections();
  renderFooter();

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
