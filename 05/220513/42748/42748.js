/* K번째 수 */

function solution(array, commands) {
  const answer = [];

  commands.forEach(([i, j, k]) => {
    const nums = array.slice(i - 1, j).sort((a, b) => a - b);
    answer.push(nums[k - 1]);
  });

  return answer;
}
