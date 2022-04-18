class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);
    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.setNext(node);
      this.tail = node;
    }
    this.length++;
  }

  shift() {
    if (this.head === null) return;

    this.length--;
    const delNodeValue = this.head.getValue();

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else this.head = this.head.node.next;

    return delNodeValue;
  }
}

class Node {
  constructor(value) {
    this.node = { value, next: null };
  }

  getValue() {
    return this.node.value;
  }

  setNext(node) {
    this.node.next = node;
  }
}

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const T = +input.shift();

const solution = () => {
  const offset = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const bfs = (graph, fires, player) => {
    const fireQueue = new Queue();
    const playerQueue = new Queue();

    for (const fire of fires) {
      fireQueue.push(fire);
    }
    playerQueue.push(player);

    let cnt = 0;
    while (playerQueue.length) {
      cnt++;
      // 불 큐에서 모든 좌표가 1칸씩 이동
      const fireQueuelength = fireQueue.length;
      for (let i = 0; i < fireQueuelength; i++) {
        const [y, x] = fireQueue.shift();
        for (const [dy, dx] of offset) {
          const nextY = y + dy;
          const nextX = x + dx;
          const nextCell = graph[nextY]?.[nextX];
          if (nextCell === '.' || nextCell === '@') {
            graph[nextY][nextX] = '*';
            fireQueue.push([nextY, nextX]);
          }
        }
      }
      // 플레이어 큐에서 모든 좌표가 1칸씩 이동
      // 플레이어 큐가 undefined로 나가면 승리
      const playerQueueLength = playerQueue.length;
      for (let i = 0; i < playerQueueLength; i++) {
        const [y, x] = playerQueue.shift();
        for (const [dy, dx] of offset) {
          const nextY = y + dy;
          const nextX = x + dx;
          const nextCell = graph[nextY]?.[nextX];
          if (nextCell === undefined) return cnt;
          if (nextCell === '.') {
            graph[nextY][nextX] = '@'; // @는 방문한 곳 표시용
            playerQueue.push([nextY, nextX]);
          }
        }
      }
    }
    // 플레이어 큐 다 빠져나올 때 동안 undefined 못만나면 IMPOSSIBLE
    return 'IMPOSSIBLE';
  };

  let idx = 0;
  let answer = '';
  for (let i = 0; i < T; i++) {
    const [, rows] = input[idx++].split(' ');
    const graph = [];
    const fires = [];
    const player = [];
    for (let j = 0; j < rows; j++) {
      const row = input[idx++].split('');
      graph.push(row);
      for (let k = 0; k < row.length; k++) {
        if (row[k] === '@') player.push(j, k);
        if (row[k] === '*') fires.push([j, k]);
      }
    }
    answer += bfs(graph, fires, player) + '\n';
  }
  return answer;
};

console.log(solution());
