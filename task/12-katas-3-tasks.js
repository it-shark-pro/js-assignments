
/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left,
 * right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ];
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
  const visited = [...Array(puzzle.length)]
    .map(() => Array(puzzle[0].length).fill(false));

  const dfs = (row, column, index, puzzle, searchStr) => {
    if (index === searchStr.length) return true;

    if (
      row < 0 ||
      column < 0 ||
      row >= puzzle.length ||
      column >= puzzle[0].length ||
      puzzle[row][column] !== searchStr[index] ||
      visited[row][column]) {
      return false;
    }

    visited[row][column] = true;

    if (
      dfs(row, column + 1, index + 1, puzzle, searchStr) ||
      dfs(row, column - 1, index + 1, puzzle, searchStr) ||
      dfs(row + 1, column, index + 1, puzzle, searchStr) ||
      dfs(row - 1, column, index + 1, puzzle, searchStr)
    ) {
      return true;
    }

    visited[row][column] = false;
  };

  for (let row = 0; row < puzzle.length; row++) {
    for (let column = 0; column < puzzle[0].length; column++) {
      if (
        puzzle[row][column] === searchStr[0] &&
        dfs(row, column, 0, puzzle, searchStr)
      ) {
        return true;
      }
    }
  }

  return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 *
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from
 *    the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
  const permutations = [];

  const permutate = (arrLength, arr) => {
    if (arrLength === 1) permutations.push(arr.join(''));
    else {
      permutate(arrLength - 1, arr);

      for (let i = 0; i < arrLength - 1; i++) {
        if (arrLength % 2 === 0) {
          [arr[i], arr[arrLength - 1]] = [arr[arrLength - 1], arr[i]];
        } else {
          [arr[0], arr[arrLength - 1]] = [arr[arrLength - 1], arr[0]];
        }

        permutate(arrLength - 1, arr);
      }
    }
  };

  permutate(chars.length, [...chars]);

  for (const permutation of permutations) {
    yield permutation;
  }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units
 * you have already bought, or do nothing.
 * Therefore, the most profit is the maximum difference of all pairs in a sequence
 * of stock prices.
 *
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
  let totalProfit = 0;

  for (let i = 0; i < quotes.length - 1; i++) {
    let maxProfit = 0;

    for (let j = i + 1; j < quotes.length; j++) {
      const currentProfit = quotes[j] - quotes[i];
      maxProfit = maxProfit > currentProfit ? maxProfit : currentProfit;
    }

    totalProfit += maxProfit;
  }

  return totalProfit;
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 *
 * @class
 *
 * @example
 *
 *   var urlShortener = new UrlShortener();
 *   var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *   var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 *
 */
function UrlShortener() {
  this.urlAllowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz' +
    "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {
  encode(url) {
    let encodedString = '';
    const length = url.length / 2;
    const base = this.urlAllowedChars.length;
    for (let i = 0; i < length; i++) {
      const currentLetter = url[i * 2];
      const nextLetter = url[i * 2 + 1];
      const currentLetterCode = this.urlAllowedChars.indexOf(currentLetter);
      const nextLetterCode = this.urlAllowedChars.indexOf(nextLetter);
      encodedString += String.fromCodePoint(
        currentLetterCode * base + (nextLetterCode < 0 ? 0 : nextLetterCode)
      );
    }
    return encodedString;
  },

  decode(code) {
    let decodedString = '';
    const length = code.length;
    const base = this.urlAllowedChars.length;
    for (let i = 0; i < length; i++) {
      const currentSymbolCode = code.codePointAt(i);
      const firstDecodedLetterCode = Math.floor(currentSymbolCode / base);
      const secondDecodedLetterCode = currentSymbolCode % base;
      const firstDecodedLetter = this.urlAllowedChars[firstDecodedLetterCode];
      const secondDecodedLetter = currentSymbolCode % base
        ? this.urlAllowedChars[secondDecodedLetterCode]
        : '';
      decodedString += firstDecodedLetter + secondDecodedLetter;
    }
    return decodedString;
  }
};

module.exports = {
  findStringInSnakingPuzzle: findStringInSnakingPuzzle,
  getPermutations: getPermutations,
  getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
  UrlShortener: UrlShortener
};
