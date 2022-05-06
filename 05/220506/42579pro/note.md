# 42579. 베스트앨범

## 구현
🟩`table`: 장르마다 음악번호, 재생횟수 기록. 가장 첫번째 요소는 항상 재생횟수의 총합 기록용.  
```JS
const table = {
  장르1: [[-1, 재생횟수총합], [음악번호, 재생횟수], ...],
  장르2: [[-1, 재생횟수총합], [음악번호, 재생횟수], ...],
  ...
}
```

🟩`genresOrderedByPlays`: 재생횟수총합을 기준으로 내림차순 정렬된 장르배열  

🟩`genresOrderedByPlays`를 순회하면서 `table[장르]`마다 2개 인덱스(1번~3번) 슬라이싱. 1개만 있으면 1개만 슬라이싱됨.

```JS
const startIndex = 1;
const endIndex = 3;
for (const genre of genresOrderedByPlays) {
  const targets = table[genre].slice(startIndex, endIndex);
  for (const [sid, _] of targets) {
    answer.push(sid);
  }
}
```