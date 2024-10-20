// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 15, b: 3, action: Action.Subtract, expected: 12 },
  { a: 16, b: 3, action: Action.Subtract, expected: 13 },
  { a: 17, b: 3, action: Action.Subtract, expected: 14 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 100, b: 2, action: Action.Multiply, expected: 200 },
  { a: 100, b: 2, action: Action.Divide, expected: 50 },
  { a: 200, b: 2, action: Action.Divide, expected: 100 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 40, action: 'invalid', expected: null },
  { a: '37', b: 4, action: Action.Exponentiate, expected: null },
  { a: 4, b: 'string', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate $a $action $b and return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });

      expect(result).toBe(expected);
    },
  );
});
