/**
 * Takes two strings including only letters from a to z.
 * Returns a new sorted string containing distinct letters.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'azy', 'bk' => 'abkyz'
 *   'zxxlal','laxk'    => 'aklxz'
 *   'abcdefghijklmnop',  'lmnopqrstuvwxyz'  => 'abcdefghijklmnopqrstuvwxyz'
 */
function distinctLettersString(value1, value2) {
  let result = value1 + value2;
  result = result.split('').sort();

  result = [...new Set(result)];

  return result.join('');
}


/**
 * Takes a string with any characters.
 * Returns an object containing appearence of every distinct letters in lower case.
 *
 * @param {string} value
 * @return {Object}
 *
 * @example
 *  'Who you are, Buddy?' => { a:1, d:2, e:1, h:1, o:2, r:1, u:2, y:2 }
 *
 */

function lowerLetters(value) {
  const result = value
    .split('')
    .filter(letter => letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122)
    .reduce((res, cur) => {
      res[cur] = res[cur] || value.match(RegExp(`${cur}`, 'g')).length;
      return res;
    }, {});

  return result;
}

/**
 * Write a function that will convert a string into title case, given an optional
 * list of exception (minor words). The list of minor words will be given as a
 * string with each word separated by a space. Your function should ignore the
 * case of the minor words string - it should behave in the same way even if the
 * case of the minor word is changed
 *
 * @param {string} the original string to be converted
 * @param {string} list of minor words that must always be lowercase except for
 *                  the first word in the string
 * @return {string}
 *
 * @example
 *    'a clash if KINGS', 'a an the of'  =>  'A Clash of Kings'
 *    'THE WIND IN THE WILLOWS', 'The In'  => 'The Wind in the Willows'
 *    'the quick brown fox'  => 'The Quick Brown Fox'
 */

function titleCaseConvert(title, minorWords) {
  minorWords = minorWords !== undefined
    ? minorWords.toLowerCase()
    : '';
  title = title
    .split(' ')
    .map(word => word.toLowerCase())
    .map((word, index) => {
      if (index === 0 || !minorWords.includes(word)) {
        return word.split('')[0].toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });

  return title.join(' ');
}

/**
 * Your job is to create a calculator which evaluates expressions in Reverse Polish
 * notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation). Empty expression
 * should evaluate to 0. Expression without operation returns the last number.
 *
 * @param {string} RPN string, each number and operation separated by a space
 *
 * @return {Number}
 *
 * @example
 *  ''  =>  0  // empty expression returns 0
 *  '1 2 3'  =>  3  // expression without operation returns the last number
 *  '4 2 +'  =>  6  // 4 + 2
 *  '2 5 * 2 + 3 /'  =>  4   //  ((5 * 2) + 2) / 3
 *  '5 1 2 + 4 * + 3 -'  =>  14   // 5 + ((1 + 2) * 4) -3
 */

function calcRPN(expr) {
  if (expr === '') return 0;

  const operatorCheck = expr.split(' ').filter(num => !Number(num));
  if (operatorCheck.length === 0) return Number(expr.slice(-1));

  const calc = (operand1, operand2, operator) => {
    switch (operator) {
    case '+':
      return operand2 + operand1;
    case '-':
      return operand2 - operand1;
    case '*':
      return operand2 * operand1;
    case '/':
      return operand2 / operand1;
    }
  };

  const result = expr.split(' ')
    .reduce((res, cur) => {
      res.push(Number(cur) ? Number(cur) : calc(res.pop(), res.pop(), cur));
      return res;
    }, []);

  return result[0];
}

module.exports = {
  distinctLettersString,
  lowerLetters,
  titleCaseConvert,
  calcRPN
};
