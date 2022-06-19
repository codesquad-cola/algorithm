// 두개 뽑아서 더하기

function solution(numbers) {
  const map = {}; // 중복 체크용 맵
  var answer = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      if (map.hasOwnProperty(sum)) {
        continue;
      } else {
        answer.push(sum);
        map[sum] = true;
      }
    }
  }

  answer.sort((a, b) => a - b);
  return answer;
}
