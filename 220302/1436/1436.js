/* 영화감독 숌 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const N = +fs.readFileSync(filePath).toString().trim();

const solution = (N) => {
  let i = 665;
  while (N > 0) {
    // 666을 발견하면 N--;
    while (1) {
      i++;
      if (i.toString().includes('666')) break;
    }
    N--;
  }
  return i;
};

console.log(solution(N));
