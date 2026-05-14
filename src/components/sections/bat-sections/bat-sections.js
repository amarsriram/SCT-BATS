import { BATS } from '../../../data/bats.js';
import { formatPrice, getFinalPrice, getWhatsAppUrl, getCallUrl } from '../../../utils/helpers.js';

export function renderBatSections() {
  const container = document.getElementById('bat-sections-container');
  if (!container) return;
  container.innerHTML = '';

  // --- Screen 1: Hero (30%) + Player (35%) + Storm (35%) ---
  const screen1 = document.createElement('section');
  screen1.className = 'snap-section composite-screen';

  const heroBand = document.createElement('div');
  heroBand.className = 'ch-hero-band';
  heroBand.innerHTML = `
    <div class="ch-hero-img-wrap">
      <img src="/hero.png" alt="SCT Cricket Bats" class="ch-hero-img" fetchpriority="high" decoding="sync" />
    </div>
    <div class="ch-hero-overlay"></div>
    <a href="https://wa.me/918143863355" target="_blank" rel="noopener noreferrer" class="hero-corner-chat">
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      <span>Chat</span>
    </a>
  `;
  screen1.appendChild(heroBand);

  BATS.slice(0, 2).forEach(bat => {
    screen1.appendChild(createBatBand(bat, true));
  });
  container.appendChild(screen1);

  // --- Screen 2: Punisher + Gold + Aqua (33.3% each) ---
  const screen2 = document.createElement('section');
  screen2.className = 'snap-section composite-screen';

  BATS.slice(2).forEach(bat => {
    const band = createBatBand(bat, false);
    band.style.flex = '1 1 33.33%';
    screen2.appendChild(band);
  });
  container.appendChild(screen2);

  // Handle global vertical scroll hint fade
  const scrollRoot = document.getElementById('scroll-root');
  const vHint = document.getElementById('global-scroll-hint');
  if (scrollRoot && vHint) {
    scrollRoot.addEventListener('scroll', () => {
      const scrollHeight = scrollRoot.scrollHeight;
      const scrollTop = scrollRoot.scrollTop;
      const clientHeight = scrollRoot.clientHeight;
      
      // Hide hint when near bottom (last section/footer)
      // Threshold increased to ensure it fades out before hitting the footer
      const nearBottom = (scrollTop + clientHeight) >= (scrollHeight - 150);
      vHint.style.opacity = nearBottom ? '0' : '1';
      vHint.style.visibility = nearBottom ? 'hidden' : 'visible';
    });
  }

  initHorizontalScrolls();
}

function createBatBand(bat, isEager = false) {
  const finalPrice = getFinalPrice(bat.mrp, bat.discount);
  const waUrl = getWhatsAppUrl(bat);
  const callUrl = getCallUrl();

  const loadingStrategy = isEager ? 'fetchpriority="high" decoding="sync"' : 'loading="lazy" decoding="async"';

  const bgStyle = bat.images.bg
    ? `background-image: url('${bat.images.bg}'); background-size: cover; background-position: center;`
    : `background: ${bat.theme.grad};`;

  const band = document.createElement('div');
  band.className = 'bat-band';
  band.id = `bat-${bat.id}`;
  band.style.setProperty('--bat-primary', bat.theme.primary);
  band.style.setProperty('--bat-accent', bat.theme.accent);
  band.style.setProperty('--bat-bg', bat.theme.bg);
  band.style.setProperty('--bat-glow', bat.theme.glow);

  band.innerHTML = `
    <div class="bat-theme-bg" style="${bgStyle}">
      <div class="bat-bg-overlay"></div>
    </div>

    <div class="bat-hscroll" id="hscroll-${bat.id}">
      <div class="bat-hscroll-inner">

        <!-- Frame 1: Badge -->
        <div class="bat-frame frame--badge">
          <div class="frame-info">
            <span class="bat-pill" style="border-color:var(--bat-primary);color:var(--bat-primary)">${bat.grade}</span>
            <h2 class="bat-title">${bat.edition}</h2>
            <p class="bat-subtitle">${bat.willow}</p>
            <div class="swipe-cue">
              <span>Swipe</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
          <div class="frame-peek frame-peek--badge">
            <img src="${bat.images.badge}" alt="${bat.edition} Badge" class="peek-badge" ${loadingStrategy} />
          </div>
        </div>

        <!-- Frame 2: Bat PNG (hero) + minimal desc -->
        <div class="bat-frame frame--bat">
          <div class="frame-bat-hero">
            <img src="${bat.images.bat}" alt="${bat.edition}" class="bat-hero-img" ${loadingStrategy} />
          </div>
          <div class="frame-bat-caption">
            <p class="bat-tagline">${bat.tagline}</p>
          </div>
        </div>

        <!-- Frame 3: Specs -->
        <div class="bat-frame">
          <div class="frame-info">
            <h3 class="specs-heading">Specifications</h3>
            <div class="specs-grid">
              ${bat.details.map(d => `
                <div class="spec-item">
                  <span class="spec-key">${d.label}</span>
                  <span class="spec-val">${d.value}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Frame 4: Price + CTA -->
        <div class="bat-frame">
          <div class="frame-info frame-info--cta">
            <div class="price-block">
              <span class="price-mrp">MRP <s>${formatPrice(bat.mrp)}</s></span>
              <span class="price-off" style="border-color:var(--bat-primary);color:var(--bat-primary)">${bat.discount}% OFF</span>
              <span class="price-final">${formatPrice(finalPrice)}</span>
            </div>
            <div class="cta-row">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="cta-btn cta-btn--order" style="border-color:var(--bat-primary);color:var(--bat-primary)" id="cta-wa-${bat.id}">
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Order Now
              </a>
              <a href="${callUrl}" class="cta-btn cta-btn--call" style="border-color:var(--bat-primary);color:var(--bat-primary)" id="cta-call-${bat.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="band-dots" id="dots-${bat.id}">
      ${[0,1,2,3].map(i => `<span class="dot${i===0?' active':''}" data-idx="${i}"></span>`).join('')}
    </div>
  `;
  return band;
}

function initHorizontalScrolls() {
  BATS.forEach(bat => {
    const track = document.getElementById(`hscroll-${bat.id}`);
    const dots = document.getElementById(`dots-${bat.id}`);
    if (!track || !dots) return;

    const frames = track.querySelectorAll('.bat-frame');
    const dotEls = dots.querySelectorAll('.dot');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(frames).indexOf(entry.target);
          dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
        }
      });
    }, { root: track, threshold: 0.55 });

    frames.forEach(f => observer.observe(f));

    dotEls.forEach(d => {
      d.addEventListener('click', () => {
        const idx = parseInt(d.dataset.idx);
        frames[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      });
    });
  });
}
