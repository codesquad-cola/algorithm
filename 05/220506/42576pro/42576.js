/* 완주하지 못한 선수 */

const solution = (participant, completion) => {
  var answer = '';

  const table = {};
  participant.forEach((player) => {
    if (table.hasOwnProperty(player)) {
      table[player] += 1;
      return;
    }
    table[player] = 1;
  });

  completion.forEach((player) => {
    table[player] -= 1;
  });

  for (const player of Object.keys(table)) {
    if (table[player] !== 0) {
      answer = player;
      break;
    }
  }

  return answer;
};

const participant = ['mislav', 'stanko', 'mislav', 'ana'];
const completion = ['stanko', 'ana', 'mislav'];
console.log(solution(participant, completion));
