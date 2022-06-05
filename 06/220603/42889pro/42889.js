const solution = (N, stages) => {
  // countInProgress[i]: i단계에 있는 유저수
  // countInProgress[N+1]: 모두 클리어한 유저수
  const countInProgress = new Array(N + 2).fill(0);
  stages.forEach((stage) => {
    countInProgress[stage] += 1;
  });

  // visitCount[i]: i단계에 방문했던 사람 수 = i단계 진행중인 사람수 + ... + N단계 진행중인 사람수 + 모두 클리어한 사람수
  let acc = countInProgress[N + 1];

  const visitCount = new Array(N + 1).fill(0);

  for (let i = N; i >= 1; i--) {
    acc += countInProgress[i];
    visitCount[i] = acc;
  }

  const failRate = [];
  for (let i = 1; i <= N; i++) {
    if (visitCount[i] === 0) {
      failRate.push([i, 0]);
      continue;
    }
    failRate.push([i, countInProgress[i] / visitCount[i]]);
  }

  // [0]: 스테이지 번호
  // [1]: 스테이지 실패율
  failRate.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });

  return failRate.map(([stage]) => stage);
};

const N = 5;
const stages = [2, 1, 2, 6, 2, 4, 3, 3];
console.log(solution(N, stages));
