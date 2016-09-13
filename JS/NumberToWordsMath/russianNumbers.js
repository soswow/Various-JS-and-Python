const map = {
  0: 'ноль',
  1: 'один',
  2: 'два',
  3: 'три',
  4: 'четыре',
  5: 'пять',
  6: 'шесть',
  7: 'семь',
  8: 'восемь',
  9: 'девять',
  10: 'десять',
  11: 'одиннадцать',
  12: 'двенадцать',
  13: 'тринадцать',
  14: 'четырнадцать',
  15: 'пятнадцать',
  16: 'шестнадцать',
  17: 'семнадцать',
  18: 'восемнадцать',
  19: 'девятнадцать',
  20: 'двадцать',
  30: 'тридцать',
  40: 'сорок',
  50: 'пятьдесят',
  60: 'шестьдесят',
  70: 'семьдесят',
  80: 'восемьдесят',
  90: 'девяносто',
  100: 'сто',
  200: 'двести',
  300: 'триста',
  400: 'четыреста',
  500: 'пятьсот',
  600: 'шестьсот',
  700: 'семьсот',
  800: 'восемьсот',
  900: 'девятьсот',
        //[1, 2-4, 5-...]
  1000: ['тысяча', 'тысячи', 'тысяч'],
  1000000: ['миллион', 'миллиона', 'миллионов'],
  1000000000: ['миллиард', 'миллиарда', 'миллиардов']
};

const alternativeNames = {
  1: [null, 'одна', 'один', 'один', 'один', 'один'],
  2: [null, 'две', 'два', 'два', 'два', 'два']
};

const getWordIndexForNumber = (number) => {
  const numberStr = number+"";
  const lastDigit = +numberStr.charAt(numberStr.length-1);
  if (lastDigit == 1 && number !== 11) {
    return 0;
  } else if (lastDigit > 1 && lastDigit <= 4 && (number < 10 || number > 20)){
    return 1;
  } else {
    return 2;
  }
}

const numberToWords = (number, special) => {
  if (number <= 20) {
    if (special && (number === 1 || number === 2)) {
      return alternativeNames[number][special];
    }
    return map[number];
  }
  if (number < 100) {
    const tensPart = Math.floor(number / 10) * 10;
    const rest = number - tensPart;
    if (rest > 0) {
      return `${map[tensPart]} ${numberToWords(rest, special)}`;
    } else {
      return map[tensPart];
    }
  }
  if (number < 1000) {
    const hundredsPart = Math.floor(number / 100) * 100;
    const rest = number - hundredsPart;
    if (rest > 0) {
      return `${map[hundredsPart]} ${numberToWords(rest, special)}`;
    } else {
      return map[hundredsPart];
    }
  }
  for (let i=1; i<=3; i++) {
    const part = Math.pow(1000, i);
    if (number < part * 1000) {
      const numberOfParts = Math.floor(number / part);
      const rest = number - numberOfParts * part;
      const partWord = map[part][getWordIndexForNumber(numberOfParts)];
      let inWords = numberToWords(numberOfParts, i);
      let result = `${inWords} ${partWord} `;
      if (rest > 0) {
        result += `${numberToWords(rest)}`;
      }
      return result;
    }
  }
};

// let longestWord = "";
// let longestLen = 0;
// for(let i=0; i<1000000000; i++){
//   const word = numberToWords(i);
//   if(longestLen < word.length){
//     longestLen = word.length;
//     longestWord = word;
//     console.log(i, word, word.length);
//   }
// }
// console.log(longestWord);

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
//
//   valueOf() {
//     return this.value;
//   }
//
//   toString() {
//     return `Node{value=${this.value}}`;
//   }
// }

// const limit = 10000000;
//
// const nodes = [];
// for (let i=0; i<limit; i++) {
//   nodes.push(new Node(i));
// }
//
// for (let i=0; i<limit; i++) {
//   const node = nodes[i];
//   const words = numberToWords(i);
//   const len = words.length;
//   node.next = nodes[len];
// }

// for (let i=0; i<=10; i++) {
//   console.log(nodes[i]);
// }
// old chain
// const getChain = (number) => {
//   let out = "";
//   let node = nodes[number];
//   while(true){
//     out += `${node.value} (${numberToWords(node.value)}) -> `;
//     if(node.value === 4 || node.value === 3 || node.value === 11){
//       break;
//     }
//     node = node.next
//   }
//   return out;
// }

const getChain = (number, chain) => {
  if (!chain) {
    chain = [];
  }
  const words = numberToWords(number);
  chain.push(number);
  if (number === 4 || number === 3 || number === 11) {
  } else {
    getChain(words.length, chain);
  }
  return chain;
}

let i = 0;
// let maxLen = 0;
// const uniqueChains = [
//   [4, 4].join(' -> '),
//   [3, 3].join(' -> '),
//   [11, 11].join(' -> '),
//   [6, 5, 4].join(' -> ')
// ];
const uniqueChains = [];

while(true) {
  // console.log('----------', i, '---------');
  let chain = getChain(i);

  if (chain.length == 1) {
    const str = [chain[0], chain[0]].join(' -> ');
    uniqueChains.push(str);
    console.log(str+';');
    i+=1;
    continue;
  }

  for(let j=0; j<chain.length; j++){
    for(let k=chain.length; k>j; k--){
      const str = chain.slice(j, k).join(' -> ');
      // console.log('str', str);
      if (uniqueChains.indexOf(str) > -1) {
        if (j == 1) {
          j += 1;
        }
        // console.log('parent is in there already', str, chain.slice(0, j));
        chain = chain.slice(0, j);
        break;
      }
    }
  }

  if (chain.length > 1) {
    const subChain = chain.join(' -> ');
    if (uniqueChains.indexOf(subChain) === -1) {
      if(chain[0] < 20){
        uniqueChains.push(subChain);
        console.log(subChain+';');
      }
    }
  }

  i += 1;
  if(i > 100){
    break;
  }
}

// for(let i=0; i<limit; i++){
//   const chain = getChain(i);
//   const chainLen = chain.split(" -> ").length;
//   if(chainLen > 9) {
//     console.log(`${i} - ${chainLen}`);
//   }
// }

// console.log(getChain(144484484));
