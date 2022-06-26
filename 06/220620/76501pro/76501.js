function solution(absolutes, signs) {
  let answer = 0;

  signs.forEach((bool, index) => {
    if (bool) {
      answer += absolutes[index];
    } else {
      answer += -absolutes[index];
    }
  });

  return answer;
}
