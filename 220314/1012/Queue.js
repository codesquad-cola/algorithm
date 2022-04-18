class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value) {
    const node = new Node(value);
    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.setNext(node);
      this.tail = node;
    }
    this.length++;
  }

  dequeue() {
    if (this.head === null) return;

    this.length--;
    const delNodeValue = this.head.getValue();

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else this.head = this.head.node.next;

    return delNodeValue;
  }
}

class Node {
  constructor(value) {
    this.node = { value, next: null };
  }

  getValue() {
    return this.node.value;
  }

  setNext(node) {
    this.node.next = node;
  }
}
