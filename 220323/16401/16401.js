/* 과자 나눠주기 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [M, N] = input[0].split(' ').map(Number);
const bars = input[1].split(' ').map(Number);
// bars.sort((a, b) => a - b);

const solution = ({ M, N, bars }) => {
  let min = 0;
  let max = Math.max(...bars);
  // min = min < bars[N - M] ? bars[N - M] : min;

  let answer = 0;

  while (min <= max) {
    let cnt = 0;
    let mid = ((min + max) / 2) >> 0;

    for (let i = 0; i < N; i++) {
      if (cnt >= M) {
        break;
      }
      cnt += (bars[i] / mid) >> 0;
    }

    if (cnt < M) {
      max = mid - 1;
    } else {
      answer = answer < mid ? mid : answer;
      min = mid + 1;
    }
  }
  return answer;
};

console.log(solution({ M, N, bars }));
