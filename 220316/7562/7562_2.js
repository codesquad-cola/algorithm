/* 나이트의 이동 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();
const size = [];
const start = [];
const dest = [];

let cnt = 0;
for (let i = 0; i < T; i++) {
  size.push(+input[cnt++]);
  start.push(input[cnt++].split(' ').map(Number));
  dest.push(input[cnt++].split(' ').map(Number));
}

// T: 테스트 케이스
// size: 체스판 크기
// start: 시작 좌표
// dest: 도착 좌표
const solution = ({ T }) => {
  const answer = [];
  const offset = [
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
  ];

  // S = [시작 row, 시작 col]
  const bfs = (board, [x, y]) => {
    const queue = [];
    queue.push([x, y, 0]);

    while (queue.length) {
      const pos = queue.shift();
      const [curRow, curCol, cnt] = pos;

      const curValue = board[curRow][curCol];
      if (curValue === 2) return cnt;
      if (curValue === 3) continue;
      board[curRow][curCol] = 3;

      for (const [diffRow, diffCol] of offset) {
        // const nextRow = curRow + diffRow;
        // const nextCol = curCol + diffCol;

        const nextValue = board[curRow + diffRow]?.[curCol + diffCol];
        if (![3, undefined, 1].includes(nextValue)) {
          queue.push([curRow + diffRow, curCol + diffCol, cnt + 1]);
          // board[nextRow][nextCol] = undefined;
        }
      }
    }
  };

  for (let i = 0; i < T; i++) {
    const [s1, s2] = start[i];
    const [d1, d2] = dest[i];
    const board = Array.from({ length: size[i] }, () =>
      new Array(size[i]).fill(0)
    );

    board[s1][s2] = 1;
    board[d1][d2] = 2;

    answer.push(bfs(board, [s1, s2]));
  }
  return answer.join('\n');
};

console.log(solution({ T }));
