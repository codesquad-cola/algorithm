# 42587. 프린터

## 함수

🟩`prioritiesMap`으로 남은 문서의 우선순위와 그 개수를 매핑한 객체 생성하고 매 턴마다 검사(최대 9번 검사).  
🟩`checkOtherPriorities(priority)`: 남은 문서중에 인자로 전달된 우선순위보다 높은 우선순위가 있다면 false, 없다면 true.  
🟩`print`: 문서 인쇄 + 우선순위 맵 갱신 + answer 갱신. 만약 인쇄한 문서와 동일한 우선순위를 갖는 다른 문서가 없으면(해당 우선순위의 map 값이 1이면), 해당 우선순위 프로퍼티 삭제
🟩`setLocationOfMyDocument`: 내 문서 위치 업데이트  

## 풀이

1. 이번 턴의 문서 확인  
2. 우선순위 맵 확인 (더 높은 우선순위 있는지)  
2-1. 있다면 큐의 맨 뒤로 (`postpone`)  
2-2. 없다면 인쇄 후 맵과 `answer` 갱신(`print`). 만약 내 문서가 `print` 대상인 경우엔 `break`후 `answer + 1` 리턴.  
3. `location` 업데이트
 