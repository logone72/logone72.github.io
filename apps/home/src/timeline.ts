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
  links: HTMLAnchorElement[],
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

export const setupTimeline = () => {
  const sidebar = document.querySelector<HTMLElement>('.sidebar');
  const caption = document.querySelector<HTMLElement>('.reading-position');
  const items = [...document.querySelectorAll<HTMLElement>('.timeline-item')];
  const links = [
    ...document.querySelectorAll<HTMLAnchorElement>('.experience-nav a'),
  ];
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
