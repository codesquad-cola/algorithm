/* 단속카메라 */

const solution = (routes) => {
  // routes[0]: 진입
  // routes[1]: 진출
  routes.sort((a, b) => a[0] - b[0]);

  // 현재 범위의 마지막을 설치지점으로 설정 (새로 설치할 때는 항상 현재 범위의 마지막으로 설정하고 조절하면서 점차 줄어듦)

  // 1) 다음 범위의 시작 <= 현재 설치지점인 경우
  //   다음 범위의 마지막 <= 현재 설치지점인 경우: 설치지점을 다음범위의 마지막으로
  //   다음 범위의 마지막 > 현재 범위의 마지막: continue
  // 2) 다음 범위의 시작 > 현재 설치지점인 경우
  //   다음 범위의 마지막으로 설치 지점 설정하고, 설치개수 + 1
  // 반복

  let answer = 1;
  let installPoint = routes[0][1];

  for (const route of routes) {
    const [startPoint, endPoint] = route;
    if (startPoint <= installPoint) {
      if (endPoint <= installPoint) {
        installPoint = endPoint;
      }
    } else {
      installPoint = endPoint;
      ++answer;
    }

    prevRoute = route;
  }

  return answer;
};

console.log(
  solution([
    [-20, -15],
    [-14, -5],
    [-18, -13],
    [-5, -3],
  ])
);
