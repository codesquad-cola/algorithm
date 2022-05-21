/* 체육복 */

const solution = (n, lost, reserve) => {
  lost.sort();
  reserve.sort();
  const lostSet = new Set(lost);
  const reserveSet = new Set(reserve);
  const cntSet = new Set();

  for (const sid of lostSet) {
    if (reserveSet.has(sid)) {
      lostSet.delete(sid);
      reserveSet.delete(sid);
    }
  }

  for (const sid of reserveSet) {
    if (lostSet.has(sid - 1) && !cntSet.has(sid - 1)) {
      cntSet.add(sid - 1);
      continue;
    }

    if (lostSet.has(sid + 1) && !cntSet.has(sid + 1)) {
      cntSet.add(sid + 1);
      continue;
    }
  }

  return n - lostSet.size + cntSet.size;
};

const n = 5;
const lost = [2, 4];
const reserve = [1, 3, 5];
console.log(solution(n, lost, reserve));
