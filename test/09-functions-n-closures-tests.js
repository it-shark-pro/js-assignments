const assert = require('assert');
const {
  getComposition,
  getPowerFunction,
  getPolynom,
  memoize,
  retry,
  logger,
  partialUsingArguments,
  getIdGeneratorFunction
} = require('../task/09-functions-n-closures-tasks');

it.optional = require('../extensions/it-optional');

describe('09-functions-n-closures-tasks', () => {
  it.optional('getComposition should return the composition of two functions', () => {
    [
      {
        f: Math.sin, g: Math.asin, arg: 0, result: 0
      },
      {
        f: x => x + 1, g: x => x + 1, arg: 1, result: 3
      },
      {
        f: x => x * x, g: x => x + 2, arg: 5, result: 49
      }
    ].forEach(data => {
      const actual = getComposition(data.f, data.g);
      assert(actual(data.arg) === data.result);
    });

    assert.linesOfCode(getComposition, 1);
  });


  it.optional('getPowerFunction should return the math power function using the specified exponent', () => {
    const power2 = getPowerFunction(2);
    for (let i = 0; i < 10; i++) {
      assert.equal(power2(i), Math.pow(i, 2));
    }

    const power05 = getPowerFunction(0.5);
    for (let i = 0; i < 10; i++) {
      assert.equal(power05(i), Math.pow(i, 0.5));
    }

    assert.linesOfCode(getPowerFunction, 1);
  });


  it.optional('getPolynom should return the polynom with specified coefficients', () => {
    [
      {
        polynom: getPolynom(2, 3, 5),
        results: [{ x: 0, y: 5 }, { x: 2, y: 19 }, { x: 3, y: 32 }]
      }, {
        polynom: getPolynom(1, -3),
        results: [{ x: 0, y: -3 }, { x: 2, y: -1 }, { x: 5, y: 2 }]
      }, {
        polynom: getPolynom(8),
        results: [{ x: 0, y: 8 }, { x: 2, y: 8 }, { x: 5, y: 8 }]
      }
    ].forEach(data => {
      data.results.forEach(test => {
        assert(test.y === data.polynom(test.x));
      });
    });

    assert.linesOfCode(getPolynom, 8, 3);
  });


  it.optional('memoize method should cache the result of function', () => {
    let numberOfCalls = 0;
    const fn = function () {
      numberOfCalls++;
      return Math.random();
    };
    const memoizer = memoize(fn);
    const expected = memoizer();
    assert.equal(numberOfCalls, 1, 'memoize result should evaluate the specified function at first call');
    for (let i = 0; i < 10; i++) {
      const actual = memoizer();
      assert.equal(actual, expected, 'memoize result should return the cached value at second and next calls');
      assert.equal(numberOfCalls, 1, 'memoize result should not evaluate the specified function at second and next calls');
    }
  });


  it.optional('retry method should try to evaluate the specified function several times', () => {
    const maxAttemps = 3;
    let attemps = 0;
    const expected = 'expected';
    const fn = function () {
      if (++attemps < maxAttemps) throw new Error();
      return expected;
    };

    const actual = retry(fn, maxAttemps)();
    assert.equal(actual, expected);

    assert.throws(
      () => {
        retry(() =>{
          throw new Error();
        }, 1)();
      },
      Error
    );

    assert.linesOfCode(retry, 10);
  });


  it.optional('logger method should log start and end of call of the standard js function', () => {
    let log = '';

    const logFunc = text => { log += `${text}\n`; };
    const cosLogger = logger(Math.cos, logFunc);

    const actual = cosLogger(Math.PI);

    assert.equal(actual, -1, 'logger function should return the original result from specified function');
    assert.equal(
      log,
      'cos(3.141592653589793) starts\n'
           + 'cos(3.141592653589793) ends\n',
      'logger function shoud log the start and end of the specified function'
    );
  });


  it.optional('logger method should log start and end of call of the specified function', () => {
    let isCalling = false;
    let log = '';

    const testLogger = (param, index) => {
      assert.equal(
        log,
        'testLogger(["expected","test",1],0) starts\n',
        'logger function shoud log the start of specified function before calling'
      );
      isCalling = true;
      return param[index];
    };

    const logFunc = text => { log += `${text}\n`; };
    const loggerFunc = logger(testLogger, logFunc);

    const actual = loggerFunc(['expected', 'test', 1], 0);

    assert.equal(isCalling, true, 'logger function should call the specified function');
    assert.equal(actual, 'expected', 'logger function should return the original result from specified function');
    assert.equal(
      log,
      'testLogger(["expected","test",1],0) starts\n'
           + 'testLogger(["expected","test",1],0) ends\n',
      'logger function shoud log the end of specified function after calling'
    );

    assert.linesOfCode(logger, 7);
  });


  it.optional('partialUsingArguments should return the function with partial applied arguments', () => {
    const fn = (x1, x2, x3, x4) => x1 + x2 + x3 + x4;
    assert.equal(
      partialUsingArguments(fn, 'a')('b', 'c', 'd'),
      'abcd',
      "partialUsingArguments(fn, 'a')('b','c','d')' should return 'abcd'"
    );
    assert.equal(
      partialUsingArguments(fn, 'a', 'b')('c', 'd'),
      'abcd',
      "partialUsingArguments(fn, 'a','b')('c','d')' should return 'abcd'"
    );
    assert.equal(
      partialUsingArguments(fn, 'a', 'b', 'c')('d'),
      'abcd',
      "partialUsingArguments(fn, 'a','b','c')('d') should return 'abcd'"
    );
    assert.equal(
      partialUsingArguments(fn, 'a', 'b', 'c', 'd')(),
      'abcd',
      "partialUsingArguments(fn, 'a','b','c','d')()' should return 'abcd'"
    );

    assert.linesOfCode(partialUsingArguments, 1);
  });


  it.optional('getIdGeneratorFunction should return the id generator function', () => {
    const f0 = getIdGeneratorFunction(0);
    for (let i = 0; i < 1000; i++) {
      assert.equal(f0(), i);
    }

    const f10 = getIdGeneratorFunction(10);
    const f20 = getIdGeneratorFunction(20);
    for (let i = 0; i < 1000; i++) {
      assert.equal(f10(), 10 + i);
      assert.equal(f20(), 20 + i);
    }

    assert.linesOfCode(getIdGeneratorFunction, 1);
  });
});
