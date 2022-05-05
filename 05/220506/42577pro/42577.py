# 전화번호 목록 

def solution(phone_book):
    phone_book.sort()
    for prev, cur in zip(phone_book, phone_book[1:]):
        if (cur.startswith(prev)):
            return False
    return True

phone_book = ["119", "97674223", "1195524421"]
print(solution(phone_book))
