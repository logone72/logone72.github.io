const RIPPLE_DURATION = 900;
const MAX_DISPLACEMENT = 24;
const THREAD_REACH = 0.65;

type Ripple = {
  y: number;
  strength: number;
  started: number;
  source?: HTMLElement;
};
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
  if (age < 0 || age >= RIPPLE_DURATION) return 0;
  const front = Math.abs(distance) - age * 0.9;
  return (
    Math.cos(front / 32) *
    Math.exp(-((front / 150) ** 2)) *
    Math.exp(-age / 320) *
    (1 - age / RIPPLE_DURATION) *
    Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, strength))
  );
};

export const threadOffset = (progress: number, age: number) => {
  // 점에서 출발한 파동은 이동하면서 약해져 선 끝에 닿기 전에 사라집니다.
  const localAge = age - progress * 560;
  if (progress <= 0 || progress >= THREAD_REACH) return 0;
  if (localAge <= 0 || localAge >= 160) return 0;
  const phase = localAge / 160;
  return (
    Math.sin(phase * Math.PI * 2) *
    Math.sin(phase * Math.PI) ** 2 *
    (1 - (progress / THREAD_REACH) ** 2) ** 2 *
    Math.min(1, progress / 0.04) *
    18
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
  return (
    Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, pull + wave)) *
    Math.max(0, anchor)
  );
};

const drawRail = (
  path: SVGPathElement,
  state: RailState,
  now: number,
  knots: HTMLElement[],
) => {
  state.pull += (state.target - state.pull) * 0.22;
  if (Math.abs(state.target - state.pull) < 0.01) state.pull = state.target;
  state.ripples = state.ripples.filter(
    (ripple) => now - ripple.started < RIPPLE_DURATION,
  );
  state.ripples.forEach((ripple) => {
    if (ripple.source) ripple.y = ripple.source.getBoundingClientRect().top;
  });
  const anchors = knots.map((knot) => knot.getBoundingClientRect().top + 22);
  let data = '';
  for (let y = 0; y <= state.height; y += 8) {
    data += `${y === 0 ? 'M' : 'L'}${20 + railOffset(y, state, now, anchors)},${y} `;
  }
  path.setAttribute('d', `${data}L20,${state.height}`);
};

type Arrival = { path: SVGPathElement; started: number };
const drawThread = (arrival: Arrival | null, now: number) => {
  if (!arrival) return null;
  const age = now - arrival.started;
  if (age >= THREAD_REACH * 560 + 160) {
    arrival.path.setAttribute('d', 'M1000,16 L0,16');
    return null;
  }
  let data = '';
  for (let step = 0; step <= 64; step++) {
    const progress = step / 64;
    data += `${step === 0 ? 'M' : 'L'}${1000 * (1 - progress)},${16 + threadOffset(progress, age)} `;
  }
  arrival.path.setAttribute('d', data);
  return arrival;
};

const canAnimateRail = (svg: SVGSVGElement) =>
  !svg.hasAttribute('hidden') &&
  !document.hidden &&
  !document.body.classList.contains('intro-active');

const createRailAnimation = (svg: SVGSVGElement, state: RailState) => {
  const path = svg.querySelector('path')!;
  const knots = [...document.querySelectorAll<HTMLElement>('.timeline-anchor')];
  let frame = 0;
  let arrival: Arrival | null = null;
  const resetThread = () => {
    arrival?.path.setAttribute('d', 'M1000,16 L0,16');
    arrival = null;
  };
  const draw = (now: number) => {
    frame = 0;
    drawRail(path, state, now, knots);
    arrival = drawThread(arrival, now);
    if (state.ripples.length || arrival || state.pull !== state.target)
      request();
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
    resetThread();
    path.setAttribute('d', `M20,0 L20,${state.height}`);
  };
  const pluck = (y: number, strength: number, source?: HTMLElement) => {
    if (!canAnimateRail(svg)) return;
    state.ripples = [
      ...state.ripples.slice(-2),
      { y, strength, started: performance.now(), source },
    ];
    request();
  };
  const arrive = (item: HTMLElement) => {
    resetThread();
    if (!canAnimateRail(svg)) return;
    const thread = item.querySelector<SVGPathElement>('.timeline-thread path');
    if (!thread) return;
    arrival = { path: thread, started: performance.now() };
    pluck(item.getBoundingClientRect().top, 24, item);
  };
  return { request, reset, pluck, arrive };
};

const bindRailPointer = (
  svg: SVGSVGElement,
  state: RailState,
  animation: ReturnType<typeof createRailAnimation>,
) => {
  let previous: { x: number; time: number } | null = null;
  document.addEventListener('pointermove', (event) => {
    if (!canAnimateRail(svg) || event.pointerType !== 'mouse') return;
    const distance = event.clientX - state.x;
    const now = performance.now();
    state.y = event.clientY;
    state.target = distance * Math.max(0, 1 - Math.abs(distance) / 76) * 0.95;
    if (previous && (previous.x - state.x) * distance < 0) {
      const speed =
        (event.clientX - previous.x) / Math.max(16, now - previous.time);
      animation.pluck(
        event.clientY,
        Math.sign(speed) * Math.min(MAX_DISPLACEMENT, 14 + Math.abs(speed) * 7),
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
  if (!sidebar) return { pluck: () => {}, arrive: () => {} };
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
  return { pluck: animation.pluck, arrive: animation.arrive };
};
