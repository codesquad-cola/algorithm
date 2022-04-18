/* 로봇 청소기 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const [x, y, d] = input[1].split(' ').map(Number);
const map = [];
for (let i = 2; i < 2 + N; i++) {
  map[i - 2] = input[i].split(' ').map(Number);
}

// N: 행
// M: 열
// x, y: 로봇 시작 좌표
// d: 로봇 시작 방향, 0북 1동 2남 3서
// 탐색 순서 d 0 -> 3 -> 2 -> 1 -> 0 -> 3 ...

const rotate = (dir) => {
  if (dir === 0) return 3;
  return dir - 1;
};

const computeNextCoords = (x, y, dir) => {
  if (dir === 0) return [x - 1, y];
  if (dir === 1) return [x, y + 1];
  if (dir === 2) return [x + 1, y];
  if (dir === 3) return [x, y - 1];
};

let cleanCnt = 0;
let stop = false;

const clean = (x, y, dir) => {
  if (map[x][y] !== 2) {
    map[x][y] = 2; // 현재 위치를 청소한다.
    ++cleanCnt;
  }

  let cnt = 4;
  while (cnt > 0 && !stop) {
    --cnt;
    dir = rotate(dir);
    if (dir === 0 && map[x - 1][y] === 0) {
      clean(x - 1, y, dir);
      continue;
    }
    if (dir === 1 && map[x][y + 1] === 0) {
      clean(x, y + 1, dir);
      continue;
    }
    if (dir === 2 && map[x + 1][y] === 0) {
      clean(x + 1, y, dir);
      continue;
    }
    if (dir === 3 && map[x][y - 1] === 0) {
      clean(x, y - 1, dir);
      continue;
    }
  }

  if (stop) return;

  const back = rotate(rotate(dir));
  const [nx, ny] = computeNextCoords(x, y, back);
  if (map[nx][ny] === 1) stop = true;
  else clean(nx, ny, dir);
};

clean(x, y, d);
console.log(cleanCnt);
