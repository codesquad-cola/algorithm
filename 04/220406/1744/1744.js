/* 수 묶기 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');
const nums = input.map(Number);

const solution = (nums) => {
  nums.sort((a, b) => a - b);
  const negative = [];
  const ones = [];
  const positive = [];
  for (const num of nums) {
    if (num <= 0) negative.push(num);
    else if (num === 1) ones.push(num);
    else positive.push(num);
  }

  let sum = 0;

  if (negative.length % 2) sum += negative[negative.length - 1];
  for (let i = 0; i + 1 < negative.length; i += 2) {
    sum += negative[i] * negative[i + 1];
  }

  if (positive.length % 2) sum += positive[0];
  for (let i = positive.length - 1; i - 1 >= 0; i -= 2) {
    sum += positive[i] * positive[i - 1];
  }
  sum += ones.length;
  return sum;
};

// 양수 -> 절대값이 큰수끼리 묶음 (짝수개)
// 음수 -> 절대값이 큰수끼리 묶음 (짝수개)
// 0은 묶지 않거나 하나 남은 음수랑 묶음
// 1은 묶지 않고 더함

console.log(solution(nums));
