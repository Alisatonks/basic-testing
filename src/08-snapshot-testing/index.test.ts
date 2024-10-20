// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const array = generateLinkedList(['srt1', 'str2', 'str3']);

    expect(array).toStrictEqual({
      value: 'srt1',
      next: {
        value: 'str2',
        next: {
          value: 'str3',
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    const array = ['str1', 'str2', 'str3', 'str4'];
    const res = generateLinkedList(array);
    expect(res).toMatchSnapshot();
  });
});
