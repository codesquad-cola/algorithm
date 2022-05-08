/* 기능개발 */

const solution = (progresses, speeds) => {
  var answer = [];

  const tomorrow = () => {
    progresses.forEach((_, idx, progresses) => {
      if (progresses[idx] >= 100) {
        return;
      }
      progresses[idx] += speeds[idx];
    });
  };

  const peek = () => {
    return progresses[0];
  };

  const dequeue = () => {
    speeds.shift();
    return progresses.shift();
  };

  while (peek()) {
    tomorrow();
    let count = 0;
    while (peek() >= 100) {
      count += 1;
      dequeue();
    }
    if (count > 0) {
      answer.push(count);
    }
  }

  return answer;
};

const progresses = [1, 2, 3, 4, 5, 6];
const speeds = [61, 62, 6, 6, 36, 2];
console.log(solution(progresses, speeds));
