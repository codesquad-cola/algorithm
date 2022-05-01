const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, m] = input[0].split(' ').map(Number);
const parent = input[1].split(' ').map(Number);
const tree = Array.from({ length: n }, () => Array());
for (let i = 1; i < parent.length; i++) {
  tree[parent[i]].push(i + 1);
}

// tree[i] -> i번 노드가 가지고 있는 자식 배열
// complimentInput[i] = [a, b]-> a번 노드가 받은 칭찬 b
// compliment[i] = i번 노드가 받은 누적 칭찬 === answer
// i가 칭찬받으면 i의 자식 노드도 모두 동일한 칭찬을 받음
const complimentInput = [];
for (let i = 0; i < m; i++) {
  const [person, weight] = input[i + 2].split(' ').map(Number);
  complimentInput.push([person, weight]);
}

const solution = (parent, complimentInput) => {
  const compliment = [null].concat(new Array(n).fill(0));

  for (const [person, weight] of complimentInput) {
    compliment[person] += weight;
  }

  // 루트 노드(1) 부터 dfs로 자식 노드들에게 누적된 칭찬값을 전달해주기
  // i번 노드는 j번 노드에게 compliment[i]를 전달
  // j번 노드는 compliment[j]에 compliment[i]를 누적
  // 반복

  const dfs = (nodeNum) => {
    if (!tree[nodeNum]) return;
    for (const childNodeNum of tree[nodeNum]) {
      compliment[childNodeNum] += compliment[nodeNum];
      dfs(childNodeNum);
    }
  };

  dfs(1);

  compliment.splice(0, 1);
  return compliment.join(' ');
};

console.log(solution(parent, complimentInput));
