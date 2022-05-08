# 42586. 기능개발

## 풀이
1. 하루 경과 -> progresses 업데이트
2. 맨앞의 작업이 100 넘어가면 shift()
  - 그다음 맨앞의 작업이 100 넘어가면 계속 꺼내고 개수세기
  - `progresses`에서 하나 `shift()`할 때 마다 `speeds`에서도 `shift()`하기
3. `progresses` 빈 배열 될 때 까지 반복