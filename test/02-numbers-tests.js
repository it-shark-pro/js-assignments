import assert from 'assert';
import {
  getRectangleArea,
  getCicleCircumference,
  getAverage,
  getDistanceBetweenPoints,
  getLinearEquationRoot,
  getAngleBetweenVectors,
  getLastDigit,
  parseNumberFromString,
  getParallelipidedDiagonal,
  roundToPowerOfTen,
  isPrime,
  toNumber
} from '../task/02-numbers-tasks';

it.optional = require('../extensions/it-optional');

describe('02-numbers-tasks', () => {
  it.optional('getRectangleArea should return a square of rectangle', () => {
    assert.equal(50, getRectangleArea(5, 10));
    assert.equal(25, getRectangleArea(5, 5));
  });

  it.optional('getCicleCircumference should return a circumference of cicle', () => {
    assert.equal(31.41592653589793, getCicleCircumference(5));
    assert.equal(19.729201864543903, getCicleCircumference(3.14));
    assert.equal(0, getCicleCircumference(0));
  });

  it.optional('getAverage should return an average of two numbers', () => {
    assert.equal(5, getAverage(5, 5));
    assert.equal(5, getAverage(10, 0));
    assert.equal(0, getAverage(-3, 3));
    assert.equal(Number.MAX_VALUE - 1, getAverage(Number.MAX_VALUE - 2, Number.MAX_VALUE));
    assert.equal(Number.MAX_VALUE / 4, getAverage(Number.MAX_VALUE, -Number.MAX_VALUE / 2));
  });

  it.optional('getDistanceBetweenPoints should return a distance between points', () => {
    assert.equal(1, getDistanceBetweenPoints(0, 0, 0, 1));
    assert.equal(1, getDistanceBetweenPoints(0, 0, 1, 0));
    assert.equal(18.027756377319946, getDistanceBetweenPoints(-5, 0, 10, -10));
  });

  it.optional('getLinearEquationRoot should return a root of linear equation', () => {
    assert.equal(2, getLinearEquationRoot(5, -10));
    assert.equal(-8, getLinearEquationRoot(1, 8));
    assert.equal(0, getLinearEquationRoot(5, 0));
  });

  it.optional('getAngleBetweenVectors should return a angle (in radians) between two linear vectors', () => {
    assert.equal(Math.PI / 2, getAngleBetweenVectors(1, 0, 0, 1));
    assert.equal(Math.PI, getAngleBetweenVectors(0, 1, 0, -1));
    assert.equal(Math.PI / 2, getAngleBetweenVectors(0, -1, 1, 0));
    assert.equal(0, getAngleBetweenVectors(0, 1, 0, 1));
  });

  it.optional('getLastDigit should return a last digit of the number', () => {
    assert.equal(0, getLastDigit(100));
    assert.equal(7, getLastDigit(37));
    assert.equal(5, getLastDigit(5));
    assert.equal(0, getLastDigit(0));
  });

  it.optional('parseNumberFromString should return a number from the given string representation', () => {
    assert.equal(100, parseNumberFromString('100'));
    assert.equal(37, parseNumberFromString('37'));
    assert.equal(-525.5, parseNumberFromString('-525.5'));
  });

  it.optional('getParallelipidedDiagonal should return a diagonal length of the rectagular parallepiped', () => {
    assert.equal(Math.sqrt(3), getParallelipidedDiagonal(1, 1, 1));
    assert.equal(Math.sqrt(27), getParallelipidedDiagonal(3, 3, 3));
    // assert.equal(Math.sqrt(14), getParallelipidedDiagonal(1,2,3));
  });

  it.optional('roundToPowerOfTen should return an number rounded to specified power of 10', () => {
    assert.equal(1234, roundToPowerOfTen(1234, 0));
    assert.equal(1230, roundToPowerOfTen(1234, 1));
    assert.equal(1200, roundToPowerOfTen(1234, 2));
    assert.equal(1000, roundToPowerOfTen(1234, 3));

    assert.equal(9678, roundToPowerOfTen(9678, 0));
    assert.equal(9680, roundToPowerOfTen(9678, 1));
    assert.equal(9700, roundToPowerOfTen(9678, 2));
    assert.equal(10000, roundToPowerOfTen(9678, 3));
  });

  it.optional('isPrime should return true if specified number is prime', () => {
    assert.equal(true, isPrime(2), '2');
    assert.equal(true, isPrime(3), '3');
    assert.equal(false, isPrime(4), '4');
    assert.equal(true, isPrime(5), '5');
    assert.equal(false, isPrime(6), '6');
    assert.equal(true, isPrime(7), '7');
    assert.equal(false, isPrime(8), '8');
    assert.equal(false, isPrime(9), '9');
    assert.equal(false, isPrime(10), '10');
    assert.equal(true, isPrime(11), '11');
    assert.equal(false, isPrime(12), '12');
    assert.equal(true, isPrime(13), '13');
    assert.equal(true, isPrime(113), '113');
    assert.equal(false, isPrime(119), '119');
  });

  it.optional('toNumber should convert any value to number or return the default', () => {
    assert.equal(0, toNumber(null, 0));
    assert.equal(0, toNumber('test', 0));
    assert.equal(1, toNumber('1', 0));
    assert.equal(42, toNumber(42, 0));
    assert.equal(42, toNumber(new Number(42), 0));
    assert.equal(-1, toNumber(undefined, -1));
  });
});
