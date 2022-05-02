/* 42842. 카펫 */

function solution(brown, yellow) {
  // x: 가로길이 >= 3
  // y: 세로길이 >= 3
  // x >= 3

  let x = 3;
  let y = 3;
  const xy = brown + yellow;

  for (let y = 3; ; y++) {
    for (let x = y; ; x++) {
      if (x * y > xy) break;
      if ((x - 2) * (y - 2) === yellow && 2 * (x + y) - 4 === brown)
        return [x, y];
    }
  }
}

const brown = 24; // 8 <= brown <= 5_000
const yellow = 24; // 1 <= yellow <= 2_000_000

console.log(solution(brown, yellow));
