/* 전화번호 목록 */

const solution = (phoneBook) => {
  phoneBook.sort();
  for (let i = 0; i < phoneBook.length - 1; i++) {
    if (phoneBook[i + 1].startsWith(phoneBook[i])) {
      return false;
    }
  }
  return true;
};

const phoneBook = ['119', '97674223', '1195524421'];

console.log(solution(phoneBook));
