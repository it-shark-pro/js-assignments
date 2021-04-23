
/**
 * Returns the array of 32 compass points and heading.
 * See details here:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#32_cardinal_points
 *
 * @return {array}
 *
 * Example of return :
 *  [
 *     { abbreviation : 'N',     azimuth : 0.00 ,
 *     { abbreviation : 'NbE',   azimuth : 11.25 },
 *     { abbreviation : 'NNE',   azimuth : 22.50 },
 *       ...
 *     { abbreviation : 'NbW',   azimuth : 348.75 }
 *  ]
 */
function createCompassPoints(sides = ['N', 'E', 'S', 'W']) {
  /* use array of cardinal directions only! it is a default parameter! */
  const getIndex = (arr, ind) => ind + 1 >= arr.length ? 0 : ind + 1;

  const compassPoints32 = sides.map((item, ind) => {
    if (ind % 2 === 0) return item;
    else {
      return [
        sides[ind - 1] + 'b' + item,
        sides[ind - 1] + sides[ind - 1] + item,
        sides[ind - 1] + item + 'b' + sides[ind - 1],
        sides[ind - 1] + item,
        sides[ind - 1] + item + 'b' + item,
        item + sides[ind - 1] + item,
        item + 'b' + sides[ind - 1],
        item,
        item + 'b' + sides[getIndex(sides, ind)],
        item + sides[getIndex(sides, ind)] + item,
        sides[getIndex(sides, ind)] + item + 'b' + item,
        sides[getIndex(sides, ind)] + item,
        sides[getIndex(sides, ind)] + item + 'b' + sides[getIndex(sides, ind)],
        sides[getIndex(sides, ind)] + sides[getIndex(sides, ind)] + item,
        sides[getIndex(sides, ind)] + 'b' + item
      ];
    }
  })
    .flat()
    .map((item, ind) => {
      return {'abbreviation': item, 'azimuth': 360 * ind / 32};
    });
  return compassPoints32;
}


/**
 * Expand the braces of the specified string.
 * See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
 *
 * In the input string, balanced pairs of braces containing comma-separated substrings
 * represent alternations that specify multiple alternatives which are to appear
 * at that position in the output.
 *
 * @param {string} str
 * @return {Iterable.<string>}
 *
 * NOTE: The order of output string does not matter.
 *
 * Example:
 *   '~/{Downloads,Pictures}/*.{jpg,gif,png}'  => '~/Downloads/*.jpg',
 *                                                '~/Downloads/*.gif'
 *                                                '~/Downloads/*.png',
 *                                                '~/Pictures/*.jpg',
 *                                                '~/Pictures/*.gif',
 *                                                '~/Pictures/*.png'
 *
 *   'It{{em,alic}iz,erat}e{d,}, please.'  => 'Itemized, please.',
 *                                            'Itemize, please.',
 *                                            'Italicized, please.',
 *                                            'Italicize, please.',
 *                                            'Iterated, please.',
 *                                            'Iterate, please.'
 *
 *   'thumbnail.{png,jp{e,}g}'  => 'thumbnail.png'
 *                                 'thumbnail.jpeg'
 *                                 'thumbnail.jpg'
 *
 *   'nothing to do' => 'nothing to do'
 */
function* expandBraces(str) {

  function parse(str) {
    if (!str.includes('{')) return [str];
    const result = [];

    const countBraces = symbol => {
      return symbol === '{'
        ? 1
        : symbol === '}'
          ? -1
          : 0;
    };

    const start = str.indexOf('{');
    let currentIndex = start + 1;
    let braceNumber = 1;

    while (braceNumber > 0) {
      braceNumber += countBraces(str[currentIndex]);
      currentIndex++;
    }

    const processingSubstr = str
      .slice(start + 1, currentIndex - 1)
      .split('')
      .map(item => {
        if (item === '{') braceNumber += 1;
        if (item === '}') braceNumber -= 1;
        return braceNumber === 0 && item === ',' ? ':::' : item;
      })
      .join('')
      .split(':::')
      .map(item => str.slice(0, start) + item + str.slice(currentIndex));

    for (const str of processingSubstr) {
      result.push(parse(str));
    }
    return result.flat();
  }


  for (const string of parse(str)) {
    yield string;
  }
}


/**
 * Returns the ZigZag matrix
 *
 * The fundamental idea in the JPEG compression algorithm is to sort coefficient
 * of given image by zigzag path and encode it.
 * In this task you are asked to implement a simple method to create a zigzag square matrix.
 * See details at https://en.wikipedia.org/wiki/JPEG#Entropy_coding
 * and zigzag path here: https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/JPEG_ZigZag.svg/220px-JPEG_ZigZag.svg.png
 *
 * @param {number} n - matrix dimension
 * @return {array}  n x n array of zigzag path
 *
 * @example
 *   1  => [[0]]
 *
 *   2  => [[ 0, 1 ],
 *          [ 2, 3 ]]
 *
 *         [[ 0, 1, 5 ],
 *   3  =>  [ 2, 4, 6 ],
 *          [ 3, 7, 8 ]]
 *
 *         [[ 0, 1, 5, 6 ],
 *   4 =>   [ 2, 4, 7,12 ],
 *          [ 3, 8,11,13 ],
 *          [ 9,10,14,15 ]]
 *
 */
