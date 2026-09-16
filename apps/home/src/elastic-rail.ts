type Ripple = { y: number; strength: number; started: number };
type RailState = {
  x: number;
  height: number;
  y: number;
  pull: number;
  target: number;
  ripples: Ripple[];
};

export const rippleOffset = (
  distance: number,
  age: number,
  strength: number,
) => {
  if (age < 0 || age >= 900) return 0;
  const front = Math.abs(distance) - age * 0.8;
  return (
    Math.cos(front / 24) *
    Math.exp(-((front / 90) ** 2)) *
    Math.exp(-age / 320) *
    (1 - age / 900) *
    Math.max(-10, Math.min(10, strength))
  );
};

export const railOffset = (
  y: number,
  state: RailState,
  now: number,
  knots: number[],
) => {
  const pull = state.pull * Math.exp(-(((y - state.y) / 100) ** 2));
  const wave = state.ripples.reduce(
    (sum, ripple) =>
      sum + rippleOffset(y - ripple.y, now - ripple.started, ripple.strength),
    0,
  );
  const anchor = Math.min(
    1,
    y / 48,
    (state.height - y) / 48,
    ...knots.map((knot) => Math.abs(y - knot) / 36),
  );
  return Math.max(-10, Math.min(10, pull + wave)) * Math.max(0, anchor);
};

const createRailAnimation = (svg: SVGSVGElement, state: RailState) => {
  const path = svg.querySelector('path')!;
  const knots = [...document.querySelectorAll<HTMLElement>('.timeline-anchor')];
  let frame = 0;
  const draw = (now: number) => {
    frame = 0;
    state.pull += (state.target - state.pull) * 0.22;
    if (Math.abs(state.target - state.pull) < 0.01) state.pull = state.target;
    state.ripples = state.ripples.filter(
      (ripple) => now - ripple.started < 900,
    );
    const anchors = knots.map((knot) => knot.getBoundingClientRect().top + 22);
    let data = '';
    for (let y = 0; y <= state.height; y += 8) {
      data += `${y === 0 ? 'M' : 'L'}${20 + railOffset(y, state, now, anchors)},${y} `;
    }
    path.setAttribute('d', `${data}L20,${state.height}`);
    if (state.ripples.length || state.pull !== state.target) request();
  };
  const request = () => {
    if (!frame && !svg.hasAttribute('hidden'))
      frame = requestAnimationFrame(draw);
  };
  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    state.target = state.pull = 0;
    state.ripples = [];
    path.setAttribute('d', `M20,0 L20,${state.height}`);
  };
  const pluck = (y: number, strength: number) => {
    if (
      svg.hasAttribute('hidden') ||
      document.hidden ||
      document.body.classList.contains('intro-active')
    )
      return;
    state.ripples = [
      ...state.ripples.slice(-2),
      { y, strength, started: performance.now() },
    ];
    request();
  };
  return { request, reset, pluck };
};

const bindRailPointer = (
  svg: SVGSVGElement,
  state: RailState,
  animation: ReturnType<typeof createRailAnimation>,
) => {
  let previous: { x: number; time: number } | null = null;
  document.addEventListener('pointermove', (event) => {
    if (
      svg.hasAttribute('hidden') ||
      event.pointerType !== 'mouse' ||
      document.body.classList.contains('intro-active')
    )
      return;
    const distance = event.clientX - state.x;
    const now = performance.now();
    state.y = event.clientY;
    state.target = distance * Math.max(0, 1 - Math.abs(distance) / 48) * 0.55;
    if (previous && (previous.x - state.x) * distance < 0) {
      const speed =
        (event.clientX - previous.x) / Math.max(16, now - previous.time);
      animation.pluck(
        event.clientY,
        Math.sign(speed) * Math.min(10, 3 + Math.abs(speed) * 4),
      );
    }
    previous = { x: event.clientX, time: now };
    if (state.target || state.pull) animation.request();
  });
  const leave = () => {
    previous = null;
    state.target = 0;
    if (state.pull || state.ripples.length) animation.request();
  };
  document.documentElement.addEventListener('pointerleave', leave);
  window.addEventListener('blur', () => {
    leave();
    animation.reset();
  });
  window.addEventListener('scroll', leave, { passive: true });
  document.addEventListener('visibilitychange', () => {
    leave();
    animation.reset();
  });
};

export const setupElasticRail = (reducedMotion: MediaQueryList) => {
  const sidebar = document.querySelector<HTMLElement>('.sidebar');
  if (!sidebar) return () => {};
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('elastic-rail');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<path fill="none" stroke="currentColor" stroke-width="1" />';
  document.body.append(svg);
  const fine = matchMedia(
    '(min-width: 900px) and (hover: hover) and (pointer: fine)',
  );
  const state: RailState = {
    x: 0,
    height: 0,
    y: 0,
    pull: 0,
    target: 0,
    ripples: [],
  };
  const animation = createRailAnimation(svg, state);
  const resize = () => {
    svg.toggleAttribute('hidden', reducedMotion.matches || !fine.matches);
    document.body.classList.toggle(
      'has-elastic-rail',
      !svg.hasAttribute('hidden'),
    );
    state.x = sidebar.getBoundingClientRect().left;
    state.height = innerHeight;
    svg.style.left = `${state.x - 20}px`;
    svg.setAttribute('viewBox', `0 0 40 ${state.height}`);
    animation.reset();
  };
  bindRailPointer(svg, state, animation);
  new ResizeObserver(resize).observe(sidebar);
  window.addEventListener('resize', resize);
  fine.addEventListener('change', resize);
  reducedMotion.addEventListener('change', resize);
  new MutationObserver(() => {
    if (document.body.classList.contains('intro-active')) animation.reset();
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  resize();
  return animation.pluck;
};
