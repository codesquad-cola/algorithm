/* 베스트앨범 */

const solution = (genres, plays) => {
  const answer = [];
  const table = {};

  genres.forEach((genre, sid) => {
    if (!table.hasOwnProperty(genre)) {
      table[genre] = [[-1, 0]];
    }
    table[genre][0][1] += plays[sid];
    table[genre].push([sid, plays[sid]]);
  });

  for (const arr of Object.values(table)) {
    arr.sort((p, c) => c[1] - p[1]);
  }

  const genresOrderedByPlays = [...new Set(genres)].sort((p, c) => {
    return table[c][0][1] - table[p][0][1];
  });

  const startIndex = 1;
  const endIndex = 3;
  for (const genre of genresOrderedByPlays) {
    const targets = table[genre].slice(startIndex, endIndex);
    for (const [sid, _] of targets) {
      answer.push(sid);
    }
  }

  return answer;
};

const genres = ['classic', 'pop', 'classic', 'classic', 'pop'];
const plays = [500, 600, 150, 800, 2500];

console.log(solution(genres, plays));
