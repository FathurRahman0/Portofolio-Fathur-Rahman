
/* ==========================================================================
   1. GLOBAL
   ========================================================================== */

let currentProjectImages = [];
let modalCloseTimer = null;


/* ==========================================================================
   2. PROJECT DECK / CARD CAROUSEL
   ========================================================================== */

const grid = document.getElementById('project-grid');
let deckActive = 0;

function renderDeck() {

  if (
    !grid ||
    typeof projects === 'undefined' ||
    !projects.length
  ) {
    return;
  }

  grid.innerHTML = '';

  projects.forEach((p, i) => {

    let offset = i - deckActive;

    if (offset > projects.length / 2) {
      offset -= projects.length;
    }

    if (offset < -projects.length / 2) {
      offset += projects.length;
    }

    const card = document.createElement('button');

    card.className =
      'proyek-deck-card focus-ring' +
      (Math.abs(offset) > 2 ? ' is-hidden' : '');

    card.setAttribute(
      'aria-label',
      offset === 0
        ? `Lihat detail ${p.title}`
        : `Tampilkan ${p.title} di depan`
    );

    const translateX = offset * 82;
    const rotate = offset * 9;
    const scale = 1 - Math.min(Math.abs(offset), 3) * 0.12;
    const zIndex = 100 - Math.abs(offset);
    const opacity = Math.abs(offset) > 3 ? 0 : 1;

    card.style.transform =
      `translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`;

    card.style.zIndex = zIndex;
    card.style.opacity = opacity;

    if (Math.abs(offset) >= 1) {
      card.classList.add('is-far');
    }

    card.innerHTML = `
      <img
        src="${p.images?.[0] || ''}"
        alt="Tampilan proyek ${p.title || ''}"
        loading="lazy"
      />

      <div class="deck-card-body">
        <p class="deck-card-title">${p.cardTitle || p.title || ''}</p>

        <p class="deck-card-desc">${p.desc || ''}</p>

        <div class="deck-card-tags">
          ${(p.tools || [])
            .slice(0, 3)
            .map(t => `<span class="tag px-2 py-0.5 rounded-full">${t}</span>`)
            .join('')}
        </div>
      </div>

      <div class="deck-card-footer">

        <span class="deck-card-meta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          ${(p.images || []).length}
        </span>

        <span class="deck-card-cta">
          Lihat Proyek
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </span>

      </div>
    `;

    card.addEventListener('click', () => {
      if (offset === 0) {
        openModal(i);
      } else {
        deckActive = i;
        renderDeck();
      }
    });

    grid.appendChild(card);
  });

  const info = document.getElementById('deck-info');

  if (info) {
    info.textContent = `${deckActive + 1} / ${projects.length}`;
  }
}

renderDeck();


function renderRecentProject() {
  const container = document.getElementById("project-recent-content");

  if (!container || !projects.length) return;

  const latestProject = projects[projects.length - 1];

  container.innerHTML = `
    <div class="project-recent-icon">
      <svg viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="9"/>
        <path d="m8 12 2.5 2.5L16 9"/>
      </svg>
    </div>

    <div class="project-recent-info">
      <h4>${latestProject.cardTitle || latestProject.title}</h4>
      <p>${latestProject.tools.join(" · ")}</p>
    </div>

    <span class="project-done-badge">DONE</span>
  `;
}

renderRecentProject();


document.getElementById('deck-prev')?.addEventListener('click', () => {
  if (typeof projects === 'undefined' || !projects.length) return;
  deckActive = (deckActive - 1 + projects.length) % projects.length;
  renderDeck();
});

document.getElementById('deck-next')?.addEventListener('click', () => {
  if (typeof projects === 'undefined' || !projects.length) return;
  deckActive = (deckActive + 1) % projects.length;
  renderDeck();
});


/* ==========================================================================
   3. PROJECT MODAL
   ========================================================================== */

const modal = document.getElementById('project-modal');

