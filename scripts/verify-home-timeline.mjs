// 실행: node --experimental-strip-types scripts/verify-home-timeline.mjs
import assert from 'node:assert/strict';

import { getReadingIndex } from '../apps/home/src/timeline.ts';

assert.equal(getReadingIndex([1100, 1500, 1900, 2300], 300, false), -1);
assert.equal(getReadingIndex([300, 700, 1100, 1500], 300, false), 0);
assert.equal(getReadingIndex([-400, 0, 400, 800], 300, false), 1);
assert.equal(getReadingIndex([-1500, -1100, -700, -300], 300, false), 3);
// 짧은 마지막 항목은 읽기 기준선에 도달하지 않아도 문서 끝에서 활성화됩니다.
assert.equal(getReadingIndex([-800, -400, 0, 400], 300, true), 3);
// 위로 되돌아가거나 화면 높이가 바뀌면 현재 좌표로 다시 계산합니다.
assert.equal(getReadingIndex([0, 400, 800, 1200], 300, false), 0);
assert.equal(getReadingIndex([0, 400, 800, 1200], 600, false), 1);
assert.equal(getReadingIndex([], 300, false), -1);
assert.equal(getReadingIndex([], 300, true), -1);
console.log('Home timeline: 9 checks passed.');
