/* 적록색약 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

let [T, ...graph] = fs.readFileSync(filePath).toString().trim().split('\n');

graph = graph.map((row) => {
  return row.split('');
});

const solution = ({ graph, T }) => {
  const offset = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  let visited = Array.from({ length: T }, () => {
    return Array.from({ length: T }, () => false);
  });

  const bfs = ({ graph, visited, x, y }) => {
    const queue = [];

    queue.push([x, y]);

    while (queue.length) {
      const [curX, curY] = queue.shift();
      if (visited[curX][curY]) continue;
      visited[curX][curY] = true;
      const color = graph[curX][curY];

      offset.forEach(([dx, dy]) => {
        const nextX = curX + dx;
        const nextY = curY + dy;
        const nextColor = graph[nextX]?.[nextY];

        if (color === nextColor && !visited[nextX]?.[nextY]) {
          queue.push([nextX, nextY]);
        }
      });
    }
  };

  const counting = () => {
    let cnt = 0;
    for (let row = 0; row < T; row++) {
      for (let col = 0; col < T; col++) {
        if (!visited[row][col]) {
          cnt++;
          bfs({ graph, visited, x: row, y: col });
        }
      }
    }
    return cnt;
  };

  const cnt1 = counting();

  visited = Array.from({ length: T }, () => {
    return Array.from({ length: T }, () => false);
  });

  for (let i = 0; i < T; i++) {
    for (let j = 0; j < T; j++) {
      if (graph[i][j] === 'G') graph[i][j] = 'R';
    }
  }

  const cnt2 = counting();

  return `${cnt1} ${cnt2}`;
};

console.log(solution({ graph, T }));
