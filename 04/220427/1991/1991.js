const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input[0];
const edge = {};
for (let i = 1; i < N + 1; i++) {
  const [p, l, r] = input[i].split(' ');
  edge[p] = [l, r];
}

// edge[node][0] = 왼쪽 자식노드
// edge[node][1] = 오른쪽 자식노드

const preorder = (arr) =>
  function preorder(node) {
    if (node === '.') return;

    arr.push(node);
    preorder(edge[node][0]);
    preorder(edge[node][1]);
  };

const inorder = (arr) =>
  function inorder(node) {
    if (node === '.') return;

    inorder(edge[node][0]);
    arr.push(node);
    inorder(edge[node][1]);
  };

const postorder = (arr) =>
  function postorder(node) {
    if (node === '.') return;

    postorder(edge[node][0]);
    postorder(edge[node][1]);
    arr.push(node);
  };

const ans = [];
preorder(ans)('A');
ans.push('\n');
inorder(ans)('A');
ans.push('\n');
postorder(ans)('A');

console.log(ans.join(''));
