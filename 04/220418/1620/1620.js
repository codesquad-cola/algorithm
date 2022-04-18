/* 나는야 포켓몬 마스터 이다솜 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);

let i = N + 1;
const quiz = [];
while (input[i]) {
  quiz.push(input[i++]);
}

const map = {};
for (let i = 1; i < 1 + N; i++) {
  map[i] = input[i];
  map[input[i]] = i;
}

console.log(quiz.map((q) => map[q]).join('\n'));
