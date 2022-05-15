function solution(jobs) {
  jobs.sort(
    ([requestedTimeA], [requestedTimeB]) => requestedTimeA - requestedTimeB
  );
  let ms = 0;
  let isRunning = false;
  let endTime = 0;
  const run = [];
  const ready = [];
  const jobLength = jobs.length;

  // ms: 현재 시간
  // jobs: 모든 작업의 배열 (요청시간, 요구시간)
  // ready: jobs의 요소중 요청시간 <= ms 인 경우
  // run: 실행순서 배열
  // (요청시간, 종료시간) = (요청시간, 시작시간 + 요구시간 = 종료시간)
  // ms를 종료시간으로 업데이트 -> jobs의 앞부분부터 돌면서 요청시간이 ms이하인 경우의 태스크를 전부 ready로 이동 -> ready정렬 -> ready의 첫번째 원소를 run으로

  // 종료조건 run배열이 jobs의 원래 길이와 같아진 경우.
  while (jobLength !== run.length) {
    while (jobs.length) {
      const [requestedTime] = jobs[0];
      if (requestedTime <= ms) {
        ready.push(jobs.shift());
      } else {
        break;
      }
    }

    if (endTime === ms) {
      isRunning = false;
    }

    if (!isRunning && ready.length) {
      ready.sort(([, requiredTimeA], [, requiredTimeB]) => {
        return requiredTimeA - requiredTimeB;
      });

      const [requestedTime, requiredTime] = ready.shift();
      endTime = ms + requiredTime;
      run.push([requestedTime, endTime]); // [요청시간, 끝나는시간]
      isRunning = true;
      ms = endTime;
      continue;
    }
    ++ms;
  }

  const result = run.reduce((acc, [requestedTime, endTime]) => {
    return acc + (endTime - requestedTime);
  }, 0);

  return Math.floor(result / jobLength);
}

const jobs = [
  [1, 3],
  [1, 2],
  [0, 1],
];

console.log(solution(jobs));
