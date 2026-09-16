// 실행: node --experimental-strip-types scripts/verify-home-motion.mjs
import assert from 'node:assert/strict';

import { railOffset, rippleOffset } from '../apps/home/src/elastic-rail.ts';
import { warpGridPoint } from '../apps/home/src/hero-grid.ts';

const point = { x: 60, y: 80 };
assert.deepEqual(warpGridPoint(point, { x: 0, y: 0 }, 0), point);
assert.deepEqual(warpGridPoint(point, point, 1), point);
assert.deepEqual(warpGridPoint(point, { x: 600, y: 800 }, 1), point);
const warped = warpGridPoint(point, { x: 0, y: 0 }, 1);
assert.ok(warped.x < point.x && warped.y < point.y);
assert.ok(Math.hypot(warped.x - point.x, warped.y - point.y) < 8);
assert.equal(rippleOffset(0, -1, 10), 0);
assert.equal(rippleOffset(0, 900, 10), 0);
assert.equal(rippleOffset(0, 0, 100), 10);
assert.equal(rippleOffset(0, 0, -100), -10);
assert.equal(rippleOffset(80, 100, 10), rippleOffset(-80, 100, 10));
assert.ok(Math.abs(rippleOffset(720, 899, 10)) < 0.01);

const state = {
  x: 1100,
  height: 900,
  y: 450,
  pull: 8,
  target: 8,
  ripples: Array.from({ length: 3 }, () => ({
    y: 450,
    strength: 10,
    started: 0,
  })),
};
// 끝점과 경력 접점은 고정하며, 연속 입력으로 파장이 겹쳐도 진폭은 제한합니다.
assert.equal(railOffset(0, state, 0, []), 0);
assert.equal(railOffset(900, state, 0, []), 0);
assert.equal(railOffset(450, state, 0, [450]), 0);
assert.equal(railOffset(450, state, 0, []), 10);
assert.equal(railOffset(450, { ...state, pull: 0 }, 900, []), 0);
console.log('Home motion: 16 checks passed.');
