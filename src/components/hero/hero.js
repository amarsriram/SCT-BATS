import { BATS } from '../../data/bats.js';

export function renderCompositeHero() {
  const section = document.getElementById('composite-hero');
  section.classList.add('snap-section', 'composite-hero');

  const player = BATS.find(b => b.id === 'player');
  const storm = BATS.find(b => b.id === 'storm');

  section.innerHTML = `
    <!-- Top 30%: Hero Image -->
    <div class="ch-hero-band" id="ch-hero-band">
      <div class="ch-hero-img-wrap">
        <img src="/hero.png" alt="SCT Cricket Bats" class="ch-hero-img" />
      </div>
      <div class="ch-hero-overlay"></div>
    </div>

    <!-- Middle 35%: Player Preview -->
    <div class="ch-bat-band ch-player-band" id="ch-player-band"
         style="--bat-primary:${player.theme.primary};--bat-accent:${player.theme.accent};--bat-glow:${player.theme.glow}">
      <div class="ch-bat-bg" style="background:${player.theme.grad}"></div>
      <div class="ch-bat-bg-overlay"></div>
      <div class="ch-bat-info">
        <span class="ch-bat-grade" style="border-color:${player.theme.primary};color:${player.theme.primary}">${player.grade}</span>
        <h2 class="ch-bat-name">${player.edition}</h2>
        <p class="ch-bat-willow">${player.willow}</p>
        <p class="ch-bat-tagline">${player.tagline}</p>
      </div>
      <div class="ch-bat-peek">
        <img src="${player.images.bat}" alt="${player.edition}" class="ch-bat-peek-img" loading="eager" />
      </div>
      <button class="ch-explore-btn" data-target="bat-player" id="explore-player">
        Explore
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- Bottom 35%: Storm Preview -->
    <div class="ch-bat-band ch-storm-band" id="ch-storm-band"
         style="--bat-primary:${storm.theme.primary};--bat-accent:${storm.theme.accent};--bat-glow:${storm.theme.glow}">
      <div class="ch-bat-bg" style="background:${storm.theme.grad}"></div>
      <div class="ch-bat-bg-overlay"></div>
      <div class="ch-bat-info">
        <span class="ch-bat-grade" style="border-color:${storm.theme.primary};color:${storm.theme.primary}">${storm.grade}</span>
        <h2 class="ch-bat-name">${storm.edition}</h2>
        <p class="ch-bat-willow">${storm.willow}</p>
        <p class="ch-bat-tagline">${storm.tagline}</p>
      </div>
      <div class="ch-bat-peek">
        <img src="${storm.images.bat}" alt="${storm.edition}" class="ch-bat-peek-img" loading="eager" />
      </div>
      <button class="ch-explore-btn" data-target="bat-storm" id="explore-storm">
        Explore
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>

    <div class="ch-scroll-hint">
      <div class="ch-scroll-dot"></div>
      <span>Scroll</span>
    </div>
  `;

  // Explore buttons → scroll to corresponding bat section
  section.querySelectorAll('.ch-explore-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const scrollRoot = document.getElementById('scroll-root');
      const target = document.getElementById(targetId);
      if (target && scrollRoot) {
        scrollRoot.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      }
    });
  });
}
