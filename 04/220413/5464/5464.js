/* 주차장 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const base = [];
const weight = [null];
const order = [];
for (let i = 1; i <= N; i++) {
  base.push(+input[i]); // n번째 주차장 가격
}

for (let i = N + 1; i < N + M + 1; i++) {
  weight.push(+input[i]); // n번째 자동차의 무게
}

for (let i = N + M + 1; i < N + 3 * M + 1; i++) {
  order.push(+input[i]); // 차의 입장 순서
}

const getTotalCost = (carNum, parkNum) => {
  return base[parkNum] * weight[carNum];
};

const solution = (N) => {
  const pQueue = new Array(N).fill(0);
  const wQueue = [];
  let sum = 0;

  const enter = (carNum) => {
    for (let i = 0; i < N; i++) {
      if (pQueue[i] === 0) {
        pQueue[i] = carNum;
        return;
      }
    }

    wQueue.push(carNum);
  };

  const out = (carNum) => {
    const parkNum = pQueue.indexOf(carNum);
    pQueue[parkNum] = 0;
    sum += getTotalCost(carNum, parkNum);
    if (wQueue.length) pQueue[parkNum] = wQueue.shift();
  };

  for (let i = 0; i < 2 * M; i++) {
    const carNum = order[i];
    if (carNum > 0) enter(carNum);
    else out(-carNum);
  }

  return sum;
};

console.log(solution(N));