function getZigZagMatrix(n) {
  const matrix = [...new Array(n)].map(item => Array(n).fill(0));

  let value = 0;

  const numberOfDiagonals = n * 2 - 1;

  for (let currentDiag = 0; currentDiag < numberOfDiagonals; currentDiag++) {

    const diagDimensionDiff = currentDiag >= n ? currentDiag - n + 1 : 0;
    const i = currentDiag >= n ? n - 1 : currentDiag;

    if (currentDiag % 2 === 0) {
      for (let j = i; j >= 0; j--) {
        matrix[j][i - j + diagDimensionDiff] = value;
        value += 1;
        if (j === diagDimensionDiff) break;
      }
    } else {
      for (let j = i; j >= 0; j--) {
        matrix[i - j + diagDimensionDiff][j] = value;
        value += 1;
        if (j === diagDimensionDiff) break;
      }
    }

  }

  return matrix;
}


/**
 * Returns true if specified subset of dominoes can be placed in a row accroding to the game rules.
 * Dominoes details see at: https://en.wikipedia.org/wiki/Dominoes
 *
 * Each domino tile presented as an array [x,y] of tile value.
 * For example, the subset [1, 1], [2, 2], [1, 2] can be arranged in a row
 *  (as [1, 1] followed by [1, 2] followed by [2, 2]),
 * while the subset [1, 1], [0, 3], [1, 4] can not be arranged in one row.
 * NOTE that as in usual dominoes playing any pair [i, j] can also be treated as [j, i].
 *
 * @params {array} dominoes
 * @return {bool}
 *
 * @example
 *
 * [[0,1],  [1,1]] => true
 * [[1,1], [2,2], [1,5], [5,6], [6,3]] => false
 * [[1,3], [2,3], [1,4], [2,4], [1,5], [2,5]]  => true
 * [[0,0], [0,1], [1,1], [0,2], [1,2], [2,2], [0,3], [1,3], [2,3], [3,3]] => false
 *
 */
function canDominoesMakeRow(dominoes) {
  dominoes = dominoes.slice();

  const stack = [...dominoes.pop()];

  while (dominoes.length > 0) {
    const currentDominoNumber = stack.pop();
    const currentDominoIndex = dominoes
      .findIndex(item => item.includes(currentDominoNumber));

    if(currentDominoIndex === -1 && stack.length > 0) continue;
    if(currentDominoIndex === -1 && stack.length === 0) return false;

    const currentDomino = dominoes.splice(currentDominoIndex, 1).flat();
    const newDominoNumber = currentDomino
      .find(item => item !== currentDominoNumber);
    stack.push(
      newDominoNumber !== undefined
        ? newDominoNumber
        : currentDominoNumber
    );
  }

  return true;
}


/**
 * Returns the string expression of the specified ordered list of integers.
 *
 * A format for expressing an ordered list of integers is to use a comma separated list of either:
 *   - individual integers
 *   - or a range of integers denoted by the starting integer separated from the end
 *     integer in the range by a dash, '-'.
 *     (The range includes all integers in the interval including both endpoints)
 *     The range syntax is to be used only for, and for every range that expands to
 *     more than two values.
 *
 * @params {array} nums
 * @return {bool}
 *
 * @example
 *
 * [ 0, 1, 2, 3, 4, 5 ]   => '0-5'
 * [ 1, 4, 5 ]            => '1,4,5'
 * [ 0, 1, 2, 5, 7, 8, 9] => '0-2,5,7-9'
 * [ 1, 2, 4, 5]          => '1,2,4,5'
 */
function extractRanges(nums) {
  const result = [];

  const stack = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      stack.push(nums[i]);
    } else {
      result.push(stack.length > 2
        ? `${stack[0]}-${stack[stack.length - 1]}`
        : stack.length > 1
          ? `${stack.join()}`
          :  `${stack[0]}`);
      stack.length = 0;
      stack.push(nums[i]);
    }
  }

  result.push(stack.length > 2
    ? `${stack[0]}-${stack[stack.length - 1]}`
    : stack.length > 1
      ? `${stack.join()}`
      :  `${stack[0]}`);
  stack.length = 0;

  return result.join();
}

module.exports = {
  createCompassPoints : createCompassPoints,
  expandBraces : expandBraces,
  getZigZagMatrix : getZigZagMatrix,
  canDominoesMakeRow : canDominoesMakeRow,
  extractRanges : extractRanges
};
