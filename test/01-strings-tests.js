import assert from 'assert';
import {
  concatenateStrings,
  getStringLength,
  getStringFromTemplate,
  extractNameFromTemplate,
  getFirstChar,
  removeLeadingAndTrailingWhitespaces,
  repeatString,
  removeFirstOccurrences,
  unbracketTag,
  convertToUpperCase,
  extractEmails,
  getRectangleString,
  encodeToRot13,
  isString,
  getCardId
} from '../task/01-strings-tasks';

it.optional = require('../extensions/it-optional');

describe('01-strings-tasks', () => {
  it.optional('concatenateStrings should return concatenation of two strings', () => {
    assert.equal('aabb', concatenateStrings('aa', 'bb'));
    assert.equal('aa', concatenateStrings('aa', ''));
    assert.equal('bb', concatenateStrings('', 'bb'));
  });

  it.optional('getStringLength should return the length of string', () => {
    assert.equal(5, getStringLength('aaaaa'), "'aaaaa' length should be 5");
    assert.equal(0, getStringLength(''), "'' length should be 0");
  });

  it.optional('getStringFromTemplate should create a string from template using given parameters', () => {
    assert.equal('Hello, John Doe!', getStringFromTemplate('John', 'Doe'));
    assert.equal('Hello, Chuck Norris!', getStringFromTemplate('Chuck', 'Norris'));
  });

  it.optional('getFirstChar should return the first char from given string', () => {
    assert.equal('J', getFirstChar('John Doe'));
    assert.equal('c', getFirstChar('cat'));
  });

  it.optional('extractNameFromTemplate should parse the name from given string', () => {
    assert.equal('John Doe', extractNameFromTemplate('Hello, John Doe!'));
    assert.equal('Chuck Norris', extractNameFromTemplate('Hello, Chuck Norris!'));
  });

  it.optional('removeLeadingAndTrailingWhitespaces should remove leading and trailing whitespaces from the string', () => {
    assert.equal('Abracadabra', removeLeadingAndTrailingWhitespaces('  Abracadabra'));
    assert.equal('cat', removeLeadingAndTrailingWhitespaces('cat'));
    assert.equal('Hello, World!', removeLeadingAndTrailingWhitespaces('\tHello, World! '));
  });

  it.optional('repeatString should repeat string specified number of times', () => {
    assert.equal('AAAAA', repeatString('A', 5));
    assert.equal('catcatcat', repeatString('cat', 3));
  });

  it.optional('removeFirstOccurrences should remove all specified values from a string', () => {
    assert.equal('To be or to be', removeFirstOccurrences('To be or not to be', ' not'));
    assert.equal('I like legs', removeFirstOccurrences('I like legends', 'end'));
    assert.equal('ABAB', removeFirstOccurrences('ABABAB', 'BA'));
  });

  it.optional('unbracketTag should remove first and last angle brackets from tag string', () => {
    assert.equal('div', unbracketTag('<div>'));
    assert.equal('span', unbracketTag('<span>'));
    assert.equal('a', unbracketTag('<a>'));
  });

  it.optional('convertToUpperCase should convert all chars from specified string into upper case', () => {
    assert.equal('THUNDERSTRUCK', convertToUpperCase('Thunderstruck'));
    assert.equal('ABCDEFGHIJKLMNOPQRSTUVWXYZ', convertToUpperCase('abcdefghijklmnopqrstuvwxyz'));
  });

  it.optional('extractEmails should extract emails from string list delimeted by semicolons', () => {
    assert.deepEqual(
      ['angus.young@gmail.com', 'brian.johnson@hotmail.com', 'bon.scott@yahoo.com'],
      extractEmails('angus.young@gmail.com;brian.johnson@hotmail.com;bon.scott@yahoo.com')
    );
    assert.deepEqual(
      ['info@gmail.com'],
      extractEmails('info@gmail.com')
    );
  });

  it.optional('getRectangleString should return the string reprentation of rectangle with specified size', () => {
    assert.equal(
      '┌────┐\n' +
      '│    │\n' +
      '│    │\n' +
      '└────┘\n',
      getRectangleString(6, 4)
    );
    assert.deepEqual(
      '┌┐\n' +
      '└┘\n',
      getRectangleString(2, 2)
    );
    assert.deepEqual(
      '┌──────────┐\n' +
      '│          │\n' +
      '└──────────┘\n',
      getRectangleString(12, 3)
    );
  });

  it.optional('encodeToRot13 should encode-decode string using ROT13 algorithm', () => {
    assert.equal('uryyb', encodeToRot13('hello'));
    assert.equal('Jul qvq gur puvpxra pebff gur ebnq?', encodeToRot13('Why did the chicken cross the road?'));
    assert.equal('To get to the other side!', encodeToRot13('Gb trg gb gur bgure fvqr!'));
    assert.equal(
      'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm',
      encodeToRot13('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
    );
  });

  it.optional('isString should return true if argument ia a string', () => {
    assert.equal(false, isString(), 'undefined');
    assert.equal(false, isString(null), 'null');
    assert.equal(false, isString([]), '[]');
    assert.equal(true, isString('test'), 'test');
    assert.equal(true, isString(new String('test')), "new String('test')");
  });

  it.optional('getCardId should return the index of card in the initial deck', () => {
    [
      'A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣',
      'A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦',
      'A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥',
      'A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠'
    ].forEach((val, index) => {
      assert.equal(
        index,
        getCardId(val),
        `Invalid id for card '${val}':`
      );
    });
  });
});