function openModal(index) {

  if (!modal || typeof projects === 'undefined' || !projects[index]) {
    return;
  }

  const p = projects[index];

  currentProjectImages = Array.isArray(p.images) ? p.images : [];

  const modalImg = document.getElementById('modal-img');
  const modalEyebrow = document.getElementById('modal-eyebrow');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTools = document.getElementById('modal-tools');
  const modalFeatures = document.getElementById('modal-features');
  const modalGithub = document.getElementById('modal-github');

  if (modalImg) {
    modalImg.src = p.images?.[0] || '';
    modalImg.alt = `Tampilan proyek ${p.title || ''}`;
  }

  if (modalEyebrow) {
    modalEyebrow.textContent = p.eyebrow || '';
  }

  if (modalTitle) {
    modalTitle.textContent = p.title || '';
  }

  if (modalDesc) {
    modalDesc.textContent = p.desc || '';
  }

  if (modalTools) {
    modalTools.innerHTML = (p.tools || [])
      .map(t => `<span class="tag px-2.5 py-1 rounded-full">${t}</span>`)
      .join('');
  }

  if (modalFeatures) {
    modalFeatures.innerHTML = (p.features || [])
      .map(f => `<li>${f}</li>`)
      .join('');
  }

  if (modalGithub) {
    modalGithub.href = p.github || '#';
    modalGithub.style.display = p.github ? '' : 'none';
  }

  clearTimeout(modalCloseTimer);

  modal.classList.remove('hidden', 'project-modal-closing');
  modal.classList.add('flex');

  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add('project-modal-open');
    });
  });
}

function closeModal() {

  if (!modal) return;

  clearTimeout(modalCloseTimer);

  if (modal.classList.contains('hidden')) return;

  modal.classList.remove('project-modal-open');
  modal.classList.add('project-modal-closing');

  modalCloseTimer = setTimeout(() => {
    modal.classList.add('hidden');
    modal.classList.remove('flex', 'project-modal-closing');
    document.body.style.overflow = '';
  }, 420);
}

document.getElementById('modal-close')?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});


/* ==========================================================================
   4. TESTIMONIAL
   ========================================================================== */

(function () {

  const testiGrid = document.getElementById('testimonial-grid');

  if (!testiGrid || typeof testimonials === 'undefined') return;

  testiGrid.innerHTML = '';

  testimonials.forEach((t) => {

    const card = document.createElement('div');

    card.className = 'surface testimonial-card rounded-xl p-6';
    card.setAttribute('data-reveal', '');

    card.innerHTML = `
      <p class="text-muted text-sm leading-relaxed mb-5">
        "${t.message || ''}"
      </p>

      <p class="font-display font-semibold text-sm">
        ${t.name || ''}
      </p>

      ${t.role
        ? `<p class="font-mono text-xs text-muted mt-0.5">${t.role}</p>`
        : ''}
    `;

    testiGrid.appendChild(card);
  });

})();


/* ==========================================================================
   5. MOBILE MENU — HAMBURGER
   ========================================================================== */

(function () {

  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!navToggle || !mobileMenu) return;

  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

})();


/* ==========================================================================
   6. FLOATING MENU BUTTON / FAB
   ========================================================================== */

(function () {

  const fab = document.getElementById('menu-fab');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!fab || !menu) return;

  fab.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  closeBtn?.addEventListener('click', () => {
    menu.classList.remove('open');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menu.classList.remove('open');
    }
  });

})();


/* ==========================================================================
   7. PRELOADER
   ========================================================================== */

(function () {

  const preloader = document.getElementById('preloader');

  if (!preloader) return;

  const countEl = document.getElementById('preloader-count');
  const barFill = document.getElementById('preloader-bar-fill');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.body.style.overflow = 'hidden';

  function finish() {
    preloader.classList.add('loaded');
    document.body.style.overflow = '';
    setTimeout(() => { preloader.remove(); }, 700);
  }

  if (reduceMotion) {
    finish();
    return;
  }

  let progress = 0;
  const duration = 1600;
  const start = performance.now();

  function tick(now) {

    const elapsed = now - start;

    progress = Math.min(100, Math.round((elapsed / duration) * 100));

    if (countEl) {
      countEl.innerHTML = String(progress).padStart(3, '0') + '<span class="unit">%</span>';
    }

    if (barFill) {
      barFill.style.width = progress + '%';
    }

    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(finish, 200);
    }
  }

  requestAnimationFrame(tick);

})();


/* ==========================================================================
   8. HERO BACKGROUND — SQL / PYTHON TOKENS
   ========================================================================== */

