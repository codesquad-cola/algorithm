const double = (num) => {
  return Math.pow(num, 2);
};

const triple = (num) => {
  return Math.pow(num, 3);
};

const solution = (dartResult) => {
  const regex = /[0-9]{1,2}/g;
  const bonusAndOptions = dartResult.split(regex);
  const match = dartResult.matchAll(regex);

  let nums = [];
  for (let i = 0; i < 3; i++) {
    nums.push(match.next().value[0]);
  }
  nums = nums.map(Number);

  for (let i = 1; i <= 3; i++) {
    const [bonus, option] = bonusAndOptions[i].split('');

    if (bonus === 'D') {
      nums[i - 1] = double(nums[i - 1]);
    } else if (bonus === 'T') {
      nums[i - 1] = triple(nums[i - 1]);
    }

    if (!option) {
      continue;
    }

    if (option === '*') {
      nums[i - 1] *= 2;
      if (i > 1) {
        nums[i - 2] *= 2;
      }
    } else {
      nums[i - 1] *= -1;
    }
  }

  return nums.reduce((acc, cur) => acc + cur, 0);
};

const dartResult = '1S*2T*3S';
console.log(solution(dartResult));

// *는 이번 턴, 이전 턴의 점수를 2배로 (#가 섞여있다면 -2배)
// *는 중첩될 수 있음.
// #는 이번 턴의 점수를 -1배
// 점수는 1 ~ 10
// 보너스는 S, D, T
// 옵션은 *, #
