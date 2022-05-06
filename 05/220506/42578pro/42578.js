/* 위장 */

const solution = (clothes) => {
  let answer = 1;

  const table = {};

  for (const [, type] of clothes) {
    if (table.hasOwnProperty(type)) {
      table[type] += 1;
      continue;
    }
    table[type] = 1;
  }

  for (const num of Object.values(table)) {
    answer *= num + 1;
  }

  return answer - 1;
};

const clothes = [
  ['yellowhat', 'headgear'],
  ['bluesunglasses', 'eyewear'],
  ['green_turban', 'headgear'],
];

console.log(solution(clothes));
