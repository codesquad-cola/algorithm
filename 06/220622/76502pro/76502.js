// 닫는 괄호 -> 여는 괄호로 매핑
const map = {
  ')': '(',
  ']': '[',
  '}': '{',
};

function isValid(sArr) {
  const stack = [];
  for (const el of sArr) {
    if (['(', '[', '{'].includes(el)) {
      stack.push(el);
    } else {
      // 짝이 맞지 않으면 X
      // stack의 길이가 0이면 X -> stack[length -1]이 undefined가 되므로 무조건 false
      const { length } = stack;
      if (stack[length - 1] !== map[el]) {
        return false;
      }
      stack.pop();
    }
  }

  // 최종적으로 stack의 길이가 0이 아니면 X
  return !stack.length;
}

function rotate(sArr) {
  sArr.push(sArr.shift());
}

function solution(s) {
  var answer = 0;

  const { length } = s;
  const sArr = s.split('');

  for (let i = 0; i < length; i++) {
    if (isValid(sArr)) {
      ++answer;
    }
    rotate(sArr);
  }

  return answer;
}
