/* 메뉴 리뉴얼 */

function solution(orders, course) {
  const answer = [];

  for (let i = 0; i < orders.length; i++) {
    orders[i] = orders[i].split('').sort().join('');
  }

  const countMap = {};
  course.forEach((cnt) => {
    countMap[cnt] = {};
  });

  const dfs = (order, cnt, depth, idx, str) => {
    if (str.length >= cnt) {
      if (countMap[cnt][str]) {
        countMap[cnt][str] += 1;
        return;
      }
      countMap[cnt][str] = 1;

      return;
    }

    if (order.length <= idx) {
      return;
    }

    dfs(order, cnt, depth + 1, idx + 1, str + order[idx]);
    dfs(order, cnt, depth, idx + 1, str);
  };

  for (const order of orders) {
    for (cnt of course) {
      if (order.length >= cnt) {
        dfs(order, cnt, 0, 0, '');
      }
    }
  }

  for (const courseCnt of course) {
    let max = 0;
    let result = [];
    for (const [comb, cnt] of Object.entries(countMap[courseCnt])) {
      if (cnt <= 1) {
        continue;
      }

      if (max < cnt) {
        max = cnt;
        result = [comb];
      } else if (max === cnt) {
        result.push(comb);
      }
    }

    answer.push(...result);
  }

  return answer.sort();
}

const orders = ['ABCDE', 'ABCD', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'];
const course = [2, 3, 4, 5];

console.log(solution(orders, course));

// orders를 순회하면서

// 1. 각 order마다
// 2. course에 있는 숫자를 순회하면서
// 2-1. 조합을 구하여 countMap에 저장한다.
// countMap: { 2: { AB: 2개, AC: 3개, ... } 3: { ABC: 2개, ... } }

// 3. countMap의 각 프로퍼티마다(2, 3, 4...)
// 3-1. 2개 이상이고, 가장 큰 값들을 배열에 담는다.
// 3-2. 개수를 세고, 이전 개수와 비교해가면서
// 이전 개수보다 크다면 배열을 새로 교체하고, 해당 값을 push
// 이전 개수와 같다면 그냥 push만.
