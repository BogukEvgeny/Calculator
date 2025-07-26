import '../styles/styles.css';
import {
  addition,
  subtraction,
  multiply,
  divided,
  factorial,
  square,
  squareRoot,
  persent,
  cubeRoot,
  cube,
  power,
  root,
  pi,
  exponenta,
  oneDividedX,
  tenPowerX,
} from './operation_functions.js';

function roundResult(value) {
  if (typeof value !== 'number' || isNaN(value)) {
    return value;
  }

  const str = value.toString();

  if (!str.includes('.')) {
    return value;
  }

  const parts = str.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  if (decimalPart.length <= 2) {
    return value;
  }

  if (decimalPart.length > 10) {
    let significantDigits = '';
    let zeroCount = 0;
    let nineCount = 0;

    for (let i = 0; i < decimalPart.length; i++) {
      const digit = decimalPart[i];

      if (digit === '0') {
        zeroCount++;
        if (zeroCount > 8) break;
      } else if (digit === '9') {
        nineCount++;
        if (nineCount > 8) break;
      } else {
        zeroCount = 0;
        nineCount = 0;
      }

      significantDigits += digit;

      if ((zeroCount > 8 || nineCount > 8) && significantDigits.length > 0) {
        break;
      }
    }

    significantDigits = significantDigits.replace(/0+$/, '').replace(/9+$/, '');

    if (significantDigits === '') {
      return parseInt(integerPart, 10);
    }

    const result = parseFloat(`${integerPart}.${significantDigits}`);
    return result;
  }

  return value;
}

export function parseAndCalculate(inputExpression) {
  try {
    const expression = inputExpression.replace(/−/g, '-').replace(/\s+/g, ' ').trim();

    let tokens = tokenize(expression);
    if (!tokens.length) return '';

    tokens = processPostfix(tokens);

    tokens = processUnary(tokens);

    tokens = processPowers(tokens);

    tokens = processBinary(tokens);

    const result = tokens[0]?.value ?? 'Error';
    return typeof result === 'number' ? roundResult(result) : result;
  } catch (e) {
    return 'Error';
  }
}

export function tokenize(str) {
  const tokens = [];
  const chars = str.trim().split('');
  let i = 0;

  while (i < chars.length) {
    const c = chars[i];

    if (c === ' ') {
      i++;
      continue;
    }

    if (c === '-' || c === '−') {
      let prevNonSpace = null;
      for (let j = i - 1; j >= 0; j--) {
        if (chars[j] !== ' ') {
          prevNonSpace = chars[j];
          break;
        }
      }

      const isUnary =
        i === 0 ||
        prevNonSpace === null ||
        ['+', '-', '×', '÷', '^', '√', '∛'].includes(prevNonSpace);

      if (isUnary) {
        let numStr = '-';
        i++;

        while (i < chars.length && chars[i] === ' ') {
          i++;
        }

        while (i < chars.length && /\d|\./.test(chars[i])) {
          numStr += chars[i];
          i++;
        }

        if (numStr === '-' || Number.isNaN(Number(numStr))) {
          return [{ type: 'number', value: 'Error' }];
        }

        tokens.push({ type: 'number', value: parseFloat(numStr) });
        continue;
      } else {
        tokens.push({ type: 'operator', value: '-' });
        i++;
        continue;
      }
    }

    if (/\d/.test(c)) {
      let numStr = '';
      while (i < chars.length && /\d|\./.test(chars[i])) {
        numStr += chars[i];
        i++;
      }
      tokens.push({ type: 'number', value: parseFloat(numStr) });
      continue;
    }

    if (['+', '×', '÷'].includes(c)) {
      tokens.push({ type: 'operator', value: c });
      i++;
      continue;
    }

    if (['√', '∛', '!', '%', 'π', 'e'].includes(c)) {
      tokens.push({ type: 'func', value: c });
      i++;
      continue;
    }

    if (c === '/') {
      tokens.push({ type: 'operator', value: '÷' });
      i++;
      continue;
    }

    if (c === '1') {
      let j = i + 1;
      while (j < chars.length && chars[j] === ' ') j++;

      if (j < chars.length && chars[j] === '/') {
        j++;
        while (j < chars.length && chars[j] === ' ') j++;

        if (j < chars.length && chars[j] === 'x') {
          j++;
          while (j < chars.length && chars[j] === ' ') j++;

          tokens.push({ type: 'func', value: '1/x' });
          i = j;
          continue;
        } else {
          tokens.push({ type: 'number', value: 1 });
          tokens.push({ type: 'operator', value: '÷' });
          i = j;
          continue;
        }
      }
    }

    if (c === '1') {
      let j = i + 1;
      while (j < chars.length && chars[j] === ' ') j++;

      if (j < chars.length && chars[j] === '0') {
        j++;
        while (j < chars.length && chars[j] === ' ') j++;

        if (j < chars.length && chars[j] === '^') {
          tokens.push({ type: 'func', value: '10^' });
          i = j + 1;
          continue;
        }
      }
    }

    if (c === '^') {
      let j = i + 1;
      while (j < chars.length && chars[j] === ' ') j++;

      if (j < chars.length && chars[j] === '2') {
        tokens.push({ type: 'func', value: '^2' });
        i = j + 1;
      } else if (j < chars.length && chars[j] === '3') {
        tokens.push({ type: 'func', value: '^3' });
        i = j + 1;
      } else if (j < chars.length && chars[j] === '1') {
        let k = j + 1;
        while (k < chars.length && chars[k] === ' ') k++;
        if (k < chars.length && chars[k] === '/') {
          tokens.push({ type: 'func', value: 'root' });
          i = k + 1;
        } else {
          tokens.push({ type: 'operator', value: '^' });
          i++;
        }
      } else {
        tokens.push({ type: 'operator', value: '^' });
        i++;
      }
      continue;
    }

    i++;
  }

  return tokens;
}

