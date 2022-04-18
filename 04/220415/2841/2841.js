/* 외계인의 기타연주 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, P] = input[0].split(' ').map(Number);
const melodies = [];
for (let i = 1; i < N + 1; i++) {
  melodies.push(input[i].split(' ').map(Number));
}

// a보다 높은음 b 누르기: 1번
// a보다 낮은음 c 누르기: c를 이미 누르고 있다면 1번, 안누르고 있다면 2번
// 줄마다 독립적

const stackObj = {};

const has = (string) => {
  return stackObj.hasOwnProperty(string);
};

const push = (string, fret, init) => {
  if (init) stackObj[string] = [];
  stackObj[string].push(fret);
};

const peek = (string) => {
  const arr = stackObj[string];
  return arr[arr.length - 1];
};

const countPressingLowerNumber = (string, num) => {
  const prevLength = stackObj[string].length;

  let cnt = 0;
  let i = prevLength - 1;
  while (stackObj[string][i] > num) {
    stackObj[string].pop();
    i--;
    cnt++;
  }

  if (stackObj[string][i] === num) return cnt;

  stackObj[string].push(num);
  return cnt + 1;
};

let cnt = 0;
for (const [string, fret] of melodies) {
  if (!has(string)) {
    push(string, fret, true);
    cnt++;
    continue;
  }

  const prevFret = peek(string);
  if (prevFret === fret) continue;
  if (prevFret < fret) {
    push(string, fret);
    cnt++;
    continue;
  }

  cnt += countPressingLowerNumber(string, fret);
}

console.log(cnt);
