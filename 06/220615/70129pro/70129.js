// 이진 변환 반복하기
function solution(s) {
  var answer = [0, 0];

  let nextBinary = s;
  let cnt;

  while (nextBinary !== '1') {
    cnt = 0;

    // 1. 0의 개수 세기
    // 0의 개수 업데이트
    for (const char of nextBinary) {
      if (char === '0') cnt += 1;
    }
    answer[1] += cnt;

    // 2. 길이만큼 이진수로 변환하는 과정
    // 이진 변환의 횟수 업데이트
    nextBinary = (nextBinary.length - cnt).toString(2);
    answer[0] += 1;
  }

  return answer;
}
