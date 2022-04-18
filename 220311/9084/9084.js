/* 동전 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [T, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

let N = [];
let coins = [];
let M = [];

for (let i = 0; i < T; i++) {
  N[i] = input[i * 3].split(' ').map(Number)[0];
  coins[i] = input[i * 3 + 1].split(' ').map(Number);
  M[i] = input[i * 3 + 2].split(' ').map(Number)[0];
}

const solution = ({ T, N, coins, M }) => {
  const answer = [];
  for (let i = 0; i < T; i++) {
    // 테스트 케이스 블럭
    const m = M[i];
    const dp = Array.from({ length: m + 1 }, () => 0);
    dp[0] = 1;
    for (const coin of coins[i]) {
      // 코인 블럭
      for (let k = coin; k <= m; k++) {
        // dp 블럭
        dp[k] += dp[k - coin];
      }
    }
    answer.push(dp[m]);
  }

  return answer.join('\n');
};

console.log(solution({ T, N, coins, M }));
