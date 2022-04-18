/* 눈덩이 굴리기 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const snows = [0].concat(input[1].split(' ').map(Number));

// N: snows의 길이
// M: 제한시간
// snows[i]: 위치 i에 쌓인 눈 (1 <= i <= N)
const solution = ({ N, M, snows }) => {
  let max = Number.MIN_SAFE_INTEGER;

  const go = (sec, curIdx, move, size) => {
    curIdx += move;

    if (sec > M || curIdx > N) {
      if (max < size) max = size;
      return;
    }

    size += snows[curIdx];
    go(sec + 1, curIdx, 1, size);
    go(sec + 1, curIdx, 2, Math.floor(size / 2));
  };

  go(0, 0, 0, 1);
  return max;
};

console.log(solution({ N, M, snows }));
