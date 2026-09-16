type Point = { x: number; y: number };
type GridState = {
  size: Point;
  pointer: Point;
  target: Point;
  strength: number;
  active: number;
  frame: number;
};

export const warpGridPoint = (
  point: Point,
  pointer: Point,
  strength: number,
) => {
  const dx = pointer.x - point.x;
  const dy = pointer.y - point.y;
  const distance = Math.hypot(dx, dy);
  const pull = Math.max(0, 1 - distance / 180) ** 2 * strength * 0.2;
  return { x: point.x + dx * pull, y: point.y + dy * pull };
};

const drawGridLines = (
  context: CanvasRenderingContext2D,
  state: GridState,
  vertical: boolean,
) => {
  const step = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--grid-size'),
  );
  const across = vertical ? state.size.x : state.size.y;
  const along = vertical ? state.size.y : state.size.x;
  for (let line = 0; line <= across; line += step) {
    for (let segment = 0; segment <= along + 12; segment += 12) {
      const point = warpGridPoint(
        { x: vertical ? line : segment, y: vertical ? segment : line },
        state.pointer,
        state.strength,
      );
      if (segment === 0) context.moveTo(point.x + 0.5, point.y + 0.5);
      else context.lineTo(point.x + 0.5, point.y + 0.5);
    }
  }
};

const animateGrid = (context: CanvasRenderingContext2D, state: GridState) => {
  state.frame = 0;
  state.strength += (state.active - state.strength) * 0.18;
  state.pointer.x += (state.target.x - state.pointer.x) * 0.22;
  state.pointer.y += (state.target.y - state.pointer.y) * 0.22;
  const moving =
    Math.hypot(
      state.target.x - state.pointer.x,
      state.target.y - state.pointer.y,
    ) > 0.2;
  if (Math.abs(state.active - state.strength) < 0.002)
    state.strength = state.active;
  context.clearRect(0, 0, state.size.x, state.size.y);
  context.strokeStyle = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--grid-line');
  context.lineWidth = 1;
  context.beginPath();
  drawGridLines(context, state, true);
  drawGridLines(context, state, false);
  context.stroke();
  if (moving || state.strength !== state.active) {
    state.frame = requestAnimationFrame(() => animateGrid(context, state));
  }
};

const resizeGrid = (
  canvas: HTMLCanvasElement,
  hero: HTMLElement,
  state: GridState,
) => {
  const rect = hero.getBoundingClientRect();
  state.size = { x: rect.width, y: rect.height };
  const ratio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  canvas.getContext('2d')!.setTransform(ratio, 0, 0, ratio, 0, 0);
  cancelAnimationFrame(state.frame);
  state.frame = state.strength = state.active = 0;
  state.pointer = { ...state.target };
};

const bindGridInput = (
  hero: HTMLElement,
  update: (event: PointerEvent | null) => void,
) => {
  hero.addEventListener('pointermove', (event) => {
    if (
      event.pointerType === 'mouse' &&
      !document.body.classList.contains('intro-active')
    )
      update(event);
  });
  hero.addEventListener('pointerleave', () => update(null));
  window.addEventListener('scroll', () => update(null), { passive: true });
  window.addEventListener('blur', () => update(null));
  document.addEventListener('visibilitychange', () => update(null));
};

export const setupHeroGrid = (reducedMotion: MediaQueryList) => {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;
  canvas.className = 'hero-grid';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);
  const fine = matchMedia(
    '(min-width: 900px) and (hover: hover) and (pointer: fine)',
  );
  const state: GridState = {
    size: { x: 0, y: 0 },
    pointer: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    strength: 0,
    active: 0,
    frame: 0,
  };
  const requestDraw = () => {
    if (!state.frame && !canvas.hidden)
      state.frame = requestAnimationFrame(() => animateGrid(context, state));
  };
  const resize = () => {
    canvas.hidden = reducedMotion.matches || !fine.matches;
    document.body.classList.toggle('has-hero-grid', !canvas.hidden);
    resizeGrid(canvas, hero, state);
    requestDraw();
  };
  bindGridInput(hero, (event) => {
    if (canvas.hidden || (!event && state.active === 0)) return;
    const rect = hero.getBoundingClientRect();
    state.active = event ? 1 : 0;
    if (event)
      state.target = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    requestDraw();
  });
  new ResizeObserver(resize).observe(hero);
  new MutationObserver(requestDraw).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  fine.addEventListener('change', resize);
  reducedMotion.addEventListener('change', resize);
  resize();
};
