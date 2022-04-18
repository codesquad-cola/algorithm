/* 공유기 설치 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, C] = input[0].split(' ').map(Number);
const house = [];
for (let i = 0; i < N; i++) {
  house.push(+input[i + 1]);
}

house.sort((a, b) => a - b);

// N: 집 개수
// C: 공유기 개수
// house: 집 좌표 배열
const solution = ({ N, C, house }) => {
  let left = 1; // 좌표가 전부 다르기 때문에 최소 간격 1
  let right = house[N - 1] - house[0];

  while (left <= right) {
    let cnt = 1; // 0번 인덱스에는 항상 공유기를 놔야함
    let mid = Math.floor((left + right) / 2);

    let start = 0; // 방금 공유기 설치한 집의 인덱스
    for (let i = 0; i < N; i++) {
      if (house[i] - house[start] < mid) continue;
      // 두 집 i, start의 간격이 mid 이상인 경우 cnt++, start업데이트
      cnt++;
      start = i;
      if (cnt === C) break; // 이게 있으면 시간 단축에 도움이 될까요?
    }

    if (cnt >= C) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left - 1;
};

console.log(solution({ N, C, house }));
