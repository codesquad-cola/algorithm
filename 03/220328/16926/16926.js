/* 배열 돌리기1 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M, R] = input[0].split(' ').map(Number);
const arr = [];
for (let i = 0; i < N; i++) {
  arr[i] = input[i + 1].split(' ').map(Number);
}

const solution = ({ N, M, R, arr }) => {
  const answer = Array.from({ length: N });
  arr.forEach((row, i) => {
    answer[i] = [...row];
  });

  const rotate = (arr, startRow, startCol, rowCnt, colCnt) => {
    const maxRow = startRow + rowCnt - 1;
    const maxCol = startCol + colCnt - 1;

    answer[startRow + 1][startCol] = arr[startRow][startCol]; // left top
    answer[maxRow][startCol + 1] = arr[maxRow][startCol]; // left bottom
    answer[maxRow - 1][maxCol] = arr[maxRow][maxCol]; // right bottom
    answer[startRow][maxCol - 1] = arr[startRow][maxCol]; // right top

    for (let j = startCol + 1; j < maxCol; j++) {
      answer[startRow][j - 1] = arr[startRow][j];
      answer[maxRow][j + 1] = arr[maxRow][j];
    }

    for (let i = startRow + 1; i < maxRow; i++) {
      answer[i + 1][startCol] = arr[i][startCol];
      answer[i - 1][maxCol] = arr[i][maxCol];
    }

    for (let row = startRow; row <= maxRow; row++) {
      arr[row][startCol] = answer[row][startCol];
      arr[row][maxCol] = answer[row][maxCol];
    }

    for (let col = startCol; col <= maxCol; col++) {
      arr[startRow][col] = answer[startRow][col];
      arr[maxRow][col] = answer[maxRow][col];
    }
  };

  const getMod = (rowCnt, colCnt) => {
    return 2 * rowCnt + 2 * colCnt - 4;
  };

  const min = Math.min(N, M);
  const groupCnt = min / 2;

  let rowCnt = N;
  let colCnt = M;
  for (let i = 0; i < groupCnt; i++) {
    const mod = getMod(rowCnt, colCnt);
    const rotateCnt = R % mod;

    for (let k = 0; k < rotateCnt; k++) {
      rotate(arr, i, i, rowCnt, colCnt);
    }

    rowCnt -= 2;
    colCnt -= 2;
  }

  return answer.reduce((acc, cur) => {
    acc += cur.join(' ') + '\n';
    return acc;
  }, '');
};

console.log(solution({ N, M, R, arr }));
