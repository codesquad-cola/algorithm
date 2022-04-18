/* 마인크래프트 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M, B] = input.shift().split(' ').map(Number);
const land = Array.from({ length: N }, () => Array());
input.forEach((str) => {
  land.push(str.split(' ').map(Number));
});

const setMap = (map) => {
  for (const row of land) {
    for (const cell of row) {
      if (map.hasOwnProperty(cell)) map[cell]++;
      else map[cell] = 1;
    }
  }
};

const solution = () => {
  const cntMap = {};
  setMap(cntMap);
  const keys = Object.keys(cntMap);

  const DELETE_TIME = 2;
  const ADD_TIME = 1;
  const answer = [Number.MAX_SAFE_INTEGER, -1];

  // key = 블럭의 높이
  // 어떤 높이 x로 다른 블럭의 높이가 모두 바뀌어야함.
  // 블럭 제거: 2초, 블럭 추가: 1초
  let timeCost = 0;
  let blockCost = 0;
  for (let targetHeight = 0; targetHeight < 257; targetHeight++) {
    blockCost = 0;
    for (const key of keys) {
      if (key === targetHeight) continue;
      if (key > targetHeight) blockCost -= (key - targetHeight) * cntMap[key];
      else blockCost += (targetHeight - key) * cntMap[key];
    }

    if (blockCost > B) continue;

    timeCost = 0;
    for (const key of keys) {
      if (key === targetHeight) continue;
      if (key > targetHeight) {
        const diff = key - targetHeight;
        timeCost += diff * cntMap[key] * DELETE_TIME;
      } else {
        const diff = targetHeight - key;
        timeCost += diff * cntMap[key] * ADD_TIME;
      }
    }

    // targetHeight는 낮은 수부터 높은 수로 돌기 때문에
    // >=로 조건을 걸면, 같은 시간이 걸릴 때 더 높은 key값이 들어감.
    if (answer[0] >= timeCost) {
      answer[0] = timeCost;
      answer[1] = targetHeight;
    }
  }
  return answer.join(' ');
};

console.log(solution());
