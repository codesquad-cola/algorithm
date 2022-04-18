/* 기타 레슨 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const lectures = input[1].split(' ').map(Number);

const solution = ({ N, M, lectures }) => {};

console.log(solution({ N, M, lectures }));
