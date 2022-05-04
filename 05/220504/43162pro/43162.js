/* 43162. 네트워크 */

const dfs = (graph, visited) => {
  return function recur(nodeNum) {
    if (visited[nodeNum]) return;
    visited[nodeNum] = true;

    const adjList = graph[nodeNum]
      .map((link, index) => {
        if (link === 1) {
          return index;
        }
        return null;
      })
      .filter((value) => value !== null);

    for (const nextNodeNum of adjList) {
      recur(nextNodeNum);
    }
  };
};

const solution = (n, computers) => {
  let answer = 0;

  const visited = new Array(n).fill(false);
  const recur = dfs(computers, visited);

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      recur(i);
      answer++;
    }
  }

  return answer;
};

// const n = 3;
// const computers = [
//   [1, 1, 0],
//   [1, 1, 1],
//   [0, 0, 1],
// ];

// const n = 4;
// const computers = [
//   [1, 1, 0, 0],
//   [1, 1, 0, 0],
//   [0, 0, 1, 1],
//   [0, 0, 1, 1],
// ];

const n = 10;
const computers = [
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
];

console.log(solution(n, computers));

[
  [1, 1, 1, 1],
  [1, 1, 0, 0],
  [1, 0, 1, 1],
  [1, 0, 1, 1],
];

[
  [1, 0, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [1, 1, 1, 0, 1],
  [1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1],
];
