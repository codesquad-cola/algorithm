/* 여행경로 */

const solution = (tickets) => {
  let answer;
  const edges = {};
  const ticketCount = {};

  // 오름차순으로 방문하기 위해 미리 목적지의 알파벳순으로 정렬
  tickets.sort((a, b) => {
    if (a[1] > b[1]) return 1;
    if (a[1] === b[1]) return 0;
    if (a[1] < b[1]) return -1;
  });

  // 인접리스트를 알파벳순으로 생성
  // 티켓개수 생성
  for (const [from, to] of tickets) {
    if (!edges.hasOwnProperty(from)) {
      edges[from] = [];
      ticketCount[from] = {};
    }
    edges[from].push(to);
    if (!ticketCount[from].hasOwnProperty(to)) {
      ticketCount[from][to] = 1;
    } else {
      ticketCount[from][to] += 1;
    }
  }

  const dfs = (city, paths) => {
    if (answer) {
      return;
    }

    if (paths.length > tickets.length) {
      answer = [...paths];
      return;
    }

    const nextCities = edges[city];
    if (!nextCities) return;
    for (const nextCity of nextCities) {
      if (ticketCount[city][nextCity] === 0) {
        continue;
      }
      ticketCount[city][nextCity] -= 1;
      paths.push(nextCity);
      dfs(nextCity, paths);
      paths.pop();
      ticketCount[city][nextCity] += 1;
    }
  };

  dfs('ICN', ['ICN']);

  return answer;
};

const tickets = [
  ['ICN', 'AAA'],
  ['ICN', 'BBB'],
  ['ICN', 'CCC'],
  ['BBB', 'CCC'],
  ['CCC', 'AAA'],
  ['AAA', 'ICN'],
  ['AAA', 'ICN'],
];

console.log(solution(tickets));
