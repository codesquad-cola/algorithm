function find(pArr, idx) {
  if (pArr[idx] === idx) {
    return idx;
  }

  pArr[idx] = find(pArr, pArr[idx]);
  return pArr[idx];
}

function union(pArr, c1, c2) {
  const pC1 = find(pArr, c1);
  const pC2 = find(pArr, c2);

  if (pC1 > pC2) {
    pArr[pC1] = pC2;
  } else {
    pArr[pC2] = pC1;
  }
}

function hasSameParent(pArr, c1, c2) {
  return find(pArr, c1) === find(pArr, c2);
}

function solution(n, costs) {
  var answer = 0;

  costs.sort((a, b) => a[2] - b[2]);

  // set[i] = i의 루트
  const pArr = Array(n)
    .fill()
    .map((_, idx) => idx);

  let count = 0;
  for (const [from, to, cost] of costs) {
    // 간선이 n-1개가 되었으면 끝
    if (count === n - 1) {
      return answer;
    }

    // 동일한 집합에 속한다면 (사이클을 형성함)
    if (hasSameParent(pArr, from, to)) {
      continue;
    }

    // 동일한 집합이 아닌 경우 두 정점을 연결하고 비용 추가, 간선 개수 추가
    union(pArr, from, to);
    answer += cost;
    ++count;
  }

  return answer;
}

console.log(
  solution(4, [
    [0, 1, 1],
    [0, 2, 2],
    [1, 2, 5],
    [1, 3, 1],
    [2, 3, 8],
  ])
);
