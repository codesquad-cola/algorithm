// 1. 누적 시간 구하기.

const getDiff = (time1, time2) => {
  const [hour1, minute1] = time1.split(':').map(Number);
  const [hour2, minute2] = time2.split(':').map(Number);

  const diff = Math.abs(hour1 * 60 + minute1 - (hour2 * 60 + minute2));
  return diff;
};

const solution = (fees, records) => {
  const sequence = []; // 차량번호 순서대로 기록
  const accTimes = {}; // { 차량번호: 누적시간 } 기록
  const inOutInfo = {}; // { 차량번호: 입차시간 } 기록

  records.forEach((record) => {
    const [time, car, inOrOut] = record.split(' ');
    if (accTimes[car] === undefined) {
      // 최초로 들어오는 경우는 항상 입차
      inOutInfo[car] = time;
      accTimes[car] = 0;
      sequence.push(car);
    } else {
      if (inOutInfo[car]) {
        // 입차시간 기록이 있는 경우 출차
        accTimes[car] += getDiff(time, inOutInfo[car]);
        inOutInfo[car] = null;
      } else {
        // 입차시간 기록이 없는 경우 입차
        inOutInfo[car] = time;
      }
    }
  });

  // inOutInfo를 순회하면서, 입차시간 기록이 남아있는 경우를 확인(출차가 되지 않은 경우 - 23:59이 출차시간)
  for (const [car, time] of Object.entries(inOutInfo)) {
    if (time === null) {
      continue;
    }

    accTimes[car] += getDiff('23:59', time);
  }

  sequence.sort((a, b) => a - b);
  return sequence.map((car) => {
    const accTime = accTimes[car];
    if (accTime <= fees[0]) {
      return fees[1];
    }

    const extraTime = accTime - fees[0];
    return fees[1] + Math.ceil(extraTime / fees[2]) * fees[3];
  });
};

const fees = [180, 5000, 10, 600];
const records = [
  '05:34 5961 IN',
  '06:00 0000 IN',
  '06:34 0000 OUT',
  '07:59 5961 OUT',
  '07:59 0148 IN',
  '18:59 0000 IN',
  '19:09 0148 OUT',
  '22:59 5961 IN',
  '23:00 5961 OUT',
];
console.log(solution(fees, records));
