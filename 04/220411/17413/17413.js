/* 단어 뒤집기2 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const str = fs.readFileSync(filePath).toString().trim();

const solution = (input) => {
  const charArr = input.split('');
  const stack = [];
  let answer = '';
  let tag = false;

  for (let i = 0; i < charArr.length; i++) {
    const char = charArr[i];

    if (tag) {
      answer += char;
      if (char === '>') tag = false;
      continue;
    }

    if (char === '<') {
      while (stack.length) answer += stack.pop();
      tag = true;
      answer += '<';
      continue;
    }

    if (char === ' ') {
      while (stack.length) answer += stack.pop();
      answer += ' ';
      continue;
    }

    stack.push(char);
  }
  while (stack.length) answer += stack.pop();
  return answer;
};
