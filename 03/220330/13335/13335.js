/* 트럭 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [n, length, maxWeight] = input[0].split(' ').map(Number);
const weight = input[1].split(' ').map(Number);

/**
 * n: 트럭 수
 * length: 다리 길이
 * maxWeight: 최대 하중
 * weight: 각 트럭의 무게 배열(길이 n)
 */

const solution = ({ n, length, maxWeight, weight }) => {
  if (n === 1) return 1 + length;

  const entryTime = [1]; // 각 트럭이 다리에 들어간 시간 배열, 첫 번째 트럭은 무조건 1초에 들어감
  let head = 0; // 다리에서 가장 앞서가는 트럭 idx
  let tail = 0; // 다리에서 가장 뒤에있는 트럭 idx
  let weightSum = weight[0]; // 현재 다리 위에 있는 트럭의 무게 합
  let sec = 1 + 1;

  while (tail < n - 1) {
    // sec = 3
    const nextTruckWeight = weight[tail + 1];
    if (sec === entryTime[head] + length) {
      // head에 있는 트럭이 다리에서 나가는 시간
      weightSum -= weight[head];
      ++head;
    }

    if (nextTruckWeight + weightSum > maxWeight) {
      // 다음 트럭이 들어올 수 없다면 head에 있는 트럭이 나가고 나서 다시 확인해봐야 함
      sec = entryTime[head] + length;
      weightSum -= weight[head];
      ++head;
      continue;
    }

    // nextTruck이 진입할 수 있음
    entryTime[tail + 1] = sec;
    weightSum += nextTruckWeight;
    ++tail;
    ++sec;
  }

  return entryTime[tail] + length;
};

console.log(solution({ n, length, maxWeight, weight }));
