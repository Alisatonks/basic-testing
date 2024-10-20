// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 15, b: 30, action: Action.Add });
    expect(result).toBe(45);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 100, b: 5, action: Action.Subtract });
    expect(result).toBe(95);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 15, action: Action.Multiply });
    expect(result).toBe(150);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 100, b: 50, action: Action.Divide });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: 'invalid action' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator({ a: '50', b: 73, action: Action.Add });
    const result2 = simpleCalculator({
      a: 5,
      b: '3p',
      action: Action.Subtract,
    });
    const result3 = simpleCalculator({
      a: '500',
      b: '34',
      action: Action.Divide,
    });

    expect(result1).toBeNull();
    expect(result2).toBeNull();
    expect(result3).toBeNull();
  });
});
