/* 다리 만들기 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [N, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');
const graph = [];

for (const line of input) graph.push(line.split(' ').map(Number));

// graph: 각 섬마다 고유 번호로 초기화
// coordsList: 각 섬마다 move대상이 되는 좌표 모음.
// countList: 각 섬마다 move한 횟수.
// 두 섬 i, j가 만난 시점의 countList[i] + countList[j] 중에서 최솟값이 정답
const solution = ({ graph, N }) => {
  const coordsList = [0]; // 각 섬마다 배열로 move대상이 될 좌표를 가짐. (인덱스 0은 쓰레기값으로 초기화)
  const offset = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const bfs = ({ row, col, graph, num, visited }) => {
    const coords = []; // 섬에서 0과 맞닿아 있는 좌표들 (move 대상)
    const queue = [];
    queue.push([row, col]);

    while (queue.length) {
      const [y, x] = queue.shift();

      if (visited[y][x]) continue;
      visited[y][x] = true;
      graph[y][x] = num;

      let duplicated = false;
      for (const [dy, dx] of offset) {
        const nextY = dy + y;
        const nextX = dx + x;

        const nextCell = graph[nextY]?.[nextX];
        if (nextCell === 0 && !duplicated) {
          // duplicated -> [y, x]가 이미 coords에 들어가 있는 경우
          coords.push([y, x]);
          duplicated = true;
          continue;
        }

        if (!nextCell || visited[nextY][nextX]) continue;
        queue.push([nextY, nextX]);
      }
    }
    coordsList.push(coords);
  };

  let num = 1;
  const visited = Array.from({ length: N }, () => new Array(N).fill(false));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] !== 0 && !visited[i][j]) {
        bfs({ row: i, col: j, graph, num, visited });
        num++;
      }
    }
  }

  // graph 초기화 끝, coordsList[i]를 가지고 순회.
  console.log(graph.map((row) => row.join('')).join('\n'));
  const countList = new Array(coordsList.length).fill(0); // 각 섬마다 move한 횟수. (인덱스 0은 쓰레기값으로 초기화)

  let answer;
  const move = ({ graph, islandNumber, queue }) => {
    // queue: move할 좌표
    const nextCoords = []; // 다음 싸이클에 move할 좌표들
    const dist = []; // 두 섬이 만났을 때 거리 push. 한 싸이클 내에서 여러 섬이 만날 수 있는데, 거리가 긴쪽이 거리가 짧은쪽보다 먼저 만날 수도 있어서 배열로 저장

    while (queue.length) {
      const [y, x] = queue.shift();
      for (const [dy, dx] of offset) {
        const nextY = dy + y;
        const nextX = dx + x;
        const nextCell = graph[nextY]?.[nextX];

        if (nextCell === undefined || nextCell === islandNumber) continue;
        if (nextCell === 0) {
          nextCoords.push([nextY, nextX]); // 다음에 move할 좌표 push
          graph[nextY][nextX] = islandNumber; // 중복해서 push되지 않도록 + 이동했음을 나타내기 위해서 현재 섬 번호 할당
          continue;
        }

        // 다른 섬의 확장을 만난 경우
        // 현재 섬 번호 = islandNumber, 만난 섬 번호 = nextCell
        dist.push(countList[islandNumber] + countList[nextCell]);
        answer = dist[0];
        return;
      }
    }
    if (dist.length) {
      answer = Math.min(...dist);
      return;
    }
    coordsList[islandNumber] = nextCoords;
  };

  while (true) {
    for (let i = 1; i < countList.length; i++) {
      move({ graph, islandNumber: i, queue: coordsList[i] });
      if (answer) return answer;
      countList[i]++; // move호출 이후에 이동한 거리 +1해줌
    }
  }
};

console.log(solution({ graph, N }));
