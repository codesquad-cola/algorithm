function solution(n) {
  const answer = [];

  // n개의 배열 생성.
  for (let i = 0; i < n; i++) {
    answer.push([]);
  }

  let loopCnt = n;

  let num = 1;
  let row = 0;
  let col = 0;
  while (loopCnt) {
    for (let i = 0; i < loopCnt; ++i, ++row) {
      answer[row][col] = num++;
    }

    --row;
    --loopCnt;
    if (!loopCnt) break;
    col += 1;

    for (let j = 0; j < loopCnt; ++j, ++col) {
      answer[row][col] = num++;
    }

    --col;
    --loopCnt;
    if (!loopCnt) break;
    --row;
    --col;

    for (let k = 0; k < loopCnt; ++k, --row, --col) {
      answer[row][col] = num++;
    }

    row += 2;
    ++col;
    --loopCnt;
  }

  return answer.flat();
}
