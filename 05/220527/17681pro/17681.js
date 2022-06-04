/* 비밀 지도 */

// 10진수 -> 2진수 문자열로 바꾸는 함수
// 두번째 인자로 전달한 길이만큼 늘림 (높은 비트를 0으로 채움)
// 한 변의 길이인 n을 length에 대입하면 됨.

const decimalToBinary = (decimal, length) => {
  let output = decimal.toString(2);
  const prefixLength = length - output.length;

  for (let i = 0; i < prefixLength; i++) {
    output = '0' + output;
  }
  return output;
};

const decode = (binaryStr) => {
  let output = '';
  for (const char of binaryStr) {
    if (char === '0') {
      output += ' ';
      continue;
    }
    output += '#';
  }
  return output;
};

// 벽 = 1, 빈공간 = 0
// 각 요소를 | 로 비트연산하면 문제에서 제시한 조건에 맞는 결과가 나옴
// 1 | 0 = 1
// 1 | 1 = 1
// 0 | 0 = 0
const solution = (n, arr1, arr2) => {
  return arr1
    .map((num, idx) => num | arr2[idx])
    .map((num) => decimalToBinary(num, n))
    .map((binaryStr) => decode(binaryStr));
};

const n = 5;
const arr1 = [9, 20, 28, 18, 11];
const arr2 = [30, 1, 21, 17, 28];

console.log(solution(n, arr1, arr2));
