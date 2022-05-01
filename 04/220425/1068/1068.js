const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const info = input[1].split(' ').map(Number);
const delNum = +input[2];
// delNum을 부모로 하는 노드들 순회 -> 배열에 담음 -> 그 노드들을 부모로 하는 노드들 순회 ->

const edge = {};
for (let i = -1; i < N; i++) edge[i] = [];

for (let i = 0; i < info.length; i++) {
  edge[info[i]].push(i);
}

const bfs = () => {
  const stack = [delNum];

  while (stack.length) {
    const targetNode = stack.pop();
    const children = edge[targetNode];

    stack.push(...children);
    delete edge[targetNode];
  }
};

bfs();
console.log(Object.values(edge).filter((v) => v.length === 0).length);
