const getCoords = (number) => {
  if (number === '*') {
    return [3, 0];
  }
  if (number === 0) {
    return [3, 1];
  }
  if (number === '#') {
    return [3, 2];
  }

  return [Math.floor((number - 1) / 3), (number - 1) % 3];
};

const getDist = (coords1, coords2) => {
  const [x1, y1] = coords1;
  const [x2, y2] = coords2;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

// 반환: [누른 손, 왼쪽 손 좌표, 오른쪽 손 좌표]
const resolveHand = (number, defaultHand, leftHand, rightHand) => {
  // 누르고자 하는 번호의 좌표
  const targetCoords = getCoords(number);

  // 왼쪽으로 누르는 경우, 왼쪽 손을 타겟 좌표로 옮김
  if ([1, 4, 7].includes(number)) {
    return ['L', targetCoords, rightHand];
  }

  // 오른손으로 누르는 경우, 오른쪽 손을 타겟 좌표로 옮김
  if ([3, 6, 9].includes(number)) {
    return ['R', leftHand, targetCoords];
  }

  // 타겟좌표로부터 더 가까운 손이 타겟 좌표로 옮겨짐
  const leftDist = getDist(leftHand, targetCoords);
  const rightDist = getDist(rightHand, targetCoords);
  if (leftDist < rightDist) {
    return ['L', targetCoords, rightHand];
  }

  if (rightDist < leftDist) {
    return ['R', leftHand, targetCoords];
  }

  if (defaultHand === 'left') {
    return ['L', targetCoords, rightHand];
  }

  return ['R', leftHand, targetCoords];
};

const solution = (numbers, hand) => {
  let answer = '';

  let nextHand = '';
  let leftHand = getCoords('*');
  let rightHand = getCoords('#');

  numbers.forEach((number) => {
    [nextHand, leftHand, rightHand] = resolveHand(
      number,
      hand,
      leftHand,
      rightHand
    );
    answer += nextHand;
  });

  return answer;
};

const numbers = [7, 0, 8, 2, 8, 3, 1, 5, 7, 6, 2];
const hand = 'left';
console.log(solution(numbers, hand));
