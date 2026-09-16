// 실행: node --experimental-strip-types scripts/verify-home-motion.mjs
import assert from 'node:assert/strict';

import {
  railOffset,
  rippleOffset,
  threadOffset,
} from '../apps/home/src/elastic-rail.ts';

assert.equal(rippleOffset(0, -1, 10), 0);
assert.equal(rippleOffset(0, 900, 24), 0);
assert.equal(rippleOffset(0, 0, 100), 24);
assert.equal(rippleOffset(0, 0, -100), -24);
assert.equal(rippleOffset(80, 100, 10), rippleOffset(-80, 100, 10));
assert.ok(Math.abs(rippleOffset(810, 899, 24)) < 0.01);
// 강한 진폭은 유지하되 원래의 짧은 감쇠 시간으로 돌아옵니다.
assert.ok(rippleOffset(180, 200, 24) > 9);
assert.equal(threadOffset(0, 100), 0);
assert.equal(threadOffset(1, 100), 0);
assert.equal(threadOffset(0.5, -1), 0);
assert.equal(threadOffset(0.5, 720), 0);
// 아직 도착하지 않은 구간과 이미 지나간 구간은 정확히 곧게 유지합니다.
assert.equal(threadOffset(0.5, 120), 0);
assert.equal(threadOffset(0.1, 300), 0);
assert.ok(Math.abs(threadOffset(0.1, 100)) > 5);
assert.ok(threadOffset(0.1, 100) * threadOffset(0.1, 180) < 0);
assert.ok(Math.abs(threadOffset(0.5, 330)) > 0);
assert.equal(threadOffset(0.8, 330), 0);
// 같은 파동 위상에서 이동할수록 약해지고, 65% 이후에는 도달하지 않습니다.
const amplitudes = [0.1, 0.35, 0.5, 0.6, 0.65, 0.8].map((progress) =>
  Math.abs(threadOffset(progress, progress * 560 + 50)),
);
assert.ok(amplitudes[0] > amplitudes[1] && amplitudes[1] > amplitudes[2]);
assert.ok(amplitudes[2] > amplitudes[3] && amplitudes[3] < 0.3);
assert.equal(amplitudes[4], 0);
assert.equal(amplitudes[5], 0);

const state = {
  x: 1100,
  height: 900,
  y: 450,
  pull: 8,
  target: 8,
  ripples: Array.from({ length: 3 }, () => ({
    y: 450,
    strength: 24,
    started: 0,
  })),
};
// 끝점과 경력 접점은 고정하며, 연속 입력으로 파장이 겹쳐도 진폭은 제한합니다.
assert.equal(railOffset(0, state, 0, []), 0);
assert.equal(railOffset(900, state, 0, []), 0);
assert.equal(railOffset(450, state, 0, [450]), 0);
assert.equal(railOffset(450, state, 0, []), 24);
assert.equal(railOffset(450, { ...state, pull: 0 }, 900, []), 0);
console.log('Home motion: 26 checks passed.');
