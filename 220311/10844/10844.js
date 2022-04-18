/* 쉬운 계단수 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const N = +fs.readFileSync(filePath).toString().trim();

const solution = (N) => {
  if (N === 1) return 9;

  const mod = 1_000_000_000;
  let prev = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  let cur = [];

  for (let i = 1; i < N; i++) {
    for (let j = 0; j < 10; j++) {
      cur[j] = ((prev[j - 1] ?? 0) + (prev[j + 1] ?? 0)) % mod;
    }
    prev = [...cur];
  }

  return cur.reduce((acc, cur) => acc + cur) % mod;
};

console.log(solution(N));
