/* 퇴사 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift();
const T = [0];
const P = [0];
input.forEach((str) => {
  const [t, p] = str.split(' ').map(Number);
  T.push(t);
  P.push(p);
});
const memo = new Array(N + 6).fill(0);

// memo[n] = n일~N일 까지의 최대 이익
// memo[1] = 1일~N일 까지의 최대 이익
const solution = ({ N, T, P }) => {
  for (let i = N; i >= 1; i--) {
    let nextDate = i + T[i];
    if (nextDate <= N + 1) {
      // i일에 일을 해서 얻는 이득과 memo[nextDate]를 합침.
      // i일에 일을 하지 않는 경우, memo[i + 1]이 최대 이익.
      memo[i] = Math.max(P[i] + memo[nextDate], memo[i + 1]);
    } else memo[i] = memo[i + 1];
  }
  return memo[1];
};

console.log(solution({ N, T, P }));
