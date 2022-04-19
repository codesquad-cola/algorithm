/* 수강신청 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [K, L] = input[0].split(' ').map(Number);

const order = new Set();
for (let i = 1; i < L + 1; i++) {
  order.delete(input[i]);
  order.add(input[i]);
}
console.log([...order].slice(0, K).join('\n'));
