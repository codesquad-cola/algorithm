/* 주사위 굴리기 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M, x, y, K] = input[0].split(' ').map(Number);
const map = Array.from({ length: N });
for (let i = 0; i < N; i++) {
  map[i] = input[i + 1].split(' ').map(Number);
}
const moves = input[input.length - 1].split(' ').map(Number);

/**
 * moves
 * 1 -> R
 * 2 -> L
 * 3 -> U
 * 4 -> D
 */

/**
 * N: 행
 * M: 열
 * x: 시작 row
 * y: 시작 col
 * K: 이동 횟수
 * map: 지도
 */

/**
 * dice
 * dice[0]: 위 (이동할 때 마다 출력)
 * dice[2]: 아래 (이동한 칸 === 0? 이동한칸 = dice[2])
 *              (이동한 칸 !== 0? dice[2] = 이동한칸, 이동한칸 = 0)
 * dice[4]: 왼쪽
 * dice[5]: 오른쪽
 * */
const dice = [0, 0, 0, 0, 0, 0];

const moveR = () => {
  const copy = [...dice];
  dice[5] = copy[0];
  dice[2] = copy[5];
  dice[4] = copy[2];
  dice[0] = copy[4];
};
const moveL = () => {
  const copy = [...dice];
  dice[4] = copy[0];
  dice[2] = copy[4];
  dice[5] = copy[2];
  dice[0] = copy[5];
};
const moveU = () => {
  const copy = [...dice];
  dice[3] = copy[0];
  dice[2] = copy[3];
  dice[1] = copy[2];
  dice[0] = copy[1];
};
const moveD = () => {
  const copy = [...dice];
  dice[1] = copy[0];
  dice[2] = copy[1];
  dice[3] = copy[2];
  dice[0] = copy[3];
};
const afterMove = (row, col, map) => {
  if (map[row][col] === 0) {
    map[row][col] = dice[2];
    return;
  }
  dice[2] = map[row][col];
  map[row][col] = 0;
};

const solution = ({ x, y, map, dice }) => {
  const answer = [];
  for (const direction of moves) {
    if (direction === 1) {
      // R
      if (map[x]?.[y + 1] === undefined) continue;
      moveR();
      afterMove(x, ++y, map);
      answer.push(dice[0]);
    }

    if (direction === 2) {
      // L
      if (map[x]?.[y - 1] === undefined) continue;
      moveL();
      afterMove(x, --y, map);
      answer.push(dice[0]);
    }

    if (direction === 3) {
      // U
      if (map[x - 1]?.[y] === undefined) continue;
      moveU();
      afterMove(--x, y, map);
      answer.push(dice[0]);
    }

    if (direction === 4) {
      // D
      if (map[x + 1]?.[y] === undefined) continue;
      moveD();
      afterMove(++x, y, map);
      answer.push(dice[0]);
    }
  }
  return answer.join('\n');
};

console.log(solution({ x, y, map, dice }));
