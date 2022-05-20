/* H-Index */

function solution(citations) {
  let answer = 0;

  // citations[i] === 논문 인용수
  // i + 1 === citations[i]번 이상 인용된 논문"편" 수
  // [2, 10, 30, 40]의 H-Index: 3
  citations.sort((a, b) => b - a);

  const len = citations.length;

  for (let i = len - 1; i >= 0; i--) {
    // citations[i]번 이상 인용된 논문이 i + 1편 이상이면 hIndex
    if (citations[i] >= i + 1) {
      return i + 1;
    }
  }

  return answer;
}
[6, 5, 3, 1, 0];
[1, 2, 3, 4, 5];
const citations = [3, 0, 6, 1, 5];

console.log(solution(citations));
