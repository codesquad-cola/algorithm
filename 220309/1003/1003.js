/* 피보나치 함수 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [T, ...nums] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const solution = ({ T, nums }) => {
  const max = Math.max(...nums);

  const memo = Array.from({ length: max + 1 });

  memo[0] = [1, 0];
  memo[1] = [0, 1];
  for (let i = 2; i < memo.length; i++) {
    memo[i] = [
      memo[i - 1][0] + memo[i - 2][0],
      memo[i - 1][1] + memo[i - 2][1],
    ];
  }

  let ans = '';
  for (let num of nums) {
    ans += memo[num].join(' ') + '\n';
  }
  return ans;
};

console.log(solution({ T, nums }));
