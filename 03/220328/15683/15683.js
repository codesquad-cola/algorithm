/* 감시 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const graph = [];
for (let i = 1; i <= N; i++) {
  graph[i - 1] = input[i].split(' ').map(Number);
}

const countBlindSpot = (arr) => {
  let count = 0;
  for (const row of arr) {
    for (const cell of row) {
      if (cell === 0) count++;
    }
  }
  return count;
};

const copy2dArr = (arr) => {
  const copy = [];
  for (const row of arr) {
    copy.push([...row]);
  }

  return copy;
};

const markU = (arr, row, col) => {
  const copy = copy2dArr(arr);
  for (let i = row - 1; i >= 0; i--) {
    if (copy[i][col] === 6) break;
    copy[i][col] = '#';
  }
  return copy;
};

const markD = (arr, row, col) => {
  const copy = copy2dArr(arr);
  for (let i = row + 1; i < N; i++) {
    if (copy[i][col] === 6) break;
    copy[i][col] = '#';
  }
  return copy;
};

const markL = (arr, row, col) => {
  const copy = copy2dArr(arr);
  for (let i = col - 1; i >= 0; i--) {
    if (copy[row][i] === 6) break;
    copy[row][i] = '#';
  }
  return copy;
};

const markR = (arr, row, col) => {
  const copy = copy2dArr(arr);
  for (let i = col + 1; i < M; i++) {
    if (copy[row][i] === 6) break;
    copy[row][i] = '#';
  }
  return copy;
};

// N: 행 크기
// M: 열 크기
// graph: 지도
// 0: 사각지대, 0 개수 = 사각지대 개수
// 1: 방향 1개, U R D L
// 2: 방향 2개, UD RL
// 3: 방향 2개, UR RD DL LU
// 4: 방향 3개, URD UDL DLU LUR
// 5: 방향 4개, URDL
// 6: 벽
// #: 감시중
// cctv: [[행, 열, cctv종류], ...]
// answer: 사각지대 개수
const solution = ({ N, M, graph }) => {
  const cctv = [];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (graph[i][j] >= 1 && graph[i][j] < 6) cctv.push([i, j, graph[i][j]]);
    }
  }

  let answer = Number.MAX_SAFE_INTEGER;
  const cctvLength = cctv.length;

  const dfs = (cnt, arr) => {
    if (cnt >= cctvLength) {
      const count = countBlindSpot(arr);
      if (count < answer) answer = count;
      return;
    }

    const [row, col, cctvNum] = cctv[cnt];
    if (cctvNum === 1) {
      dfs(cnt + 1, markU(arr, row, col));
      dfs(cnt + 1, markD(arr, row, col));
      dfs(cnt + 1, markR(arr, row, col));
      dfs(cnt + 1, markL(arr, row, col));
    } else if (cctvNum === 2) {
      const UD = markU(markD(arr, row, col), row, col);
      const RL = markR(markL(arr, row, col), row, col);
      dfs(cnt + 1, UD);
      dfs(cnt + 1, RL);
    } else if (cctvNum === 3) {
      const UR = markU(markR(arr, row, col), row, col);
      const RD = markR(markD(arr, row, col), row, col);
      const DL = markD(markL(arr, row, col), row, col);
      const LU = markL(markU(arr, row, col), row, col);
      dfs(cnt + 1, UR);
      dfs(cnt + 1, RD);
      dfs(cnt + 1, DL);
      dfs(cnt + 1, LU);
    } else if (cctvNum === 4) {
      const URD = markU(markR(markD(arr, row, col), row, col), row, col);
      const RDL = markR(markD(markL(arr, row, col), row, col), row, col);
      const DLU = markD(markL(markU(arr, row, col), row, col), row, col);
      const LUR = markL(markU(markR(arr, row, col), row, col), row, col);
      dfs(cnt + 1, URD);
      dfs(cnt + 1, RDL);
      dfs(cnt + 1, DLU);
      dfs(cnt + 1, LUR);
    } else if (cctvNum === 5) {
      const URDL = markU(
        markR(markD(markL(arr, row, col), row, col), row, col),
        row,
        col
      );
      dfs(cnt + 1, URDL);
    }
  };

  dfs(0, graph);
  return answer;
};

console.log(solution({ N, M, graph }));
