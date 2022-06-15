function solution(a, b) {
  return a.reduce((acc, _, idx) => acc + a[idx] * b[idx], 0);
}

const a = [1, 2, 3, 4];
const b = [-3, -1, 0, 2];
console.log(solution(a, b));
