/* ATM */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const nums = input[1].split(' ').map(Number);
nums.sort((a, b) => a - b);

const solution = ({ N, nums }) => {
  let answer = 0;
  for (let i = 0; i < N; i++) answer += nums[i] * (N - i);
  return answer;
};

console.log(solution({ N, nums }));

// console.log(
//   nums.reduce((result, value, idx) => (result += value * (N - idx)), 0)
// );
