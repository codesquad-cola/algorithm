/* 단어 변환 */

// word1, word2가 한문자 차이라면 true, 그외에는 false를 반환
const validation = (word1, word2) => {
  let diffCnt = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) {
      diffCnt++;
    }
  }

  if (diffCnt === 1) {
    return true;
  }
  return false;
};

const solution = (begin, target, words) => {
  let answer = Number.MAX_SAFE_INTEGER;
  if (!words.includes(target)) return 0;
  const edges = { [begin]: [] };
  const visited = {};

  // 1. begin과 연결된 단어 찾기
  // 2. 각 단어마다 방문 여부 초기화 (visited)
  // 3. 각 단어마다 연결된 단어 찾기 (edges)
  words.forEach((word1, _, words) => {
    if (validation(begin, word1)) {
      edges[begin].push(word1);
    }
    edges[word1] = [];
    visited[word1] = false;

    words.forEach((word2) => {
      if (validation(word1, word2)) {
        edges[word1].push(word2);
      }
    });
  });

  const dfs = (word, cnt) => {
    if (word === target) {
      if (answer > cnt) {
        answer = cnt;
      }
      return;
    }

    for (const nextWord of edges[word]) {
      if (visited[nextWord]) {
        continue;
      }
      visited[nextWord] = true;
      dfs(nextWord, cnt + 1);
      visited[nextWord] = false;
    }
  };

  dfs(begin, 0);

  if (answer === Number.MAX_SAFE_INTEGER) {
    answer = 0;
  }
  return answer;
};

const begin = 'hit';
const target = 'cog';
const words = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

console.log(solution(begin, target, words));
