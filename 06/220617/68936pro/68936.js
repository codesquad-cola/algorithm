// 쿼드 압축 후 개수세기

function solution(arr) {
  const isCompactable = (arr, startRow, endRow, startCol, endCol) => {
    const val = arr[startRow][startCol];
    for (let i = startRow; i < endRow; i++) {
      for (let j = startCol; j < endCol; j++) {
        if (val !== arr[i][j]) {
          return false;
        }
      }
    }

    return true;
  };

  const answer = [0, 0];

  // endRow와 endCol은 실제 값보다 +1하여 대입. (나누기 연산이 편리해지기 때문)
  const recur = (arr, startRow, endRow, startCol, endCol) => {
    const len = endRow - startRow;
    const val = arr[startRow][startCol];

    if (len === 1) {
      answer[val] += 1;
      return;
    }

    if (isCompactable(arr, startRow, endRow, startCol, endCol)) {
      answer[val] += 1;
      return;
    }

    const middleRow = (startRow + endRow) / 2;
    const middleCol = (startCol + endCol) / 2;
    recur(arr, startRow, middleRow, startCol, middleCol);
    recur(arr, middleRow, endRow, startCol, middleCol);
    recur(arr, startRow, middleRow, middleCol, endCol);
    recur(arr, middleRow, endRow, middleCol, endCol);
  };

  recur(arr, 0, arr.length, 0, arr.length);

  return answer;
}
