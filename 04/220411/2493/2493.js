/* 탑 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const [N, input] = fs.readFileSync(filePath).toString().trim().split('\n');

const heights = [null, ...input.split(' ').map(Number)];

const solution = (N, heights) => {
  // heights: [null, ...input]
  // stack = heights의 인덱스가 들어갈 수 있음. 인덱스는 1 ~ N
  // oldIdx: stack[stack.length - 1]
  // newIdx: stack에 들어가려는 idx
  // 1. heights[oldIdx] > heights[newIdx]여야 stack에 쌓일 수 있음
  // 2. heights[oldIdx] < heights[newIdx]이면
  //    - stack.pop() : oldIdx를 빼냄.
  //    - answer[oldIdx - 1] = newIdx로 설정
  // 3. heights[oldIdx] > heights[newIdx]이 되거나 stack.length === 0이 될 때 까지 반복.
  // 4. while탈출 후 stack에 newIdx 추가.
  // 5. check 끝 && for문 끝이면 stack에 있던 모든 oldIdx에 대해서
  //    - answer[oldIdx - 1] = 0
  const stack = [];
  const answer = new Array(+N).fill(null);

  const check = (newIdx) => {
    let oldIdx = stack[stack.length - 1];
    while (heights[oldIdx] < heights[newIdx] && stack.length !== 0) {
      stack.pop();
      answer[oldIdx - 1] = newIdx;
      oldIdx = stack[stack.length - 1];
    }
    stack.push(newIdx);
  };

  for (let i = N; i >= 1; i--) {
    check(i);
  }

  while (stack.length) {
    const idx = stack.pop();
    answer[idx - 1] = 0;
  }
  return answer.join(' ');
};

console.log(solution(N, heights));
