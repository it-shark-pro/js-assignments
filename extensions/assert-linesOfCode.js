import assert from 'assert';

function linesOfCode(fn, expected, recommended) {
  const actualLinesOfCode = fn.toString().split('\n').filter(s => s.trim()).length - 2;
  const isValid = actualLinesOfCode <= expected;
  if (actualLinesOfCode <= expected && actualLinesOfCode > recommended) {
    console.log(`Recommended lines of code for ${fn.name} is ${recommended}`); 
  }
  const message = `
        "${fn.name}" should have maximum ${expected} line(s) of code but it ${actualLinesOfCode}.
        Recommended lines of code for ${fn.name} is ${recommended}
  `;

  assert.ok(isValid, message);
}

assert.linesOfCode = linesOfCode;
