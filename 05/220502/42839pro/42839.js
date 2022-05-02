/* 42839. 소수 찾기 */

const numbers = '17';

function permutation(arr, num) {
  const res = [];
  if (num === 1) return arr.map((v) => [v]);

  arr.forEach((v, idx, arr) => {
    const rest = [...arr.slice(0, idx), ...arr.slice(idx + 1)];
    const permutations = permutation(rest, num - 1);
    const attach = permutations.map((permutation) => [v, ...permutation]);
    res.push(...attach);
  });
  return res;
}

const isPrime = (num) => {
  if (num <= 1) return false;
  if (num === 2) return true;

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

function solution(numbers) {
  let answer = 0;

  const papers = numbers.split('').map(Number);

  // 1. 만들 수 있는 모든 경우의 수를 구해서 배열에 담기
  // 2. 배열을 순회하면서 소수인지 체크하며 answer에 +1씩 하기
  // 종이조각은 한번 이상 사용할 수 없음

  const candSet = new Set();
  for (let i = 0; i < papers.length; i++) {
    const p = permutation(papers, i + 1);

    p.map((arr) => Number(arr.join(''))).forEach((num) => candSet.add(num));
  }

  candSet.forEach((num) => {
    if (isPrime(num)) answer++;
  });

  return answer;
}

console.log(solution(numbers));
