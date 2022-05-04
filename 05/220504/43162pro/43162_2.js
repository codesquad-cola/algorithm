/* 43162. 네트워크 */

const generate = (graph) => {
  return function dfs(nodeNum) {
    if (graph[nodeNum][nodeNum] === 0) return;
    graph[nodeNum][nodeNum] = 0;

    for (let index = 0; index < graph[nodeNum].length; index++) {
      if (graph[nodeNum][index] !== 0) {
        dfs(index);
      }
    }
  };
};

const solution = (n, computers) => {
  let answer = 0;

  const dfs = generate(computers);

  for (let i = 0; i < n; i++) {
    if (computers[i][i] !== 0) {
      dfs(i);
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
