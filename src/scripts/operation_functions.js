export function addition(a, b) {
  return a + b;
}

export function subtraction(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b;
}

export function divided(a, b) {
  if (b === 0) return 'Error';
  return a / b;
}

export function factorial(a) {
  if (a < 0) return 'Error';
  let result = 1;
  for (let i = 2; i <= a; i++) {
    result *= i;
  }
  return result;
}

export function square(a) {
  return a ** 2;
}

export function squareRoot(a) {
  if (a < 0) return 'Error';
  return a ** (1 / 2);
}

export function persent(a) {
  return a / 100;
}

export function cubeRoot(number) {
  if (number < 0) {
    const value = -number;
    const cubeResult = -(value ** (1 / 3));
    return cubeResult;
  }
  return number ** (1 / 3);
}

export function cube(a) {
  return a ** 3;
}

export function pi() {
  return 3.14;
}

export function power(a, b) {
  return a ** b;
}

export function root(a, b) {
  if (b === 0) return 'Error';
  if (a < 0 && b % 2 === 0) return 'Error';
  if (a < 0 && b % 2 !== 0) {
    const value = -a;
    const rootValue = -(value ** (1 / b));
    return rootValue;
  }
  return a ** (1 / b);
}

export function exponenta() {
  return 2.72;
}

export function oneDividedX(a) {
  if (a === 0) return 'Error';
  return 1 / a;
}

export function tenPowerX(a) {
  return 10 ** a;
}
