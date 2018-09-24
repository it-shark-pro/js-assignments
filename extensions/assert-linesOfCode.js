const assert = require('assert');

function linesOfCode(fn, expected, recommended) {
  const actualLinesOfCode = fn.toString().split('\n').filter(s => s.trim()).length - 2;
  const isValid = actualLinesOfCode <= expected;

  const messages = [`
        "${fn.name}" should have maximum ${expected} line(s) of code but it ${actualLinesOfCode}.
  `];
  if (recommended && !isValid && actualLinesOfCode > recommended) {
    messages.push(`Recommended lines of code for ${fn.name} is ${recommended}`);
  }

  assert.ok(isValid, messages.join('\n'));
}

assert.linesOfCode = linesOfCode;
