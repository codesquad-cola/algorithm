/* 잃어버린 괄호 */

const fs = require('fs');
const { parse } = require('path');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [input] = fs.readFileSync(filePath).toString().trim().split('\n');

const subTotal = (input) =>
  input
    .split('+')
    .map(Number)
    .reduce((acc, cur) => acc + cur);

const solution = (input) => {
  const parsed = input.split('-'); // - 기준으로 분리
  let answer = subTotal(parsed[0]);

  for (let i = 1; i < parsed.length; i++) answer -= subTotal(parsed[i]);

  return answer;
};

console.log(solution(input));
