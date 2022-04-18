/* 설탕 배달 */

// recur
const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const N = +fs.readFileSync(filePath).toString().trim().split('\n');

const solution = (N) => {
  const memo = new Array(5001).fill(0);
  const LIMIT = 5000;

  for (let i = 1; i < 6; i++) memo[i] = LIMIT;
  memo[3] = 1;
  memo[5] = 1;

  const dp = (n) => {
    if (memo[n]) return memo[n];
    return (memo[n] = Math.min(dp(n - 3), dp(n - 5)) + 1);
  };

  const answer = dp(N);
  if (answer >= LIMIT) return -1;
  return answer;
};

console.log(solution(N));
