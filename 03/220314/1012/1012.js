/* 유기농 배추 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [T, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

const lands = new Array();

let k = 0;
let sizes = [];
for (let i = 0; i < T; i++) {
  const [M, N, K] = input[k].split(' ').map(Number);
  sizes.push([M, N]);

  const land = Array.from({ length: M }, () =>
    Array.from({ length: N }, () => 0)
  );

  lands.push(land);

  for (let j = k + 1; j < k + 1 + K; j++) {
    const [x, y] = input[j].split(' ').map(Number);
    land[x][y] = 1;
  }

  k += K + 1;
}

// T: 테스트 케이스 개수
// lands: land 배열 (test case 수만큼)
// sizes: land 크기 [M, N]의 배열 (test case 수만큼)

const solution = ({ T, lands, sizes }) => {
  const offset = [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1], // right
  ];

  const bfs = ({ land, visited, x, y }) => {
    const queue = [];
    queue.push([x, y]);
    while (queue.length) {
      const [curX, curY] = queue.shift();
      if (visited[curX][curY]) continue; // *
      visited[curX][curY] = true;

      offset.forEach(([dx, dy]) => {
        const nextX = curX + dx;
        const nextY = curY + dy;

        if (land[nextX]?.[nextY] && !visited[nextX]?.[nextY])
          queue.push([nextX, nextY]);
      });
    }
  };

  const answer = [];

  for (let i = 0; i < T; i++) {
    const land = lands[i];
    const [M, N] = sizes[i];
    const visited = Array.from({ length: M }, () =>
      Array.from({ length: N }, () => false)
    );

    let cnt = 0;
    for (let row = 0; row < M; row++) {
      for (let col = 0; col < N; col++) {
        if (land[row][col] && !visited[row][col]) {
          cnt++;
          bfs({ land, visited, x: row, y: col });
        }
      }
    }
    answer.push(cnt);
  }
  return answer.join('\n');
};

console.log(solution({ T, lands, sizes }));
