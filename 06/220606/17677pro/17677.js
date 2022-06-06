// 넣기 전에 toUpperCase 하기.
// 빈문자열 처리하기
const createMultiSet = (str) => {
  if (str === '') {
    return [];
  }

  const regex = /[A-Z]/;
  const { length } = str;
  const result = [];

  let nextCharMatch = str[0].match(regex);
  for (let i = 0; i < length - 1; i++) {
    const [cur, next] = [str[i], str[i + 1]];
    const tmp = next.match(regex);

    if (nextCharMatch && tmp) {
      result.push(cur + next);
    }
    nextCharMatch = tmp;
  }
  return result;
};

// 정렬 + 투 포인터
const getNumOfIntersection = (set1, set2) => {
  set1.sort();
  set2.sort();

  let i = 0;
  let j = 0;
  const maxI = set1.length;
  const maxJ = set2.length;

  let count = 0;
  while (i < maxI && j < maxJ) {
    const iStr = set1[i];
    const jStr = set2[j];

    if (iStr === jStr) {
      ++count;
      ++i;
      ++j;
    } else if (iStr < jStr) {
      ++i;
    } else {
      ++j;
    }
  }

  return count;
};

const solution = (str1, str2) => {
  const multiplier = 2 << 15;

  str1 = str1.toUpperCase();
  str2 = str2.toUpperCase();

  const str1MultiSet = createMultiSet(str1);
  const str2MultiSet = createMultiSet(str2);

  const denominator = getNumOfIntersection(str1MultiSet, str2MultiSet);

  const numerator = str1MultiSet.length + str2MultiSet.length - denominator;

  // 둘다 공집합인 경우. (빈문자열 이거나, 2개의 알파벳 조합이 없는 문자(a+a, +b, =-+))
  if (numerator === 0) {
    return multiplier;
  }

  const answer = denominator / numerator;

  return Math.floor(answer * multiplier);
};

const str1 = '++';
const str2 = '--';

console.log(solution(str1, str2));
