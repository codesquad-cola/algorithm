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

for (let i = 0; i < T; i++) {
  size.push(+input[T * i + 0]);
  start.push(input[T * i + 1].split(' ').map(Number));
  dest.push(input[T * i + 2].split(' ').map(Number));
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
  const bfs = ({ board, S, visited }) => {
    const queue = [];
    queue.push([...S, 0]);

    while (queue.length) {
      const pos = queue.shift();
      const [curRow, curCol, cnt] = pos;

      if (board[curRow][curCol] === 2) return cnt;

      if (visited[curRow][curCol]) continue;
      visited[curRow][curCol] = true;

      offset.forEach(([diffRow, diffCol]) => {
        const nextRow = curRow + diffRow;
        const nextCol = curCol + diffCol;

        if (
          board[nextRow]?.[nextCol] !== undefined &&
          !visited[nextRow][nextCol]
        )
          queue.push([nextRow, nextCol, cnt + 1]);
      });
    }
  };

  for (let i = 0; i < T; i++) {
    const L = size[i];
    const S = start[i];
    const D = dest[i];

    const board = Array.from({ length: L }, () =>
      Array.from({ length: L }, () => 0)
    );

    const visited = Array.from({ length: L }, () =>
      Array.from({ length: L }, () => false)
    );
    board[S[0]][S[1]] = 1;
    board[D[0]][D[1]] = 2;

    answer.push(bfs({ board, S, D, visited }));
  }
  return answer.join('\n');
};

console.log(solution({ T }));
