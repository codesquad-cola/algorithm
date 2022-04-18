/* 선긋기 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const range = [];
for (let i = 1; i <= N; i++) {
  range[i - 1] = input[i].split(' ').map(Number);
}

range.sort((a, b) => {
  if (a[0] < b[0]) return -1;
  if (a[0] === b[0]) {
    if (a[1] < b[1]) return -1;
  }
  return 1;
});

const solution = (range) => {
  let ans = range[0][1] - range[0][0];
  let pos = range[0][1];

  for (let i = 1; i < range.length; i++) {
    if (range[i][0] < pos) {
      if (range[i][1] > pos) {
        ans += range[i][1] - pos;
        pos = range[i][1];
      }
    } else {
      ans += range[i][1] - range[i][0];
      pos = range[i][1];
    }
  }

  return ans;
};

console.log(solution(range));
