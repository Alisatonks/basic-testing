// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (fn: (...args: unknown[]) => unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockReturnValue(Promise.resolve({ data: null }));
    const mockAxiosCreate = jest.fn().mockReturnValue({ get: mockGet });
    (axios.create as jest.Mock) = mockAxiosCreate;
    await throttledGetDataFromApi('users/123');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(mockGet).toHaveBeenCalledWith('users/123');
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'My data' });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
    await throttledGetDataFromApi('users/123');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(mockGet).toHaveBeenCalledWith('users/123');
  });

  test('should return response data', async () => {
    const mockResp = { name: 'Max Frei' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockResp });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
    const data = await throttledGetDataFromApi('users/123');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(mockGet).toHaveBeenCalledWith('users/123');
    expect(data).toEqual(mockResp);
  });
});
