/* 42840. 모의고사 */

const answers = [1, 2, 3, 4, 5];

// guess[i]: i번째 플레이어의 찍기 규칙
// guess[i][j % guess[i].length]: i번째 플레이어의 j번 문제 찍기 규칙
function solution(answers) {
  const answer = [];

  const guess = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  const count = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    const ans = answers[i];

    for (let j = 0; j < 3; j++) {
      // i번 문제에 대해 j번째 플레이어가 제출한 정답
      const submit = i % guess[j].length;
      if (guess[j][submit] === ans) {
        count[j] += 1;
      }
    }
  }

  const max = Math.max(...count);

  count.forEach((value, playerNum) => {
    if (max === value) answer.push(playerNum + 1);
  });

  return answer;
}

console.log(solution(answers));
