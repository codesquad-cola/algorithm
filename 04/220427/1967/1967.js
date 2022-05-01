const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const tree = Array.from({ length: N + 1 }, () => Array());

for (let i = 1; i < N; i++) {
  const [from, to, weight] = input[i].split(' ').map(Number);
  tree[from].push([to, weight]);
  tree[to].push([from, weight]);
}

/*
tree 
[
  노드번호: [ [노드, 거리], [노드, 거리], [노드, 거리] ],
  노드번호: [ [노드, 거리], [노드, 거리], [노드, 거리] ],
  노드번호: [ [노드, 거리], [노드, 거리], [노드, 거리] ],
]

tree[X][i][0]: X와 ?의 연결
tree[X][i][1]: X와 ?의 거리
*/

let visited = Array.from({ length: N + 1 }, () => false);
let maxDist = 0;
let maxDistNodeNum = 0;
const dfs = (node, dist) => {
  if (visited[node]) return;
  visited[node] = true;
  const children = tree[node];

  if (children.length === 1 && visited[children[0][0]] === true) {
    if (maxDist > dist) return;
    maxDist = dist;
    maxDistNodeNum = node;
  }

  for (const child of children) {
    dfs(child[0], child[1] + dist);
  }
};

dfs(1, 0);
maxDist = 0;
visited = Array.from({ length: N + 1 }, () => false);
dfs(maxDistNodeNum, 0);
console.log(maxDist);
