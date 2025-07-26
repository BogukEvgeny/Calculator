import { parseAndCalculate } from './result.js';

const screen = document.querySelector('.screen');
const numberBtn = document.querySelectorAll('.zero, .one, .two, .three, .four, .five, .six, .seven, .eight, .nine');
const additionBtn = document.querySelector('.addition');
const subtractionBtn = document.querySelector('.subtraction');
const multiplyBtn = document.querySelector('.multiply');
const dividedBtn = document.querySelector('.divided');
const factorialBtn = document.querySelector('.factorial');
const squareBtn = document.querySelector('.square');
const squareRootBtn = document.querySelector('.squareRoot');
const persentBtn = document.querySelector('.persent');
const cubeRootBtn = document.querySelector('.cubeRoot');
const cubeBtn = document.querySelector('.cube');
const piBtn = document.querySelector('.pi');
const rootBtn = document.querySelector('.root');
const powerBtn = document.querySelector('.power');
const exponentaBtn = document.querySelector('.exponenta');
const oneDividedXBtn = document.querySelector('.oneDividedX');
const tenPowerXBtn = document.querySelector('.tenPowerX');
const operandBtn = document.querySelector('.operand');
const changeSignBtn = document.querySelector('.changeSign');
const clearBtn = document.querySelector('.clear');
const resultBtn = document.querySelector('.equall');
const memoryBtn = document.querySelector('.memory');
const memoryMinusBtn = document.querySelector('.memoryMinus');
const memoryPlusBtn = document.querySelector('.memoryPlus');
const memoryClearBtn = document.querySelector('.memoryClear');

numberBtn.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;
    screen.textContent += buttonText;
  });
});

operandBtn.addEventListener('click', () => {
  if (!screen.textContent.includes('.') || screen.textContent.includes(' ')) {
    screen.textContent += '.';
  }
});

clearBtn.addEventListener('click', () => {
  screen.textContent = '';
});

additionBtn.addEventListener('click', () => {
  screen.textContent += ' + ';
});

subtractionBtn.addEventListener('click', () => {
  screen.textContent += ' - ';
});

multiplyBtn.addEventListener('click', () => {
  screen.textContent += ' × ';
});

dividedBtn.addEventListener('click', () => {
  screen.textContent += ' ÷ ';
});

factorialBtn.addEventListener('click', () => {
  screen.textContent += '! ';
});

squareBtn.addEventListener('click', () => {
  screen.textContent += ' ^ 2 ';
});

squareRootBtn.addEventListener('click', () => {
  screen.textContent += ' √';
});

persentBtn.addEventListener('click', () => {
  screen.textContent += '% ';
});

cubeRootBtn.addEventListener('click', () => {
  screen.textContent += ' ∛';
});

cubeBtn.addEventListener('click', () => {
  screen.textContent += ' ^ 3 ';
});

piBtn.addEventListener('click', () => {
  screen.textContent += ' π ';
});

powerBtn.addEventListener('click', () => {
  screen.textContent += ' ^ ';
});

rootBtn.addEventListener('click', () => {
  screen.textContent += '^1/';
});

exponentaBtn.addEventListener('click', () => {
  screen.textContent += ' e ';
});

oneDividedXBtn.addEventListener('click', () => {
  const expr = screen.textContent.trim();
  if (expr && !isNaN(expr)) {
    const result = parseAndCalculate(`1/${expr}`);
    screen.textContent = result;
  } else {
    screen.textContent += '1/';
  }
});

tenPowerXBtn.addEventListener('click', () => {
  screen.textContent += '10^';
});

changeSignBtn.addEventListener('click', () => {
  const expr = screen.textContent.trim();
  if (!expr) return;

  if (!isNaN(expr)) {
    const num = parseFloat(expr);
    screen.textContent = (-num).toString();
    return;
  }

  const lastNumberMatch = expr.match(/([+-]?\d+(?:\.\d+)?)(?:\s*[+\-×÷^!%]\s*)*$/);
  if (lastNumberMatch) {
    const lastNumber = lastNumberMatch[1];
    const newNumber = (-parseFloat(lastNumber)).toString();
    screen.textContent = expr.replace(new RegExp(`${lastNumber.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`), newNumber);
    return;
  }

  const parts = expr.split(/\s*([+\-×÷^])\s*/);

  let lastNumberIndex = -1;
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i].trim();
    if (part && !isNaN(part) && !['+', '-', '×', '÷', '^'].includes(part)) {
      lastNumberIndex = i;
      break;
    }
  }

  if (lastNumberIndex !== -1) {
    const numStr = parts[lastNumberIndex];
    const num = parseFloat(numStr);
    parts[lastNumberIndex] = (-num).toString();

    let result = '';
    for (let i = 0; i < parts.length; i++) {
      if (['+', '-', '×', '÷', '^'].includes(parts[i])) {
        result += ` ${parts[i]} `;
      } else {
        result += parts[i];
      }
    }

    result = result.replace(/\s+/g, ' ').trim();
    screen.textContent = result;
  }
});

resultBtn.addEventListener('click', () => {
  const expr = screen.textContent.trim();
  if (!expr) return;

  const result = parseAndCalculate(expr);
  screen.textContent = result;
});

let memory = null;

memoryPlusBtn.addEventListener('click', () => {
  const currentText = screen.textContent.trim();
  if (!isNaN(currentText)) {
    memory += parseFloat(currentText);
  }
});

memoryMinusBtn.addEventListener('click', () => {
  const currentText = screen.textContent.trim();
  if (!isNaN(currentText)) {
    memory -= parseFloat(currentText);
  }
});

memoryBtn.addEventListener('click', () => {
  screen.textContent = memory;
});

memoryClearBtn.addEventListener('click', () => {
  memory = null;
});
