// 다시 풀어보기

// 가중치의 합이 0이 되지 않으면 false를 리턴한다.
const isValid = (arr) => {
  return !arr.reduce((acc, cur) => acc + cur, 0);
};

function solution(a, edges) {
  if (!isValid(a)) return -1;
  if (a.every((v) => v === 0)) return 0;

  const aa = a.map((v) => BigInt(v));
  let answer = BigInt(0);
  const vertex = {};

  edges.forEach(([from, to]) => {
    if (!vertex.hasOwnProperty(from)) {
      vertex[from] = [to];
    } else {
      vertex[from].push(to);
    }

    if (!vertex.hasOwnProperty(to)) {
      vertex[to] = [from];
    } else {
      vertex[to].push(from);
    }
  });

  const visited = new Array(aa.length).fill(false);
  function dfs(stack) {
    while (stack.length) {
      const [v, parent] = stack.pop();
      if (visited[v]) {
        answer += BigInt(Math.abs(Number(aa[v])));
        if (aa[parent]) {
          aa[parent] += BigInt(aa[v]);
        }
        aa[v] = BigInt(0);

        continue;
      }

      visited[v] = true;
      stack.push([v, parent]);

      for (const next of vertex[v]) {
        if (!visited[next]) {
          stack.push([next, v]);
        }
      }
    }
  }

  let start = edges[0][0];
  let stack = [[start, null]];
  dfs(stack);

  return answer;
}

const a = [-5, 0, 2, 1, 2];
const edges = [
  [0, 1],
  [3, 4],
  [2, 3],
  [0, 3],
];
solution(a, edges);
