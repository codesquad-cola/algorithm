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

  const answer = [Number.MAX_SAFE_INTEGER, -1];

  // key = 블럭의 높이
  // 어떤 높이 x로 다른 블럭의 높이가 모두 바뀌어야함.
  // 블럭 제거: 2초, 블럭 추가: 1초
  let addCnt;
  let delCnt;

  for (let targetHeight = 0; targetHeight < 257; targetHeight++) {
    addCnt = 0;
    delCnt = 0;

    for (const key of keys) {
      if (key === targetHeight) continue;
      if (key > targetHeight) delCnt += (key - targetHeight) * cntMap[key];
      else addCnt += (targetHeight - key) * cntMap[key];
    }

    if (addCnt - delCnt > B) continue;
    timeCost = addCnt + delCnt * 2;

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
