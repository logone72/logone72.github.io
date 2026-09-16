export const getReadingIndex = (
  positions: number[],
  readingLine: number,
  atBottom: boolean,
) =>
  atBottom
    ? positions.length - 1
    : positions.findLastIndex((top) => top <= readingLine);

const markCurrentItem = (
  items: HTMLElement[],
  links: Element[],
  current: number,
) => {
  items.forEach((item, index) =>
    item.classList.toggle('is-current', index === current),
  );
  links.forEach((link, index) => {
    if (index === current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
};

export const setupTimeline = (onArrive: (item: HTMLElement) => void) => {
  const sidebar = document.querySelector<HTMLElement>('.sidebar');
  const caption = document.querySelector<HTMLElement>('.reading-position');
  const items = [...document.querySelectorAll<HTMLElement>('.timeline-item')];
  const links = [...document.querySelectorAll('.experience-nav a')];
  if (!sidebar || !caption || !items.length) return;

  const label = caption.textContent;
  let current = -1;
  let frame = 0;
  let toolbarHeight = 0;

  const update = () => {
    frame = 0;
    const positions = items.map((item) => item.getBoundingClientRect().top);
    const readingLine =
      Math.max(window.innerHeight / 3, toolbarHeight + 24) + 1;
    const atBottom =
      window.scrollY > 0 &&
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
    const next = getReadingIndex(positions, readingLine, atBottom);
    if (next === current) return;
    current = next;
    markCurrentItem(items, links, current);
    if (items[current]) onArrive(items[current]);
    caption.textContent =
      links[current]?.querySelector('.experience-nav-company')?.textContent ??
      label;
  };

  const measure = () => {
    toolbarHeight = window.matchMedia('(max-width: 899px)').matches
      ? sidebar.getBoundingClientRect().height
      : 0;
    document.documentElement.style.setProperty(
      '--reading-offset',
      `${toolbarHeight}px`,
    );
    update();
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!frame) frame = requestAnimationFrame(update);
    },
    { passive: true },
  );
  window.addEventListener('resize', measure);
  new ResizeObserver(measure).observe(sidebar);
  measure();
};

const setupKnotMagnet = (reducedMotion: MediaQueryList) => {
  document
    .querySelectorAll<HTMLElement>('.timeline-anchor')
    .forEach((anchor) => {
      const knot = anchor.querySelector<HTMLElement>('.timeline-knot')!;
      const reset = () => {
        knot.style.removeProperty('--knot-x');
        knot.style.removeProperty('--knot-y');
      };
      anchor.addEventListener('pointermove', (event) => {
        if (
          reducedMotion.matches ||
          event.pointerType !== 'mouse' ||
          innerWidth < 900
        )
          return;
        const rect = anchor.getBoundingClientRect();
        knot.style.setProperty(
          '--knot-x',
          `${(event.clientX - rect.left - 22) * 0.14}px`,
        );
        knot.style.setProperty(
          '--knot-y',
          `${(event.clientY - rect.top - 22) * 0.14}px`,
        );
      });
      anchor.addEventListener('pointerleave', reset);
      anchor.addEventListener('blur', reset);
      reducedMotion.addEventListener('change', reset);
      window.addEventListener('resize', reset);
    });
};

const bindTimelineLinks = (select: (link: HTMLAnchorElement) => void) => {
  document
    .querySelectorAll<HTMLAnchorElement>('.experience-nav a, .timeline-anchor')
    .forEach((link) => {
      link.addEventListener('click', (event) => {
        if (
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        select(link);
      });
    });
};

export const setupTimelineFeedback = (
  reducedMotion: MediaQueryList,
  pluck: (y: number, strength: number) => void,
) => {
  setupKnotMagnet(reducedMotion);
  let pending: HTMLElement | null = null;
  let timer = 0;
  let animation: Animation | undefined;
  const cancel = () => {
    clearTimeout(timer);
    pending = null;
    animation?.cancel();
  };
  const arrive = () => {
    const item = pending;
    pending = null;
    if (!item?.classList.contains('is-current') || reducedMotion.matches)
      return;
    const knot = item.querySelector<HTMLElement>('.timeline-knot')!;
    animation = knot.animate(
      [
        { scale: 1 },
        { scale: 1.8, offset: 0.25 },
        { scale: 0.85, offset: 0.6 },
        { scale: 1 },
      ],
      { duration: 600, easing: 'ease-out' },
    );
  };
  const settle = () => {
    clearTimeout(timer);
    if (pending) timer = window.setTimeout(arrive, 160);
  };
  bindTimelineLinks((link) => {
    cancel();
    pending = document.getElementById(link.hash.slice(1));
    pluck(link.getBoundingClientRect().top + 22, 16);
    settle();
  });
  window.addEventListener('scroll', settle, { passive: true });
  window.addEventListener('wheel', cancel, { passive: true });
  window.addEventListener('touchstart', cancel, { passive: true });
  window.addEventListener('blur', cancel);
  document.addEventListener('visibilitychange', cancel);
  document
    .querySelector('[data-replay-intro]')
    ?.addEventListener('click', cancel);
  reducedMotion.addEventListener('change', cancel);
};
