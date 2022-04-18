/* 수학은 비대면강의입니다 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const [a, b, c, d, e, f] = input;

const solution = ({ a, b, c, d, e, f }) => {
  for (let x = -999; x < 1000; x++) {
    for (let y = -999; y < 1000; y++) {
      if (a * x + b * y === c && d * x + e * y === f) return `${x} ${y}`;
    }
  }
};

console.log(solution({ a, b, c, d, e, f }));
