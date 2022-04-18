/* 정수 삼각형 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [n, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

const pyramid = input.map((str) => str.split(' ').map(Number));

const solution = ({ n, pyramid }) => {
  const dp = Array.from({ length: n }, (_, idx) => Array(idx + 1).fill());
  dp[0][0] = pyramid[0][0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i + 1; j++) {
      dp[i][j] =
        pyramid[i][j] + Math.max(dp[i - 1][j] ?? 0, dp[i - 1][j - 1] ?? 0);
    }
  }
  return Math.max(...dp[n - 1]);
};

console.log(solution({ n, pyramid }));
