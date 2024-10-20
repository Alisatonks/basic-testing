// Uncomment the code below and write your tests
import { join } from 'path';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const timeout = 500;
    doStuffByTimeout(cb, timeout);
    jest.advanceTimersByTime(timeout);
    expect(cb).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const timeout = 500;
    doStuffByTimeout(cb, timeout);
    jest.advanceTimersByTime(timeout - 100);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    const interval = 500;
    doStuffByInterval(cb, interval);
    jest.advanceTimersByTime(interval);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const interval = 200;
    doStuffByInterval(cb, interval);
    jest.advanceTimersByTime(interval * 5);
    expect(cb).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  const mockedContent = 'file content';
  const mockedPath = 'path/to/file/file.txt';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(mockedPath);
    expect(join).toHaveBeenCalledWith(expect.any(String), mockedPath);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const content = await readFileAsynchronously(mockedPath);
    expect(content).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockedContent));
    const fileContent = await readFileAsynchronously(mockedPath);
    expect(fileContent).toBe(mockedContent);
  });
});
