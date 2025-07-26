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
  pi,
  power,
  root,
  exponenta,
  oneDividedX,
  tenPowerX,
} from './operation_functions.js';

import {
  parseAndCalculate,
  tokenize,
  processPostfix,
  processUnary,
  processPowers,
  processBinary,
} from './result.js';

describe('Basic Operations', () => {
  describe('addition', () => {
    test('should add positive numbers', () => {
      expect(addition(2, 3)).toBe(5);
      expect(addition(10, 5)).toBe(15);
    });

    test('should add negative numbers', () => {
      expect(addition(-2, -3)).toBe(-5);
      expect(addition(-10, 5)).toBe(-5);
    });

    test('should add decimal numbers', () => {
      expect(addition(2.5, 3.5)).toBe(6);
      expect(addition(1.1, 2.2)).toBeCloseTo(3.3);
    });
  });

  describe('subtraction', () => {
    test('should subtract positive numbers', () => {
      expect(subtraction(5, 3)).toBe(2);
      expect(subtraction(10, 15)).toBe(-5);
    });

    test('should subtract negative numbers', () => {
      expect(subtraction(-5, -3)).toBe(-2);
      expect(subtraction(-10, 5)).toBe(-15);
    });

    test('should subtract decimal numbers', () => {
      expect(subtraction(5.5, 2.5)).toBe(3);
      expect(subtraction(1.1, 2.2)).toBeCloseTo(-1.1);
    });
  });

  describe('multiply', () => {
    test('should multiply positive numbers', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(4, 5)).toBe(20);
    });

    test('should multiply negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });

    test('should multiply by zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 10)).toBe(0);
    });

    test('should multiply decimal numbers', () => {
      expect(multiply(2.5, 4)).toBe(10);
      expect(multiply(1.5, 2.5)).toBe(3.75);
    });
  });

  describe('divided', () => {
    test('should divide positive numbers', () => {
      expect(divided(10, 2)).toBe(5);
      expect(divided(15, 3)).toBe(5);
    });

    test('should divide negative numbers', () => {
      expect(divided(-10, 2)).toBe(-5);
      expect(divided(-10, -2)).toBe(5);
    });

    test('should handle division by zero', () => {
      expect(divided(10, 0)).toBe('Error');
      expect(divided(-5, 0)).toBe('Error');
    });

    test('should divide decimal numbers', () => {
      expect(divided(7.5, 2.5)).toBe(3);
      expect(divided(1, 3)).toBeCloseTo(0.333333);
    });
  });
});

describe('Advanced Operations', () => {
  describe('factorial', () => {
    test('should calculate factorial of positive integers', () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
      expect(factorial(6)).toBe(720);
    });

    test('should return error for negative numbers', () => {
      expect(factorial(-1)).toBe('Error');
      expect(factorial(-5)).toBe('Error');
    });

    test('should handle decimal numbers', () => {
      expect(factorial(3.5)).toBe(6);
    });
  });

  describe('square', () => {
    test('should calculate square of numbers', () => {
      expect(square(4)).toBe(16);
      expect(square(-3)).toBe(9);
      expect(square(0)).toBe(0);
    });

    test('should calculate square of decimal numbers', () => {
      expect(square(2.5)).toBe(6.25);
      expect(square(-1.5)).toBe(2.25);
    });
  });

  describe('squareRoot', () => {
    test('should calculate square root of positive numbers', () => {
      expect(squareRoot(16)).toBe(4);
      expect(squareRoot(25)).toBe(5);
      expect(squareRoot(0)).toBe(0);
    });

    test('should return error for negative numbers', () => {
      expect(squareRoot(-4)).toBe('Error');
      expect(squareRoot(-1)).toBe('Error');
    });

    test('should calculate square root of decimal numbers', () => {
      expect(squareRoot(6.25)).toBe(2.5);
      expect(squareRoot(2)).toBeCloseTo(1.414213);
    });
  });

  describe('persent', () => {
    test('should convert numbers to percentage', () => {
      expect(persent(50)).toBe(0.5);
      expect(persent(100)).toBe(1);
      expect(persent(25)).toBe(0.25);
    });

    test('should handle decimal numbers', () => {
      expect(persent(12.5)).toBe(0.125);
      expect(persent(0.5)).toBe(0.005);
    });
  });

  describe('cubeRoot', () => {
    test('should calculate cube root of positive numbers', () => {
      expect(cubeRoot(27)).toBe(3);
      expect(cubeRoot(8)).toBe(2);
      expect(cubeRoot(0)).toBe(0);
    });

    test('should calculate cube root of negative numbers', () => {
      expect(cubeRoot(-27)).toBe(-3);
      expect(cubeRoot(-8)).toBe(-2);
    });

    test('should calculate cube root of decimal numbers', () => {
      expect(cubeRoot(3.375)).toBeCloseTo(1.5);
    });
  });

  describe('cube', () => {
    test('should calculate cube of numbers', () => {
      expect(cube(3)).toBe(27);
      expect(cube(-2)).toBe(-8);
      expect(cube(0)).toBe(0);
    });

    test('should calculate cube of decimal numbers', () => {
      expect(cube(1.5)).toBe(3.375);
      expect(cube(-1.2)).toBeCloseTo(-1.728);
    });
  });

  describe('power', () => {
    test('should calculate power of numbers', () => {
      expect(power(2, 3)).toBe(8);
      expect(power(5, 2)).toBe(25);
      expect(power(10, 0)).toBe(1);
    });

    test('should handle negative exponents', () => {
      expect(power(2, -2)).toBe(0.25);
      expect(power(10, -1)).toBe(0.1);
    });

    test('should handle decimal numbers', () => {
      expect(power(2.5, 2)).toBe(6.25);
      expect(power(4, 0.5)).toBe(2);
    });
  });

  describe('root', () => {
    test('should calculate nth root of positive numbers', () => {
      expect(root(16, 2)).toBe(4);
      expect(root(27, 3)).toBe(3);
      expect(root(32, 5)).toBe(2);
    });

    test('should return error for division by zero', () => {
      expect(root(10, 0)).toBe('Error');
    });

    test('should return error for even root of negative numbers', () => {
      expect(root(-16, 2)).toBe('Error');
      expect(root(-8, 4)).toBe('Error');
    });

    test('should calculate odd root of negative numbers', () => {
      expect(root(-27, 3)).toBe(-3);
      expect(root(-32, 5)).toBe(-2);
    });
  });

  describe('oneDividedX', () => {
    test('should calculate reciprocal of numbers', () => {
      expect(oneDividedX(2)).toBe(0.5);
      expect(oneDividedX(4)).toBe(0.25);
      expect(oneDividedX(-2)).toBe(-0.5);
    });

    test('should return error for zero', () => {
      expect(oneDividedX(0)).toBe('Error');
    });

    test('should handle decimal numbers', () => {
      expect(oneDividedX(0.5)).toBe(2);
      expect(oneDividedX(0.25)).toBe(4);
    });
  });

  describe('tenPowerX', () => {
    test('should calculate 10 to the power of x', () => {
      expect(tenPowerX(2)).toBe(100);
      expect(tenPowerX(3)).toBe(1000);
      expect(tenPowerX(0)).toBe(1);
    });

    test('should handle negative exponents', () => {
      expect(tenPowerX(-2)).toBe(0.01);
      expect(tenPowerX(-1)).toBe(0.1);
    });

    test('should handle decimal exponents', () => {
      expect(tenPowerX(0.5)).toBeCloseTo(3.162277);
    });
  });
});

