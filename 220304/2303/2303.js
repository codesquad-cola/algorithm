/* 숫자게임 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const N = +input.shift();
const cards = new Array(N).fill();
input.forEach((str, i) => {
  cards[i] = str.split(' ').map(Number);
});

const solution = ({ N, cards }) => {
  const player = new Array(N + 1).fill(0);

  const combination = [];

  const go = (cnt, start, playerNum, arr) => {
    if (cnt >= 3) {
      const unit = combination.reduce((acc, cur) => acc + cur) % 10;
      if (player[playerNum] < unit) player[playerNum] = unit;
      return;
    }

    for (let i = start; i < 5; i++) {
      combination.push(arr[i]);
      go(cnt + 1, i + 1, playerNum, arr);
      combination.pop();
    }
  };

  let max = 0;
  let winner = 0;
  for (let i = 0; i < cards.length; i++) {
    go(0, 0, i + 1, cards[i]);
    if (max <= player[i + 1]) {
      max = player[i + 1];
      winner = i + 1;
    }
  }
  return winner;
};

console.log(solution({ N, cards }));
