/* 용돈관리 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const days = [];
for (let i = 1; i <= N; i++) days.push(+input[i]);

const solution = ({ N, M, days }) => {
  let left = Math.max(...days); // days= 그날에쓸돈 [100 200 300]배열
  let right = 10000 * N;

  while (left <= right) {
    const mid = ((left + right) / 2) >> 0;

    let withdraw = mid;
    let cnt = 1;
    for (let i = 0; i < N; i++) {
      if (cnt >= M) break;

      if (withdraw < days[i]) {
        withdraw = mid;
        cnt++;
      }
      withdraw -= days[i];
    }

    if (cnt >= M) left = mid + 1;
    else right = mid - 1;
  }

  return left;
};

console.log(solution({ N, M, days }));
