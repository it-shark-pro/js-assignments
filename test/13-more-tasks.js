const assert = require('assert');

const { 
  distinctLettersString, 
  lowerLetters, 
  titleCaseConvert, 
  calcRPN
} = require('../task/13-more-tasks');

it.optional = require('../extensions/it-optional');

describe('13-more-tasks', () => {
  it.optional('distinctLettersString should return a new sorted string with distinct letters', () => {
    assert.equal('abcdefklmopqwxy',
      distinctLettersString('xyaabbbccccdefww', 'xxxxyyyyabklmopq'));
    assert.equal('abcdefghilnoprstu',
      distinctLettersString('loopingisfunbutdangerous', 'lessdangerousthancoding'));
  });

  it.optional('lowerLetters should return an object of every distinct letters', () => {
    assert.deepEqual({ e: 2, n: 2, r: 1, t: 2 }, lowerLetters('Internet 42'));
    assert.deepEqual({ a: 3, d: 1, f: 2, p: 1, x: 1 }, lowerLetters('$0 af0HOE@ /xfda2 24pa'));
  });

  it.optional('titleCaseConvert should return converted into title case string', () => {
    assert.equal('A Clash of Kings', titleCaseConvert('a clash of KINGS', 'a an the of'));
    assert.equal('The Wind in the Willows', titleCaseConvert('THE WIND IN THE WILLOWS', 'The In'));
    assert.equal('The Quick Brown Fox', titleCaseConvert('the quick brown fox'));
  });

  it.optional('calcRPN should calculate Reverse Polish notation expression', () => {
    assert.equal(0, calcRPN(''));
    assert.equal(3, calcRPN('1 2 3'));
    assert.equal(6, calcRPN('4 2 +'));
    assert.equal(4, calcRPN('2 5 * 2 + 3 /'));
    assert.equal(14, calcRPN('5 1 2 + 4 * + 3 -'));
  });
});
