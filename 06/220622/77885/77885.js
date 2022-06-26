// 2진수로 바꿨을 때
// 끝자리가 0이면 === 짝수이면 -> +1한 숫자는 1자리만 다름. (따라서 +1한 숫자가 정답)
// 끝자리가 1이면 === 홀수이면 -> LSB -> MSB쪽으로 이동하면서 0을 찾으면 1로 바꾸고, 바로 직전 비트를 0으로 바꾼다.

function solution(numbers) {
  return numbers.map((number) => {
    if (number % 2 === 0) {
      return number + 1;
    } else {
      const binary = '0' + number.toString(2);
      const { length } = binary;
      let firstZeroIndex;
      for (let i = length - 1; i >= 0; i--) {
        if (binary[i] === '0') {
          firstZeroIndex = i;
          break;
        }
      }

      return parseInt(
        binary.slice(0, firstZeroIndex) +
          '10' +
          binary.slice(firstZeroIndex + 2),
        2
      );
    }
  });
}
