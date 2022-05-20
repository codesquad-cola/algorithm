/* 가장 큰 수 */

function solution(numbers) {
  const answer = numbers
    .map((number) => number.toString())
    .sort((a, b) => b + a - (a + b))
    .join('');

  return answer[0] === '0' ? '0' : answer;
}

const numbers = [3, 30, 34, 5, 9];

console.log(solution(numbers));
