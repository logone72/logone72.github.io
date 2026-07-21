const FULL_DURATION = 2800;
const SHORT_DURATION = 700;
const SEGMENTS = 32;

type IntroOptions = {
  canvas: HTMLCanvasElement;
  overlay: HTMLElement;
  replayButton: HTMLButtonElement;
  reducedMotion: MediaQueryList;
};

type CanvasSize = {
  height: number;
  width: number;
};

type WaveOptions = {
  count: number;
  index: number;
  opacity: number;
  progress: number;
  size: CanvasSize;
  targetX: number;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
const mix = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

const resizeCanvas = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
): CanvasSize => {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  return { height, width };
};

const drawWave = (
  context: CanvasRenderingContext2D,
  { count, index, opacity, progress, size, targetX }: WaveOptions,
) => {
  const convergence = ease((progress - 0.46) / 0.54);
  const delay = (index / count) * 0.14;
  const visibility = ease((progress - delay) / 0.24);
  const baseX = ((index + 0.5) / count) * size.width;
  const lineX = mix(baseX, targetX, convergence);
  const amplitude = (10 + (index % 5) * 2.5) * (1 - convergence);
  const primary = index === Math.floor(count * 0.68);

  context.beginPath();
  for (let segment = 0; segment <= SEGMENTS; segment += 1) {
    const y = (segment / SEGMENTS) * size.height;
    const wave = Math.sin(y * 0.015 + progress * 12 + index * 0.72);
    const x = lineX + wave * amplitude;
    if (segment === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.globalAlpha =
    visibility * (primary ? 0.78 : 0.34 * (1 - convergence)) * opacity;
  context.stroke();
};

const drawMobileFinish = (
  context: CanvasRenderingContext2D,
  size: CanvasSize,
  turn: number,
  toolbarHeight: number,
) => {
  context.globalAlpha = turn;
  context.beginPath();
  context.moveTo(mix(size.width / 2, 0, turn), mix(0, toolbarHeight, turn));
  context.lineTo(
    mix(size.width / 2, size.width, turn),
    mix(size.height, toolbarHeight, turn),
  );
  context.stroke();
};

const drawFrame = (
  context: CanvasRenderingContext2D,
  size: CanvasSize,
  progress: number,
) => {
  const desktop = window.matchMedia('(min-width: 900px)').matches;
  const styles = getComputedStyle(document.documentElement);
  const railWidth = Number.parseFloat(styles.getPropertyValue('--rail-width'));
  const toolbarHeight = Number.parseFloat(
    styles.getPropertyValue('--toolbar-height'),
  );
  const targetX = desktop ? size.width - railWidth : size.width / 2;
  const mobileTurn = desktop ? 0 : ease((progress - 0.76) / 0.24);
  const count = desktop ? 26 : 18;

  context.clearRect(0, 0, size.width, size.height);
  context.strokeStyle = styles.getPropertyValue('--intro-line');
  context.lineWidth = 1;
  for (let index = 0; index < count; index += 1) {
    drawWave(context, {
      count,
      index,
      opacity: 1 - mobileTurn,
      progress,
      size,
      targetX,
    });
  }
  if (!desktop) {
    drawMobileFinish(context, size, mobileTurn, toolbarHeight);
  }
  context.globalAlpha = 1;
};

const createAnimation = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  overlay: HTMLElement,
) => {
  let frame = 0;
  let running = false;
  let size = resizeCanvas(canvas, context);

  const finish = (instant = false) => {
    cancelAnimationFrame(frame);
    running = false;
    document.body.classList.remove('intro-active');
    overlay.classList.add('is-complete');
    window.setTimeout(
      () => {
        overlay.hidden = true;
      },
      instant ? 0 : 320,
    );
  };

  const play = (duration: number) => {
    const startedAt = performance.now();
    size = resizeCanvas(canvas, context);
    delete document.documentElement.dataset.intro;
    overlay.hidden = false;
    overlay.classList.remove('is-complete');
    document.body.classList.add('intro-active');
    running = true;

    const animate = (timestamp: number) => {
      const progress = clamp((timestamp - startedAt) / duration);
      drawFrame(context, size, progress);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        finish();
      }
    };

    frame = requestAnimationFrame(animate);
  };

  return {
    finish: () => {
      if (running) finish();
    },
    finishImmediately: () => finish(true),
    play,
    resize: () => {
      if (running) size = resizeCanvas(canvas, context);
    },
  };
};

export const setupIntro = ({
  canvas,
  overlay,
  replayButton,
  reducedMotion,
}: IntroOptions) => {
  const context = canvas.getContext('2d');
  if (!context) return;

  const animation = createAnimation(canvas, context, overlay);
  overlay.addEventListener('click', animation.finish);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') animation.finish();
  });
  replayButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, left: 0 });
    animation.play(reducedMotion.matches ? SHORT_DURATION : FULL_DURATION);
  });
  window.addEventListener('resize', animation.resize);

  const alreadySeen = document.documentElement.dataset.intro === 'seen';
  delete document.documentElement.dataset.intro;
  if (alreadySeen || reducedMotion.matches) {
    animation.finishImmediately();
  } else {
    try {
      sessionStorage.setItem('home-intro-seen', 'true');
    } catch {
      // The intro can still run when session storage is unavailable.
    }
    animation.play(FULL_DURATION);
  }
};
