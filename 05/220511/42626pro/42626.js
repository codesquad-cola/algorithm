class Heap {
  constructor(compareFunc) {
    this.heap = [-1];
    this.compareFunc = compareFunc;
  }

  getParentIndex(index) {
    if (index === 1) return null;
    return Math.floor(index / 2);
  }

  getLeftIndex(index) {
    return index * 2;
  }

  getRightIndex(index) {
    return index * 2 + 1;
  }

  getParent(index) {
    const parentValue = this.heap[this.getParentIndex(index)];
    return parentValue;
  }

  insert(value) {
    const insertIndex = this.heap.length;
    let childIndex = insertIndex;
    let parent;
    while (childIndex !== 1) {
      parent = this.getParent(childIndex);

      const compareFuncValue = this.compareFunc(parent, value);

      if (compareFuncValue <= 0) {
        break;
      } else {
        this.heap[childIndex] = parent;
        childIndex = this.getParentIndex(childIndex);
      }
    }
    this.heap[childIndex] = value;
  }

  pop() {
    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    const deletedValue = this.peek();
    const heapifyValue = this.heap.pop();
    const lastIndex = this.heap.length - 1;
    let curIndex = 1;
    let nextIndex;

    while (curIndex !== lastIndex) {
      let leftIndex = this.getLeftIndex(curIndex);
      let rightIndex = this.getRightIndex(curIndex);

      if (leftIndex > lastIndex) {
        break;
      }

      if (rightIndex > lastIndex) {
        nextIndex = leftIndex;
      } else {
        const compareFuncValue = this.compareFunc(
          this.heap[leftIndex],
          this.heap[rightIndex]
        );
        if (compareFuncValue <= 0) {
          nextIndex = leftIndex;
        } else {
          nextIndex = rightIndex;
        }
      }

      const nextIndexValue = this.heap[nextIndex];
      const compareResult = this.compareFunc(heapifyValue, nextIndexValue);
      if (compareResult <= 0) {
        break;
      }
      this.heap[curIndex] = nextIndexValue;
      curIndex = nextIndex;
    }

    this.heap[curIndex] = heapifyValue;
    return deletedValue;
  }

  remove(value) {
    const deleteValueIndex = this.heap.indexOf(value);
    if (deleteValueIndex === -1) {
      return;
    }

    if (deleteValueIndex === this.heap.length - 1) {
      this.heap.pop();
      return;
    }

    const heapifyValue = this.heap.pop();
    const lastIndex = this.heap.length - 1;
    const parentIndex = this.getParentIndex(deleteValueIndex);

    let compareFuncValue = this.compareFunc(
      this.heap[parentIndex],
      heapifyValue
    );
    if (compareFuncValue <= 0) {
      // down
      let curIndex = deleteValueIndex;
      let nextIndex;
      let leftIndex;
      let rightIndex;

      while (curIndex !== lastIndex) {
        leftIndex = this.getLeftIndex(curIndex);
        rightIndex = this.getRightIndex(curIndex);

        if (leftIndex > lastIndex) {
          break;
        }

        if (rightIndex > lastIndex) {
          nextIndex = leftIndex;
        } else {
          const compareFuncValue = this.compareFunc(
            this.heap[leftIndex],
            this.heap[rightIndex]
          );
          if (compareFuncValue <= 0) {
            nextIndex = leftIndex;
          } else {
            nextIndex = rightIndex;
          }
        }
        const nextIndexValue = this.heap[nextIndex];
        const compareResult = this.compareFunc(heapifyValue, nextIndexValue);
        if (compareResult <= 0) {
          break;
        }
        this.heap[curIndex] = nextIndexValue;
        curIndex = nextIndex;
      }
      this.heap[curIndex] = heapifyValue;
    } else {
      // up
      let childIndex = deleteValueIndex;
      let parent;

      while (childIndex !== 1) {
        parent = this.getParent(childIndex);

        const compareFuncValue = this.compareFunc(parent, heapifyValue);

        if (compareFuncValue <= 0) {
          break;
        } else {
          this.heap[childIndex] = parent;
          childIndex = this.getParentIndex(childIndex);
        }
      }
      this.heap[childIndex] = heapifyValue;
    }
  }

  peek() {
    return this.heap[1];
  }
}

function solution(scoville, K) {
  const minHeap = new Heap((a, b) => a - b);
  for (const s of scoville) {
    minHeap.insert(s);
  }

  let cnt = 0;
  for (let i = 0; i < scoville.length; i++) {
    if (minHeap.peek() >= K) {
      return cnt;
    }
    if (i === scoville.length - 1) {
      break;
    }
    const min1 = minHeap.pop();
    const min2 = minHeap.pop();
    const newScoville = min1 + 2 * min2;
    minHeap.insert(newScoville);
    cnt++;
  }
  return -1;
}

console.log(solution([1, 2, 3, 9, 10, 12], 7));
