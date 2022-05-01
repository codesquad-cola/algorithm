const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const edge = Array.from({ length: N + 1 }, () => Array());

for (let i = 1; i < N; i++) {
  const [from, to, weight] = input[i].split(' ').map(Number);
  edge[from].push([to, weight]);
  edge[to].push([from, weight]);
}

const quiz = [];
for (let i = N; i < N + M; i++) {
  const [from, to] = input[i].split(' ').map(Number);
  quiz[i - N] = [from, to];
}

let found = false;
const ans = [];

const dfs = (cur, dest, dist, visited) => {
  if (found) return;
  if (visited[cur]) return;
  visited[cur] = true;

  if (cur === dest) {
    ans.push(dist);
    found = true;
    return;
  }

  for (const [vertex, weight] of edge[cur]) {
    dfs(vertex, dest, dist + weight, visited);
  }
};

const solution = (quiz) => {
  for (let i = 0; i < M; i++) {
    const visited = new Array(N + 1).fill(false);
    const [from, to] = quiz[i];

    dfs(from, to, 0, visited);
    found = false;
  }

  return ans.join('\n');
};

console.log(solution(quiz));
