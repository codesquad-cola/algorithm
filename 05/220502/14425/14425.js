/* 14425. 문자열 집합 (Trie 풀이) */

const fs = require('fs');
const path = require('path');

const filePath =
  process.platform === 'linux'
    ? '/dev/stdin'
    : path.join(__dirname, 'input.txt');
const input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const strSet = [];
const quiz = [];
for (let i = 1; i < N + 1; i++) {
  strSet.push(input[i]);
}

for (let i = N + 1; i < N + M + 1; i++) {
  quiz.push(input[i]);
}

class TrieNode {
  constructor(key, isCompleteWord = false, children = {}) {
    this.key = key;
    this.isCompleteWord = isCompleteWord;
    this.children = children;
  }

  addChild(key, isCompleteWord = false) {
    if (Object.hasOwn(this.children, key)) return;
    this.children[key] = new TrieNode(key, isCompleteWord);
  }

  addWord(word) {
    const target = word.split('');

    let nextNode = this;
    target.forEach((char) => {
      nextNode.addChild(char);
      nextNode = nextNode.children[char];
    });
    nextNode.isCompleteWord = true;
  }

  hasChild(key) {
    return Object.hasOwn(this.children, key);
  }

  findWord(word) {
    const target = word.split('');

    let nextNode = this;
    const result = target.every((char) => {
      const has = nextNode.hasChild(char);
      nextNode = nextNode.children[char];
      return has;
    });
    if (result) return nextNode.isCompleteWord;
    return false;
  }
}

const Trie = new TrieNode('');

strSet.forEach((str) => {
  Trie.addWord(str);
});

const ans = quiz.filter((q) => Trie.findWord(q));
console.log(ans.length);
