/* 양궁대회 */

// 라이언이 우승 할 수 없으면 [-1]
// 가장 점수차가 많이 나는 케이스를 반환
// 가장 점수차가 많이 나는 케이스가 여러개라면 낮은 점수를 많이 맞춘 경우를 반환 -> 큰 점수부터 진입하여 백트래킹

// 1. 각 요소의 값에 +1번을 더 맞춰야 점수를 얻을 수 있음.
// 2. 만약 남아있는 화살 수가, 요소의 값보다 적으면
// 2-1. 그 요소가 마지막 요소가 아니라면 continue.
// 2-2. 그 요소가 마지막 요소라면 거기에 올인.
// 3. 동점일 경우, 낮은 점수의 화살을 더 많이 맞춘 쪽을 선택
// 3-1. 이를 구현하기 위해 비교함수를 생성

// 더 낮은 값을 많이 맞춘 쪽이 어디인지 비교하는 함수.
// arr1과 arr2가 동점일 경우에만 비교한다.

let N = 11;

const compareCountOfLowScore = (arr1, arr2) => {
  for (let i = N - 1; i >= 0; i--) {
    if (arr1[i] >= arr2[i]) {
      return arr1;
    }

    return arr2;
  }
};

// arr1 선수의 점수와 arr2 선수의 점수를 계산하여 차이를 반환
// 어피치가 항상 arr1로 들어간다. 라이언은 항상 arr2로 들어간다.
// 라이언 점수 - 어피치 점수 반환. 반환값이 클수록 선택 우선순위 높아짐.
const getDiff = (arr1, arr2) => {
  let score1 = 0;
  let score2 = 0;
  for (let i = 0; i < N; i++) {
    if (arr1[i] === 0 && arr2[i] === 0) {
      continue;
    }

    if (arr1[i] >= arr2[i]) {
      score1 += N - i;
      continue;
    }
    score2 += N - i;
  }
  return score2 - score1;
};

const solution = (n, info) => {
  let maxDiff = 0;
  let candidate = [...info];

  const dfs = (lionArr, arrowCount, startI) => {
    if (arrowCount === 0) {
      const diff = getDiff(info, lionArr);
      if (maxDiff < diff) {
        //
        maxDiff = diff;
        candidate = [...lionArr];
        return;
      }

      if (diff > 0 && maxDiff === diff) {
        candidate = compareCountOfLowScore(candidate, lionArr);
      }

      return;
    }

    for (let i = startI; i < N; i++) {
      const apichiCount = info[i];
      if (apichiCount < arrowCount) {
        const newLionArr = [...lionArr];
        newLionArr[i] = apichiCount + 1;
        dfs(newLionArr, arrowCount - apichiCount - 1, i + 1);
        dfs([...lionArr], arrowCount, i + 1);
      } else if (i === N - 1) {
        const newLionArr = [...lionArr];
        newLionArr[i] = arrowCount;
        dfs([...newLionArr], 0, i + 1);
      }
    }
  };

  const initial = new Array(N).fill(0);
  dfs(initial, n, 0);

  return maxDiff <= 0 ? [-1] : candidate;
};

const n = 1; // 화살 개수
const info = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // [10점, 9점, ... 0점] 개수

console.log(solution(n, info));
