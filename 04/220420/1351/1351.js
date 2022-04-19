/* 무한수열 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');
const [N, P, Q] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const map = { 0: 1, 1: 2 };
const dp = (n) => {
  if (Object.hasOwn(map, n)) return map[n];

  map[n] = dp(Math.floor(n / P)) + dp(Math.floor(n / Q));
  return map[n];
};
// const map = [1, 2];
// const dp = (n) =>
//   map[n] ?? (map[n] = dp(Math.floor(n / P)) + dp(Math.floor(n / Q)));

console.log(dp(N));
