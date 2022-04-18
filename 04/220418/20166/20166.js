/* 문자열 지옥에 빠진 호석 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M, K] = input[0].split(' ').map(Number);
const graph = new Array(N);
for (let i = 0; i < N; i++) graph[i] = input[i + 1].split('');
const quiz = [];
for (let i = N + 1; i < N + 1 + K; i++) quiz.push(input[i]);

// N: 행 개수
// M: 열 개수
// K: 퀴즈 개수
// graph: 지도
// quiz: 퀴즈 문자열
// cache: 캐시
// direction: [왼쪽위, 위, 오른쪽위, 왼쪽, 오른쪽, 왼쪽아래, 아래, 오른쪽아래]
/* ans = 경우의수 배열 
   ans[퀴즈번호] = 경우의수 */

const ans = new Array(K).fill(0);
const cache = {};
const direction = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

// row, col 에서 y, x로 움직인 좌표 반환
const move = (row, col, y, x) => {
  const result = [row + y, col + x];
  if (result[0] < 0) result[0] = N - 1;
  else if (result[0] > N - 1) result[0] = 0;

  if (result[1] < 0) result[1] = M - 1;
  else if (result[1] > M - 1) result[1] = 0;

  return result;
};

// word: 현재 퀴즈 단어
// wordLength: 단어 길이
// quizNumber: 퀴즈 번호
// idx: 문자열 인덱스
const dfs = (word, wordLength, quizNumber) => {
  return function recursion(idx, row, col, str) {
    if (word[idx] !== graph[row][col]) return;
    str += graph[row][col];

    if (idx >= wordLength - 1) {
      ans[quizNumber]++;
      return;
    }

    for (const [y, x] of direction) {
      const [nextRow, nextCol] = move(row, col, y, x);
      recursion(idx + 1, nextRow, nextCol, str);
    }
  };
};

for (let i = 0; i < quiz.length; i++) {
  const word = quiz[i];
  if (Object.hasOwn(cache, word)) {
    ans[i] = cache[word];
    continue;
  }
  const go = dfs(word, word.length, i);

  // bruteforce
  for (let j = 0; j < N; j++) for (let k = 0; k < M; k++) go(0, j, k, '');
  cache[word] = ans[i];
}

console.log(ans.join('\n'));
