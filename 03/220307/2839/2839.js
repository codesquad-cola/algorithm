/* 설탕 배달 */

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
    for (let i = 6; i <= n; i++) {
      let temp = Math.min(memo[i - 3], memo[i - 5]);
      memo[i] = temp + 1;
    }
    return memo[n];
  };

  const answer = dp(N);
  if (answer >= LIMIT) return -1;
  return answer;
};

console.log(solution(N));
