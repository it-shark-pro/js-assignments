const assert = require('assert');
const {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands
} = require('../task/03-date-tasks');

it.optional = require('../extensions/it-optional');

describe('03-date-tasks', () => {
  it.optional('parseDataFromRfc2822 should parse rfc2822 string into a date value', () => {
    assert.equal(
      parseDataFromRfc2822('December 17, 1995 03:24:00').valueOf(),
      new Date(1995, 11, 17, 3, 24, 0).valueOf()
    );

    assert.equal(
      parseDataFromRfc2822('Tue, 26 Jan 2016 13:48:02 GMT').valueOf(),
      1453816082000
    );

    assert.equal(
      parseDataFromRfc2822('Sun, 17 May 1998 03:00:00 GMT+0100').valueOf(),
      895370400000
    );

    assert.linesOfCode(parseDataFromRfc2822, 1);
  });


  it.optional('parseDataFromIso8601 should parse ISO 8601 string into a date value', () => {
    assert.equal(
      parseDataFromIso8601('2016-01-19T16:07:37+00:00').valueOf(),
      1453219657000
    );

    assert.equal(
      parseDataFromIso8601('2016-01-19T08:07:37Z').valueOf(),
      1453190857000
    );

    assert.linesOfCode(parseDataFromIso8601, 1);
  });


  it.optional('isLeapYear should true if specified year is leap', () => {
    [
      new Date(2000, 1, 1),
      new Date(2012, 1, 1)
    ].forEach(date => {
      assert(
        isLeapYear(date) === true,
        `${date} is a leap year`
      );
    });

    [
      new Date(1900, 1, 1),
      new Date(2001, 1, 1)
    ].forEach(date => {
      assert(
        isLeapYear(date) === false,
        `${date} is not a leap year`
      );
    });

    assert.linesOfCode(isLeapYear, 4);
  });


  it.optional('timeSpanToString should return the string represation of time span between two dates', () => {
    [
      {
        startDate: new Date(2000, 1, 1, 10, 0, 0),
        endDate: new Date(2000, 1, 1, 11, 0, 0),
        expected: '01:00:00.000'
      }, {
        startDate: new Date(2000, 1, 1, 10, 0, 0),
        endDate: new Date(2000, 1, 1, 10, 30, 0),
        expected: '00:30:00.000'
      }, {
        startDate: new Date(2000, 1, 1, 10, 0, 0),
        endDate: new Date(2000, 1, 1, 10, 0, 20),
        expected: '00:00:20.000'
      }, {
        startDate: new Date(2000, 1, 1, 10, 0, 0),
        endDate: new Date(2000, 1, 1, 10, 0, 0, 250),
        expected: '00:00:00.250'
      }, {
        startDate: new Date(2000, 1, 1, 10, 0, 0),
        endDate: new Date(2000, 1, 1, 15, 20, 10, 453),
        expected: '05:20:10.453'
      }
    ].forEach(data => {
      assert.equal(
        timeSpanToString(data.startDate, data.endDate),
        data.expected
      );
    });

    assert.linesOfCode(timeSpanToString, 2);
  });


  it.optional('angleBetweenClockHands should returns the angle bettween clock hands for specified Greenwich datetime', () => {
    [
      {
        date: Date.UTC(2016, 3, 5, 0, 0),
        expected: 0
      }, {
        date: Date.UTC(2016, 3, 5, 3, 0),
        expected: Math.PI / 2
      }, {
        date: Date.UTC(2016, 3, 5, 15, 0),
        expected: Math.PI / 2
      }, {
        date: Date.UTC(2016, 3, 5, 6, 0),
        expected: Math.PI
      }, {
        date: Date.UTC(2016, 3, 5, 18, 0),
        expected: Math.PI
      }, {
        date: Date.UTC(2016, 3, 5, 9, 0),
        expected: Math.PI / 2
      }, {
        date: Date.UTC(2016, 3, 5, 21, 0),
        expected: Math.PI / 2
      }, {
        date: Date.UTC(2016, 3, 5, 14, 20),
        expected: 0.8726646259971648
      }, {
        date: Date.UTC(2016, 3, 5, 23, 55),
        expected: 0.4799655442984406
      }
    ].forEach(data => {
      assert.equal(
        angleBetweenClockHands(new Date(data.date)),
        data.expected,
        `Incorrect result for angleBetweenClockHands(${new Date(data.date).toUTCString()}):`
      );
    });

    assert.linesOfCode(angleBetweenClockHands, 9, 2);
  });
});
