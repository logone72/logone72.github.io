import './style.css';

import { routes } from '../../../src/router/index.mjs';
import { contentByLocale, type HomeContent, type Locale } from './content';
import { setupIntro } from './intro';

const renderExperience = (content: HomeContent) =>
  content.experience
    .map(
      (entry, index) => `
        <article class="timeline-item" data-reveal>
          <p class="timeline-index">${String(index + 1).padStart(2, '0')}</p>
          <div class="timeline-period">${entry.period}</div>
          <div class="timeline-copy">
            <p class="timeline-company">${entry.company}</p>
            <h3>${entry.role}</h3>
            <p class="timeline-description">${entry.description}</p>
            <ul class="skill-list" aria-label="${content.skillsLabel}">
              ${entry.skills.map((skill) => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        </article>
      `,
    )
    .join('');

const renderLocaleLinks = (content: HomeContent, locale: Locale) => `
  <nav class="locale-switch" aria-label="${content.languageLabel}">
    <a href="${routes.home}" ${locale === 'en' ? 'aria-current="page"' : ''}>EN</a>
    <span aria-hidden="true">/</span>
    <a href="${routes.homeKo}" ${locale === 'ko' ? 'aria-current="page"' : ''}>KO</a>
  </nav>
`;

const renderHome = (content: HomeContent, locale: Locale) => `
  <div class="intro-overlay" data-intro-overlay>
    <canvas data-intro-canvas aria-hidden="true"></canvas>
    <div class="intro-status">
      <span>${content.introLabel}</span>
      <button type="button" data-skip-intro>${content.skipIntro}</button>
    </div>
  </div>

  <div class="site-shell">
    <aside class="sidebar" aria-label="${content.profileLabel}">
      <div class="profile-block">
        <p class="micro-label">${content.profileLabel}</p>
        <p class="profile-name">${content.name}</p>
        <p>${content.role}<br />${content.location}</p>
      </div>

      <nav class="primary-links" aria-label="${content.primaryLabel}">
        <a href="${routes.blog}" aria-label="Blog">Blog</a>
        <a href="${content.github}" target="_blank" rel="noreferrer" aria-label="GitHub">GitHub</a>
        <a href="mailto:${content.email}" aria-label="Email">Email</a>
      </nav>

      <div class="utility-controls">
        ${renderLocaleLinks(content, locale)}
        <button type="button" data-theme-toggle></button>
        <button type="button" data-replay-intro aria-label="${content.replayIntro}">${content.replayIntro}</button>
      </div>
    </aside>

    <main class="main-content">
      <section class="hero" aria-labelledby="site-title">
        <div>
          <h1 id="site-title">${content.name}</h1>
          <p class="hero-role">${content.role}</p>
        </div>
        <p class="hero-summary">${content.summary}</p>
        <a class="scroll-link" href="#experience">
          <span>${content.scrollLabel}</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section class="experience" id="experience" aria-labelledby="experience-title">
        <header class="section-heading" data-reveal>
          <p class="micro-label">${content.experienceLabel}</p>
          <h2 id="experience-title">${content.experienceTitle}</h2>
        </header>
        <div class="timeline">${renderExperience(content)}</div>
      </section>
    </main>
  </div>
`;

const setupTheme = (content: HomeContent) => {
  const button = document.querySelector<HTMLButtonElement>(
    '[data-theme-toggle]',
  );
  if (!button) return;

  const updateButton = () => {
    const dark = document.documentElement.dataset.theme === 'dark';
    const label = dark ? content.themeLight : content.themeDark;
    button.textContent = label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(dark));
  };

  button.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('home-theme', next);
    } catch {
      // The active theme still works when persistent storage is unavailable.
    }
    updateButton();
  });
  updateButton();
};

const setupReveals = (reducedMotion: MediaQueryList) => {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.16 },
  );
  elements.forEach((element) => observer.observe(element));
};

const app = document.querySelector<HTMLDivElement>('#app');
const locale: Locale = document.documentElement.lang.startsWith('ko')
  ? 'ko'
  : 'en';
const content = contentByLocale[locale];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (app) {
  app.innerHTML = renderHome(content, locale);
  setupTheme(content);
  setupReveals(reducedMotion);

  const canvas = document.querySelector<HTMLCanvasElement>(
    '[data-intro-canvas]',
  );
  const overlay = document.querySelector<HTMLElement>('[data-intro-overlay]');
  const replayButton = document.querySelector<HTMLButtonElement>(
    '[data-replay-intro]',
  );

  if (canvas && overlay && replayButton) {
    setupIntro({ canvas, overlay, replayButton, reducedMotion });
  }
}
