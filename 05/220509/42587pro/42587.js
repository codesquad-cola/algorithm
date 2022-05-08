/* 프린터 */

const solution = (priorities, location) => {
  var answer = 0;
  const prioritiesMap = {};
  priorities.forEach((v) => {
    if (prioritiesMap.hasOwnProperty(v)) {
      prioritiesMap[v] += 1;
    } else {
      prioritiesMap[v] = 1;
    }
  });

  // 남은 문서중 우선순위 높은게 있는지 확인
  // 인자로 전달한 우선순위보다 높은 우선순위가 있다면 false, 없다면 true
  const checkOtherPriorities = (priority) => {
    for (const otherPriority of Object.keys(prioritiesMap)) {
      if (priority < otherPriority) {
        return false;
      }
    }
    return true;
  };

  // 문서를 인쇄하고 우선순위맵 갱신, answer 갱신
  const print = () => {
    const document = priorities.shift();

    if (document) {
      if (prioritiesMap[document] === 1) {
        delete prioritiesMap[document];
      } else {
        prioritiesMap[document] -= 1;
      }
      answer += 1;
    }
  };

  const peek = () => {
    return priorities[0];
  };

  const setLocationOfMyDocument = () => {
    if (location === 0) {
      location = priorities.length - 1;
    } else {
      location -= 1;
    }
  };

  const postpone = () => {
    const priority = priorities.shift();
    priorities.push(priority);
  };

  // 1. 이번 턴의 문서 확인
  // 2. 우선순위 맵 확인 (더 높은 우선순위 있는지)
  // 2-1. 있다면 큐의 맨 뒤로 (postpone)
  // 2-2. 없다면 인쇄 후 맵과 answer 갱신(print). 만약 내 문서가 print 대상인 경우엔 break후 answer + 1 리턴.
  // 3. 내 문서 location 업데이트
  while (true) {
    const target = peek();
    if (checkOtherPriorities(target)) {
      if (location === 0) {
        break;
      }
      print();
    } else {
      postpone();
    }
    setLocationOfMyDocument();
  }

  return answer + 1;
};

const priorities = [2, 1, 3, 2];
const location = 2;
console.log(solution(priorities, location));