export function processPostfix(tokens) {
  const result = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'func' && token.value === '!') {
      if (result.length === 0) return [{ type: 'number', value: 'Error' }];
      const num = result.pop().value;
      const res = factorial(num);
      if (res === 'Error') return [{ type: 'number', value: 'Error' }];
      result.push({ type: 'number', value: res });
    } else if (token.type === 'func' && token.value === '%') {
      if (result.length === 0) return [{ type: 'number', value: 'Error' }];
      const num = result.pop().value;
      result.push({ type: 'number', value: persent(num) });
    } else if (token.type === 'func' && token.value === '1/x') {
      if (result.length === 0) return [{ type: 'number', value: 'Error' }];
      const num = result.pop().value;
      const res = oneDividedX(num);
      if (res === 'Error') return [{ type: 'number', value: 'Error' }];
      result.push({ type: 'number', value: res });
    } else {
      result.push(token);
    }
  }
  return result;
}

export function processUnary(tokens) {
  const result = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const next = tokens[i + 1];

    if (token.type === 'func' && token.value === 'π') {
      result.push({ type: 'number', value: pi() });
    } else if (token.type === 'func' && token.value === 'e') {
      result.push({ type: 'number', value: exponenta() });
    } else if (token.type === 'func' && token.value === '√') {
      if (next?.type === 'number') {
        const res = squareRoot(next.value);
        if (res === 'Error') return [{ type: 'number', value: 'Error' }];
        result.push({ type: 'number', value: res });
        i++;
      } else {
        return [{ type: 'number', value: 'Error' }];
      }
    } else if (token.type === 'func' && token.value === '∛') {
      if (next?.type === 'number') {
        const res = cubeRoot(next.value);
        if (res === 'Error') return [{ type: 'number', value: 'Error' }];
        result.push({ type: 'number', value: res });
        i++;
      } else {
        return [{ type: 'number', value: 'Error' }];
      }
    } else {
      result.push(token);
    }
  }
  return result;
}

export function processPowers(tokens) {
  const result = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const next = tokens[i + 1];

    if (token.type === 'func' && token.value === 'root') {
      if (result.length === 0 || !next || next.type !== 'number') return [{ type: 'number', value: 'Error' }];
      const base = result.pop().value;
      const degree = next.value;
      const res = root(base, degree);
      if (res === 'Error') return [{ type: 'number', value: 'Error' }];
      result.push({ type: 'number', value: res });
      i++;
    } else if (token.type === 'operator' && token.value === '^') {
      if (result.length === 0 || !next || next.type !== 'number') return [{ type: 'number', value: 'Error' }];
      const base = result.pop().value;
      const exp = next.value;
      const res = power(base, exp);
      result.push({ type: 'number', value: res });
      i++;
    } else if (token.type === 'func' && token.value === '^2') {
      if (result.length === 0) return [{ type: 'number', value: 'Error' }];
      const base = result.pop().value;
      result.push({ type: 'number', value: square(base) });
    } else if (token.type === 'func' && token.value === '^3') {
      if (result.length === 0) return [{ type: 'number', value: 'Error' }];
      const base = result.pop().value;
      result.push({ type: 'number', value: cube(base) });
    } else if (token.type === 'func' && token.value === '10^' && next?.type === 'number') {
      const exp = next.value;
      result.push({ type: 'number', value: tenPowerX(exp) });
      i++;
    } else {
      result.push(token);
    }
  }
  return result;
}

export function processBinary(tokens) {
  let result = [...tokens];

  result = evaluateOp(result, '×', multiply);
  result = evaluateOp(result, '÷', divided);

  result = evaluateOp(result, '+', addition);
  result = evaluateOp(result, '-', subtraction);

  return result;
}

export function evaluateOp(tokens, op, func) {
  const stack = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'operator' && tokens[i].value === op) {
      const left = stack.pop();
      const right = tokens[i + 1];
      if (!left || !right || left.type !== 'number' || right.type !== 'number') {
        return [{ type: 'number', value: 'Error' }];
      }
      const res = func(left.value, right.value);
      if (res === 'Error') return [{ type: 'number', value: 'Error' }];

      const roundedRes = typeof res === 'number' ? roundResult(res) : res;
      stack.push({ type: 'number', value: roundedRes });
      i++;
    } else {
      stack.push(tokens[i]);
    }
  }
  return stack;
}
