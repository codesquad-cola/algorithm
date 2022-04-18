/* 숫자 카드 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const nums = input[1].split(' ').map(Number);
const M = +input[2];
const targets = input[3].split(' ').map(Number);

const solution = ({ nums, targets }) => {
  nums.sort((a, b) => a - b);

  const biSearch = (arr, target, start, end) => {
    while (start <= end) {
      let idx = ((start + end) / 2) >> 0;
      if (arr[idx] === target) return 1;
      else if (arr[idx] < target) {
        start = idx + 1;
      } else {
        end = idx - 1;
      }
    }
    return 0;
  };

  const answer = targets.map((target) => {
    return biSearch(nums, target, 0, nums.length);
  });

  return answer.join(' ');
};

console.log(solution({ N, nums, M, targets }));
