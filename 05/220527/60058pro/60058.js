// 올바른 괄호 문자열 체크
const isValid = (str) => {
  if (str === '') return true;

  const stack = [];

  for (const char of str) {
    if (char === '(') {
      stack.push(1);
    } else {
      const pop = stack.pop();
      if (!pop) {
        return false;
      }
    }
  }

  // 스택이 다 비어져 있지 않으면 올바르지 않은 괄호 문자열
  if (stack.length) {
    return false;
  }

  // 스택도 다 비어져 있고, )문자열이 나왔을 때 스택에 (가 없는 경우가 한번도 없었다면 올바른 괄호 문자열
  return true;
};

// 괄호 문자열을 u와 v로 나누어서 [u, v]로 반환하는 함수
const divide = (str) => {
  let output = '';
  let breakPoint = 0;
  let openCount = 0;
  let closeCount = 0;

  const length = str.length;

  for (let i = 0; i < length; i++) {
    output += str[i];
    if (str[i] === '(') {
      ++openCount;
    } else {
      ++closeCount;
    }

    if (openCount === closeCount) {
      breakPoint = i;
      break;
    }
  }
  return [output, str.substr(breakPoint + 1)];
};

// 괄호 문자열의 첫번째와 마지막을 제거하는 함수
const removeFirstAndLastChar = (str) => {
  const lastIndex = str.length - 1;

  return str.slice(1, lastIndex);
};

// (를 )로 )를 (로 뒤집는 함수
const invertParentheses = (str) => {
  let output = '';
  for (const char of str) {
    if (char === '(') {
      output += ')';
    } else {
      output += '(';
    }
  }
  return output;
};

// 문제에 제시된 재귀 로직
const solution = (str) => {
  if (str === '') return str;

  const [u, v] = divide(str);

  if (isValid(u)) {
    return u + solution(v);
  }

  return '(' + solution(v) + ')' + invertParentheses(removeFirstAndLastChar(u));
};

const p = '(()())()';
console.log(solution(p));
