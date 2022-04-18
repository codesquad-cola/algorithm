/* 단지번호 붙이기 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');

const graph = [];
for (const line of input) graph.push(line.split('').map(Number));

const solution = ({ N, graph }) => {
  const VISITED = 8;
  const answer = [];
  let islandCnt = 0;

  const bfs = (row, col, graph) => {
    let blockCnt = 0;
    const offset = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    const queue = [];
    queue.push([row, col]);

    while (queue.length) {
      const [y, x] = queue.shift();
      if (graph[y][x] === VISITED) continue;
      graph[y][x] = VISITED;
      blockCnt++;

      for (const [dy, dx] of offset) {
        const nextY = y + dy;
        const nextX = x + dx;
        const nextCell = graph[nextY]?.[nextX];
        if (nextCell === VISITED || !nextCell) continue; // VISITED || 0 || undefined
        queue.push([nextY, nextX]);
      }
    }

    return blockCnt;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] === VISITED || graph[i][j] === 0) continue;
      islandCnt++;
      answer.push(bfs(i, j, graph));
    }
  }

  return islandCnt + '\n' + answer.sort((a, b) => a - b).join('\n');
};
console.log(solution({ N, graph }));
