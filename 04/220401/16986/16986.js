/* 인싸들의 가위바위보 */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, `${__dirname.split('\\').pop()}.txt`);

const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, K] = input[0].split(' ').map(Number);
const table = [null]; // table[i][j] i패 vs j패의 결과. 2승리 1비김 0짐
for (let i = 1; i < N + 1; i++) {
  table[i] = [null].concat(input[i].split(' ').map(Number));
}
// table[1][1] ~ table[N][N]이 유효함.

const B = input[N + 1].split(' ').map(Number);
const C = input[N + 2].split(' ').map(Number);
const myCards = Array.from({ length: N }, (_, idx) => idx + 1);
let possible = false;

const match = (p1, p2, p1Card, p2Card) => {
  // player: 0(나), 1(친구1), 2(친구2)
  const result = table[p1Card][p2Card];

  if (result === 2) return p1; // p1승
  return p2;
};

const go = (
  p1,
  p2,
  myCards,
  bCardIdx,
  cCardIdx,
  myWinCnt,
  bWinCnt,
  cWinCnt
) => {
  if (possible) return;
  if (myWinCnt === K) {
    possible = true;
    return;
  }

  let prevWinner;
  if (p1 !== 0) {
    // 만약 B vs C를 먼저 해야한다면
    prevWinner = match(1, 2, B[bCardIdx++], C[cCardIdx++]);
    if (prevWinner === 1) bWinCnt++;
    else cWinCnt++;
  }

  if (myCards.length + myWinCnt < K || bWinCnt >= K || cWinCnt >= K) {
    return;
  }

  for (let i = 0; i < myCards.length; i++) {
    const curOpponent = prevWinner ?? p2;
    const curMyCard = myCards[i];
    const nextMyCards = myCards.filter((card) => card !== curMyCard);

    if (curOpponent === 1) {
      const winner = match(0, 1, curMyCard, B[bCardIdx]);
      if (winner === 0)
        go(
          0,
          2,
          nextMyCards,
          bCardIdx + 1,
          cCardIdx,
          myWinCnt + 1,
          bWinCnt,
          cWinCnt
        );
      else
        go(
          1,
          2,
          nextMyCards,
          bCardIdx + 1,
          cCardIdx,
          myWinCnt,
          bWinCnt + 1,
          cWinCnt
        );
    } else {
      const winner = match(0, 2, curMyCard, C[cCardIdx]);
      if (winner === 0)
        go(
          0,
          1,
          nextMyCards,
          bCardIdx,
          cCardIdx + 1,
          myWinCnt + 1,
          bWinCnt,
          cWinCnt
        );
      else
        go(
          1,
          2,
          nextMyCards,
          bCardIdx,
          cCardIdx + 1,
          myWinCnt,
          bWinCnt,
          cWinCnt + 1
        );
    }
  }
};

const solution = () => {
  if (N < K) return 0;

  go(0, 1, myCards, 0, 0, 0, 0, 0);
  if (possible) return 1;
  return 0;
};
console.log(solution());