describe('Constants', () => {
  describe('pi', () => {
    test('should return approximation of pi', () => {
      expect(pi()).toBe(3.14);
    });
  });

  describe('exponenta', () => {
    test('should return approximation of e', () => {
      expect(exponenta()).toBe(2.72);
    });
  });
});

describe('Calculator Parser', () => {
  describe('parseAndCalculate', () => {
    test('should handle basic arithmetic', () => {
      expect(parseAndCalculate('2 + 3')).toBe(5);
      expect(parseAndCalculate('10 - 5')).toBe(5);
      expect(parseAndCalculate('4 × 3')).toBe(12);
      expect(parseAndCalculate('15 ÷ 3')).toBe(5);
    });

    test('should handle negative numbers', () => {
      expect(parseAndCalculate('-5')).toBe(-5);
      expect(parseAndCalculate('-2 + 3')).toBe(1);
      expect(parseAndCalculate('5 + -3')).toBe(2);
    });

    test('should handle decimal numbers', () => {
      expect(parseAndCalculate('2.5 + 1.5')).toBe(4);
      expect(parseAndCalculate('3.14 × 2')).toBe(6.28);
    });

    test('should handle complex expressions', () => {
      expect(parseAndCalculate('2 + 3 × 4')).toBe(14);
      expect(parseAndCalculate('10 ÷ 2 + 3')).toBe(8);
    });

    test('should handle factorial', () => {
      expect(parseAndCalculate('5!')).toBe(120);
      expect(parseAndCalculate('3! + 2')).toBe(8);
    });

    test('should handle percentage', () => {
      expect(parseAndCalculate('50%')).toBe(0.5);
      expect(parseAndCalculate('25% × 100')).toBe(25);
    });

    test('should handle square and cube', () => {
      expect(parseAndCalculate('4 ^ 2')).toBe(16);
      expect(parseAndCalculate('2 ^ 3')).toBe(8);
    });

    test('should handle square root', () => {
      expect(parseAndCalculate('√16')).toBe(4);
      expect(parseAndCalculate('√25')).toBe(5);
    });

    test('should handle cube root', () => {
      expect(parseAndCalculate('∛27')).toBe(3);
      expect(parseAndCalculate('∛8')).toBe(2);
    });

    test('should handle constants', () => {
      expect(parseAndCalculate('π')).toBe(3.14);
      expect(parseAndCalculate('e')).toBe(2.72);
      expect(parseAndCalculate('π + 1')).toBe(4.14);
    });

    test('should handle 1/x operation', () => {
      expect(parseAndCalculate('1/x')).toBe('Error');
    });

    test('should handle 10^x operation', () => {
      expect(parseAndCalculate('10^2')).toBe(100);
      expect(parseAndCalculate('10^3')).toBe(1000);
    });

    test('should handle errors', () => {
      expect(parseAndCalculate('5 ÷ 0')).toBe('Error');
      expect(parseAndCalculate('√-4')).toBe('Error');
      expect(parseAndCalculate('-5!')).toBe('Error');
    });

    test('should handle empty or invalid expressions', () => {
      expect(parseAndCalculate('')).toBe('');
      expect(parseAndCalculate(' ')).toBe('');
      expect(parseAndCalculate('+')).toBe('Error');
    });

    test('should handle mixed operations', () => {
      expect(parseAndCalculate('2 ^ 2 + 3 × 4')).toBe(16);
      expect(parseAndCalculate('√16 + 2!')).toBe(6);
      expect(parseAndCalculate('50% + 25%')).toBe(0.75);
    });
  });

  describe('tokenize', () => {
    test('should tokenize simple expressions', () => {
      const tokens = tokenize('2 + 3');
      expect(tokens).toEqual([
        { type: 'number', value: 2 },
        { type: 'operator', value: '+' },
        { type: 'number', value: 3 },
      ]);
    });

    test('should tokenize negative numbers', () => {
      const tokens = tokenize('-5');
      expect(tokens).toEqual([
        { type: 'number', value: -5 },
      ]);
    });

    test('should tokenize functions', () => {
      const tokens = tokenize('√16');
      expect(tokens).toEqual([
        { type: 'func', value: '√' },
        { type: 'number', value: 16 },
      ]);
    });

    test('should tokenize factorial', () => {
      const tokens = tokenize('5!');
      expect(tokens).toEqual([
        { type: 'number', value: 5 },
        { type: 'func', value: '!' },
      ]);
    });

    test('should tokenize constants', () => {
      const tokens = tokenize('π + e');
      expect(tokens).toEqual([
        { type: 'func', value: 'π' },
        { type: 'operator', value: '+' },
        { type: 'func', value: 'e' },
      ]);
    });
  });

  describe('processPostfix', () => {
    test('should process factorial', () => {
      const tokens = [
        { type: 'number', value: 5 },
        { type: 'func', value: '!' },
      ];
      const result = processPostfix(tokens);
      expect(result).toEqual([
        { type: 'number', value: 120 },
      ]);
    });

    test('should process percentage', () => {
      const tokens = [
        { type: 'number', value: 50 },
        { type: 'func', value: '%' },
      ];
      const result = processPostfix(tokens);
      expect(result).toEqual([
        { type: 'number', value: 0.5 },
      ]);
    });
  });

  describe('processUnary', () => {
    test('should process constants', () => {
      const tokens = [
        { type: 'func', value: 'π' },
      ];
      const result = processUnary(tokens);
      expect(result).toEqual([
        { type: 'number', value: 3.14 },
      ]);
    });

    test('should process square root', () => {
      const tokens = [
        { type: 'func', value: '√' },
        { type: 'number', value: 16 },
      ];
      const result = processUnary(tokens);
      expect(result).toEqual([
        { type: 'number', value: 4 },
      ]);
    });
  });

  describe('processPowers', () => {
    test('should process power operations', () => {
      const tokens = [
        { type: 'number', value: 2 },
        { type: 'operator', value: '^' },
        { type: 'number', value: 3 },
      ];
      const result = processPowers(tokens);
      expect(result).toEqual([
        { type: 'number', value: 8 },
      ]);
    });

    test('should process square operation', () => {
      const tokens = [
        { type: 'number', value: 4 },
        { type: 'func', value: '^2' },
      ];
      const result = processPowers(tokens);
      expect(result).toEqual([
        { type: 'number', value: 16 },
      ]);
    });
  });

  describe('processBinary', () => {
    test('should process multiplication before addition', () => {
      const tokens = [
        { type: 'number', value: 2 },
        { type: 'operator', value: '+' },
        { type: 'number', value: 3 },
        { type: 'operator', value: '×' },
        { type: 'number', value: 4 },
      ];
      const result = processBinary(tokens);
      expect(result).toEqual([
        { type: 'number', value: 14 },
      ]);
    });

    test('should process division before subtraction', () => {
      const tokens = [
        { type: 'number', value: 10 },
        { type: 'operator', value: '-' },
        { type: 'number', value: 8 },
        { type: 'operator', value: '÷' },
        { type: 'number', value: 2 },
      ];
      const result = processBinary(tokens);
      expect(result).toEqual([
        { type: 'number', value: 6 },
      ]);
    });
  });
});

export default {
  preset: 'default',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.js'],
  transform: {},
  moduleNameMapping: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  collectCoverageFrom: [
    'src/scripts/**/*.js',
    '!src/scripts/**/*.test.js',
  ],
  coverageReporters: [
    'text',
    'lcov',
    'html',
  ],
  testMatch: [
    '**/src/**/*.test.js',
    '**/src/**/*.spec.js',
  ],
  moduleFileExtensions: ['js'],
  testPathIgnorePatterns: ['/node_modules/'],
};
