import heapq

def solution(scoville, K):
    answer = 0
    heap = []
    for s in scoville:
        heapq.heappush(heap, s)

    for i in range(len(scoville)):
        if heap[0] >= K:
            return answer
        if i == len(scoville) - 1:
            break
        min1 = heapq.heappop(heap)
        min2 = heapq.heappop(heap)
        newScoville = min1 + 2 * min2
        heapq.heappush(heap, newScoville)
        answer = answer + 1

    return -1

print(solution([1, 2, 3, 9, 10, 12], 999))