(function () {

  const canvas = document.getElementById('hero-canvas');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let w = 0;
  let h = 0;
  let tokens = [];

  const words = [
    "SELECT", "INSERT", "UPDATE", "DELETE", "WHERE", "JOIN",
    "INNER JOIN", "LEFT JOIN",
    "GROUP BY", "HAVING", "ORDER BY",
    "COUNT()", "SUM()", "AVG()", "MIN()", "MAX()",
    "import pandas", "df.groupby()", "df.merge()",
    "def", "lambda", "for i in", "return", "print()"
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = canvas.width = Math.max(1, Math.floor(rect.width));
    h = canvas.height = Math.max(1, Math.floor(rect.height));
  }

  function spawnToken() {

    const leftZone = Math.random() < 0.5;

    const x = leftZone
      ? Math.random() * (w * 0.22)
      : w - Math.random() * (w * 0.22);

    return {
      text: words[Math.floor(Math.random() * words.length)],
      x,
      y: -20 - Math.random() * h * 0.3,
      speed: 0.3 + Math.random() * 0.6,
      size: 12 + Math.random() * 6,
      opacity: 0.05 + Math.random() * 0.13
    };
  }

  function init() {
    resize();
    const count = Math.max(14, Math.floor(w / 90));
    tokens = Array.from({ length: count }, spawnToken);
  }

  function step() {

    ctx.clearRect(0, 0, w, h);

    for (const t of tokens) {

      t.y += t.speed;

      ctx.font = `500 ${t.size}px "JetBrains Mono", monospace`;
      ctx.fillStyle = `rgba(229, 9, 20, ${t.opacity})`;
      ctx.fillText(t.text, t.x, t.y);

      if (t.y > h + 20) {
        Object.assign(t, spawnToken());
        t.y = -20;
      }
    }

    if (!reduceMotion) {
      requestAnimationFrame(step);
    }
  }

  window.addEventListener('resize', init);

  init();
  step();

})();


/* ==========================================================================
   9. CURSOR TRAIL
   ========================================================================== */

