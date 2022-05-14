const solution = (operations) => {
  const heap = [];
  for (const operation of operations) {
    const [type, value] = operation.split(' ');
    const inputValue = Number(value);

    switch (type) {
      case 'I': {
        heap.push(inputValue);
        break;
      }
      case 'D': {
        if (heap.length === 0) {
          break;
        }

        heap.sort((a, b) => a - b);
        if (inputValue === -1) {
          heap.shift();
          break;
        }
        if (inputValue === 1) {
          heap.pop();
          break;
        }
      }
    }
  }

  heap.sort((a, b) => a - b);
  if (heap.length === 0) {
    return [0, 0];
  }
  return [heap[heap.length - 1], heap[0]];
};

const operations = ['I -3', 'I -3', 'I 3', 'I -20'];
console.log(solution(operations));
