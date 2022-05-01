const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');
const [T, ...input] = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +T;
// 루트: 1
// 부모 노드는 항상 1개

const edge = Array.from({ length: N + 1 }, () => Array());
const visited = Array.from({ length: N + 1 }, () => false);
const ans = new Array(N - 1).fill(0);

for (let i = 0; i < N - 1; i++) {
  const [from, to] = input[i].split(' ').map(Number);
  edge[from].push(to);
  edge[to].push(from);
}

const bfs = () => {
  const stack = [1];

  while (stack.length) {
    const parentNode = stack.pop();
    if (visited[parentNode]) {
      continue;
    }
    visited[parentNode] = true;

    for (let i = 0; i < edge[parentNode].length; i++) {
      const childNode = edge[parentNode][i];

      if (visited[childNode]) continue;
      stack.push(childNode);
      ans[childNode] = parentNode;
    }
  }
};

bfs();

let output = '';
for (let i = 2; i < N + 1; i++) {
  output += ans[i] + '\n';
}
console.log(output);
