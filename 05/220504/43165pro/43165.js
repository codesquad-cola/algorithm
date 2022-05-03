const dfs = (arrLength, arr, targetNum) => {
  let ans = 0;

  return [
    function recur(idx, sum) {
      if (idx >= arrLength) {
        if (sum === targetNum) {
          ans++;
        }
        return;
      }

      recur(idx + 1, sum + arr[idx]);
      recur(idx + 1, sum - arr[idx]);
    },
    () => ans,
  ];
};

function solution(numbers, target) {
  const [recur, getAns] = dfs(numbers.length, numbers, target);

  recur(0, 0);
  return getAns();
}

const numbers = [4, 1, 2, 1];
const target = 4;

console.log(solution(numbers, target));