(function () {

  const canvas = document.getElementById('cursor-trail');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const noHover = window.matchMedia('(hover: none)').matches;

  if (reduceMotion || noHover) return;

  let cw = 0;
  let ch = 0;

  function resize() {
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  let dots = [];
  let lastSpawn = 0;

  window.addEventListener('mousemove', (event) => {

    const now = performance.now();

    if (now - lastSpawn < 22) return;

    lastSpawn = now;

    dots.push({
      x: event.clientX,
      y: event.clientY,
      r: Math.random() * 3 + 2.5,
      born: now
    });

    if (dots.length > 60) {
      dots.shift();
    }
  });

  const LIFE = 650;

  function loop() {

    ctx.clearRect(0, 0, cw, ch);

    const now = performance.now();

    dots = dots.filter(d => now - d.born < LIFE);

    for (const d of dots) {

      const t = (now - d.born) / LIFE;
      const alpha = 1 - t;
      const radius = d.r * (1 - t * 0.5);

      ctx.beginPath();
      ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(229, 9, 20, ${alpha * 0.45})`;
      ctx.fill();
    }

    requestAnimationFrame(loop);
  }

  loop();

})();


/* ==========================================================================
   10. LIGHTBOX PROJECT
   ========================================================================== */

(function () {

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const dotsWrap = document.getElementById('lightbox-dots');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');
  const btnBack = document.getElementById('lightbox-back');
  const imgWrap = document.getElementById('modal-img-wrap');

  if (!lightbox || !lightboxImg || !imgWrap) return;

  let currentIndex = 0;

  function renderDots() {

    if (!dotsWrap) return;

    if (currentProjectImages.length <= 1) {
      dotsWrap.innerHTML = '';
      return;
    }

    dotsWrap.innerHTML = currentProjectImages
      .map((_, i) => `
        <button
          class="lightbox-dot ${i === currentIndex ? 'active' : ''}"
          data-i="${i}"
          aria-label="Gambar ${i + 1}">
        </button>
      `)
      .join('');

    dotsWrap.querySelectorAll('.lightbox-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        currentIndex = parseInt(dot.dataset.i, 10);
        update();
      });
    });
  }

  function update() {
    if (!currentProjectImages.length) return;
    lightboxImg.src = currentProjectImages[currentIndex];
    renderDots();
  }

  function updateNavVisibility() {

    const hasMultiple = currentProjectImages.length > 1;

    if (btnPrev) btnPrev.style.display = hasMultiple ? '' : 'none';
    if (btnNext) btnNext.style.display = hasMultiple ? '' : 'none';
  }

  function openLightbox() {
    if (!currentProjectImages.length) return;
    currentIndex = 0;
    updateNavVisibility();
    update();
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {

    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');

    if (modal && !modal.classList.contains('hidden')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  imgWrap.addEventListener('click', openLightbox);

  btnPrev?.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!currentProjectImages.length) return;
    currentIndex = (currentIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
    update();
  });

  btnNext?.addEventListener('click', (event) => {
    event.stopPropagation();
    if (!currentProjectImages.length) return;
    currentIndex = (currentIndex + 1) % currentProjectImages.length;
    update();
  });

  btnBack?.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {

    if (lightbox.classList.contains('hidden')) return;

    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') btnPrev?.click();
    if (event.key === 'ArrowRight') btnNext?.click();
  });

})();


/* ==========================================================================
   11. NAVBAR MARKER
   ========================================================================== */

(function () {

  const navLinksWrap = document.getElementById('nav-links');
  const marker = document.getElementById('nav-marker');
  const sidebarWrap = document.getElementById('curved-sidebar-links');
  const indicator = document.getElementById('curved-indicator');

  const topLinks = navLinksWrap
    ? Array.from(navLinksWrap.querySelectorAll('a'))
    : [];

  const sideLinks = sidebarWrap
    ? Array.from(sidebarWrap.querySelectorAll('a'))
    : [];

  const allLinks = [...topLinks, ...sideLinks];

  function moveMarker(el) {

    if (!marker) return;

    if (!el) {
      marker.style.opacity = '0';
      return;
    }

    marker.style.opacity = '1';
    marker.style.left = el.offsetLeft + 'px';
    marker.style.width = el.offsetWidth + 'px';
  }

  function moveIndicator(el) {

    if (!indicator) return;

    if (!el) {
      indicator.style.opacity = '0';
      return;
    }

    indicator.style.opacity = '1';
    indicator.style.transform = `translateY(${el.offsetTop}px)`;
  }

  function activeTopLink() {
    return topLinks.find(a => a.classList.contains('active')) || null;
  }

  function activeSideLink() {
    return sideLinks.find(a => a.classList.contains('active')) || sideLinks[0] || null;
  }

  topLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      moveMarker(link);
    });
  });

  navLinksWrap?.addEventListener('mouseleave', () => {
    moveMarker(activeTopLink());
  });

  sideLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      moveIndicator(link);
    });
  });

  sidebarWrap?.addEventListener('mouseleave', () => {
    moveIndicator(activeSideLink());
  });

  document.getElementById('menu-fab')?.addEventListener('click', () => {
    setTimeout(() => { moveIndicator(activeSideLink()); }, 60);
  });

  document.getElementById('nav-toggle')?.addEventListener('click', () => {
    setTimeout(() => { moveIndicator(activeSideLink()); }, 60);
  });

  const heroSection = document.getElementById('beranda');

  const sections = [...new Set(allLinks.map(link => link.getAttribute('href')))]
    .map(selector => document.querySelector(selector))
    .filter(Boolean);

  const watchedSections = heroSection ? [heroSection, ...sections] : sections;

  if ('IntersectionObserver' in window && watchedSections.length) {

    const observer = new IntersectionObserver((entries) => {

      const sorted = [...entries].sort(
        (a, b) =>
          (a.target.id === 'beranda' ? 1 : 0) -
          (b.target.id === 'beranda' ? 1 : 0)
      );

      sorted.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const isHero = entry.target.id === 'beranda';
        const id = isHero ? null : '#' + entry.target.id;

        allLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            id !== null && link.getAttribute('href') === id
          );
        });

        if (!navLinksWrap || !navLinksWrap.matches(':hover')) {
          moveMarker(activeTopLink());
        }

        if (!sidebarWrap || !sidebarWrap.matches(':hover')) {
          moveIndicator(activeSideLink());
        }
      });

    }, { rootMargin: '-45% 0px -45% 0px' });

    watchedSections.forEach(section => observer.observe(section));

  } else {

    moveMarker(topLinks[0]);
    moveIndicator(sideLinks[0]);
  }

  setTimeout(() => {
    moveMarker(activeTopLink() || topLinks[0]);
    moveIndicator(activeSideLink());
  }, 100);

})();


/* ==========================================================================
   12. SCROLL REVEAL
   ========================================================================== */

(function () {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sections = document.querySelectorAll('main section');

  sections.forEach((section) => {

    if (section.id === 'beranda') return;

    if (!section.hasAttribute('data-reveal')) {
      section.setAttribute('data-reveal', '');
    }
  });

  const items = document.querySelectorAll('[data-reveal]');

  if (!items.length) return;

  if (reduceMotion) {
    items.forEach(element => {
      element.classList.add('reveal-visible');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    items.forEach(element => {
      element.classList.add('reveal-visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        obs.unobserve(entry.target);
      }
    });

  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  items.forEach(element => observer.observe(element));

})();


/* ==========================================================================
   13. HERO STAGGER ANIMATION
   ========================================================================== */

(function () {

  const hero = document.getElementById('beranda');

  if (!hero) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) return;

  let heroContent = hero.querySelector('.hero-content');

  if (!heroContent) {
    heroContent = hero.querySelector(':scope > div:last-child');
  }

  if (!heroContent) return;

  heroContent.classList.add('hero-content');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroContent.classList.add('hero-ready');
    });
  });

})();


/* ==========================================================================
   14. HERO VIDEO SAFETY
   ========================================================================== */

(function () {

  const video = document.getElementById('hero-video');

  if (!video) return;

  video.muted = true;

  const playPromise = video.play();

  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => {});
  }

})();


/* ==========================================================================
   15. KEYBOARD SHORTCUT
   Tekan "/" untuk fokus ke project
   ========================================================================== */

(function () {

  document.addEventListener('keydown', (event) => {

    const target = event.target;

    const isTyping =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      target?.isContentEditable;

    if (isTyping) return;

    if (event.key === '/') {
      event.preventDefault();
      document.getElementById('proyek')?.scrollIntoView({ behavior: 'smooth' });
    }
  });

})();


/* ==========================================================================
   16. GLOBAL ESCAPE HANDLER
   ========================================================================== */

document.addEventListener('keydown', (event) => {

  if (event.key !== 'Escape') return;

  const certificateLightbox = document.getElementById('certificate-lightbox');

  if (certificateLightbox && !certificateLightbox.classList.contains('hidden')) {
    certificateLightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  const lightbox = document.getElementById('lightbox');

  if (lightbox && !lightbox.classList.contains('hidden')) {

    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');

    if (modal && !modal.classList.contains('hidden')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  if (modal && !modal.classList.contains('hidden')) {
    closeModal();
  }

  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu?.classList.remove('open');
});


/* ==========================================================================
   17. WINDOW LOAD
   ========================================================================== */

window.addEventListener('load', () => {

  window.dispatchEvent(new Event('resize'));

  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      target?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
});


/* ==========================================================================
   18. PORTFOLIO TABS
   ========================================================================== */

(function () {

  const tabs = document.querySelectorAll('[data-portfolio-tab]');
  const panels = document.querySelectorAll('[data-portfolio-panel]');

  if (!tabs.length || !panels.length) return;

  function activateTab(name) {

    tabs.forEach((tab) => {
      const active = tab.dataset.portfolioTab === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      const active = panel.dataset.portfolioPanel === name;
      panel.classList.toggle('active', active);
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activateTab(tab.dataset.portfolioTab);
    });
  });

  activateTab('projects');

})();


/* ==========================================================================
   19. RENDER CERTIFICATES
   ========================================================================== */

(function () {

  const grid = document.getElementById('certificate-grid');

  if (!grid || typeof certificates === 'undefined') return;

  grid.innerHTML = '';

  certificates.forEach((certificate, index) => {

    const card = document.createElement('article');

    card.className = 'portfolio-card certificate-card';

    card.innerHTML = `
      <button
        type="button"
        class="certificate-preview-btn"
        data-certificate-index="${index}"
        aria-label="Perbesar sertifikat ${certificate.title || ''}"
      >
        <img
          src="${certificate.image || ''}"
          alt="Sertifikat ${certificate.title || ''} — ${certificate.issuer || ''}"
          class="certificate-image"
          loading="lazy"
        >

        <div class="certificate-zoom-hint">
          🔍 Klik untuk memperbesar
        </div>
      </button>

      <div class="certificate-body">
        <h3 class="certificate-title">${certificate.title || ''}</h3>
        <p class="certificate-issuer">${certificate.issuer || ''}</p>
        <p class="certificate-desc">${certificate.description || ''}</p>
      </div>

      <div class="certificate-footer">

        <div class="certificate-stat">
          <strong>${certificate.date || ''}</strong>
          <span>Diterbitkan</span>
        </div>

        <button
          type="button"
          class="certificate-cta"
          data-certificate-index="${index}"
        >
          Lihat Sertifikat
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
        </button>

      </div>
    `;

    grid.appendChild(card);
  });

})();


/* ==========================================================================
   20. CERTIFICATE LIGHTBOX
   ========================================================================== */

(function () {

  const lightbox = document.getElementById('certificate-lightbox');
  const lightboxImg = document.getElementById('certificate-lightbox-img');
  const closeBtn = document.getElementById('certificate-lightbox-close');

  if (!lightbox || !lightboxImg || !closeBtn) return;

  document.addEventListener('click', (event) => {

    const button = event.target.closest('[data-certificate-index]');

    if (!button) return;

    const index = Number(button.dataset.certificateIndex);
    const certificate = certificates[index];

    if (!certificate) return;

    lightboxImg.src = certificate.image;
    lightboxImg.alt = `Sertifikat ${certificate.title}`;

    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

})();


/* ==========================================================================
   21. RENDER TECH STACK
   ========================================================================== */

(function () {

  const grid = document.getElementById('tech-stack-grid');

  if (!grid || typeof techStack === 'undefined') return;

  grid.innerHTML = '';

  techStack.forEach((tech) => {

    const card = document.createElement('article');

    card.className = 'portfolio-card tech-stack-card';

    card.innerHTML = `
      <div class="tech-stack-icon-wrap">
        <img
          src="${tech.icon || ''}"
          alt="${tech.name || ''}"
          class="tech-stack-icon"
          loading="lazy"
        >
      </div>

      <div class="tech-stack-info">
        <h3 class="font-display text-lg font-semibold">
          ${tech.name || ''}
        </h3>

        <p class="font-mono text-xs text-muted mt-1">
          ${tech.category || ''}
        </p>
      </div>
    `;

    grid.appendChild(card);
  });

})();


/* ==========================================================================
   22. JUDUL SECTION — ANIMASI MENGALIR (independen dari script reveal lain)
   ========================================================================== */

(function () {

  const titles = document.querySelectorAll('.title-flow');

  if (!titles.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    titles.forEach(el => el.classList.add('title-flow-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('title-flow-visible', entry.isIntersecting);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  titles.forEach(el => observer.observe(el));

})();


/* ==========================================================================
   23. NAVIGASI KEYBOARD UNTUK PROJECT DECK (berguna kalau proyek banyak)
   ========================================================================== */

document.addEventListener('keydown', (event) => {

  const target = event.target;

  const isTyping =
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    target?.isContentEditable;

  if (isTyping) return;

  const modalOpen = modal && !modal.classList.contains('hidden');
  const lightboxOpen = !document.getElementById('lightbox')?.classList.contains('hidden');

  if (modalOpen || lightboxOpen) return;

  if (typeof projects === 'undefined' || !projects.length) return;

  if (event.key === 'ArrowLeft') {
    document.getElementById('deck-prev')?.click();
  }

  if (event.key === 'ArrowRight') {
    document.getElementById('deck-next')?.click();
  }
});


/* ==========================================================================
   24. HERO TYPING ANIMATION
   ========================================================================== */

(function(){

  const roleEl = document.getElementById('typing-role');

  if(!roleEl) return;

  const roles = [
    'IT Student',
    'Aspiring Data Analyst',
    'Data Enthusiast',
    'Tech Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typingSpeed = 100;
  const deletingSpeed = 55;
  const pauseAfterTyping = 1500;
  const pauseAfterDeleting = 400;

  function typeEffect(){

    const currentRole = roles[roleIndex];

    if(!deleting){

      charIndex++;

      roleEl.textContent = currentRole.slice(0, charIndex);

      if(charIndex === currentRole.length){

        setTimeout(() => {
          deleting = true;
          typeEffect();
        }, pauseAfterTyping);

        return;
      }

    } else {

      charIndex--;

      roleEl.textContent = currentRole.slice(0, charIndex);

      if(charIndex === 0){

        roleIndex = (roleIndex + 1) % roles.length;
        deleting = false;

        setTimeout(typeEffect, pauseAfterDeleting);

        return;
      }

    }

    setTimeout(
      typeEffect,
      deleting ? deletingSpeed : typingSpeed
    );
  }

  typeEffect();

})();
