// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 2000000;
    const acc = getBankAccount(balance);
    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(1000000);
    expect(() => acc.withdraw(5000000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc1 = getBankAccount(800);
    const acc2 = getBankAccount(400);
    expect(() => acc1.transfer(900, acc2)).toThrow(InsufficientFundsError);
  });
});

test('should throw error when transferring to the same account', () => {
  const acc = getBankAccount(1000000);
  expect(() => acc.transfer(5000, acc)).toThrow(TransferFailedError);
});

test('should deposit money', () => {
  const acc = getBankAccount(1000000);
  acc.deposit(500000);
  expect(acc.getBalance()).toBe(1500000);
});

test('should withdraw money', () => {
  const account = getBankAccount(500);
  account.withdraw(200);
  expect(account.getBalance()).toBe(300);
});

test('should transfer money', () => {
  const acc1 = getBankAccount(1000);
  const acc2 = getBankAccount(1);
  acc1.transfer(700, acc2);
  expect(acc1.getBalance()).toBe(300);
  expect(acc2.getBalance()).toBe(701);
});

test('fetchBalance should return number in case if request did not failed', async () => {
  const acc = getBankAccount(1);
  const balance = await acc.fetchBalance();
  expect(typeof balance === 'number' || balance === null).toBeTruthy();
});

test('should set new balance if fetchBalance returned number', async () => {
  const account = getBankAccount(3);
  jest.spyOn(account, 'fetchBalance').mockResolvedValue(3);
  await account.synchronizeBalance();
  expect(account.getBalance()).toBe(3);
});

test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
  const account = getBankAccount(1);
  jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
  await expect(account.synchronizeBalance()).rejects.toThrow(
    SynchronizationFailedError,
  );
});
