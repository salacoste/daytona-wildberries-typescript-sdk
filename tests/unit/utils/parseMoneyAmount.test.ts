import { describe, it, expect } from 'vitest';
import { parseMoneyAmount } from '../../../src/utils/parseMoneyAmount';

describe('parseMoneyAmount', () => {
  it('should parse a valid money string to number', () => {
    expect(parseMoneyAmount('367.99')).toBe(367.99);
  });

  it('should return 0 for null', () => {
    expect(parseMoneyAmount(null)).toBe(0);
  });

  it('should return 0 for undefined', () => {
    expect(parseMoneyAmount(undefined)).toBe(0);
  });

  it('should return 0 for empty string', () => {
    expect(parseMoneyAmount('')).toBe(0);
  });

  it('should return 0 for non-numeric string (NaN guard)', () => {
    expect(parseMoneyAmount('abc')).toBe(0);
  });

  it('should parse scientific notation', () => {
    expect(parseMoneyAmount('1e10')).toBe(10000000000);
  });

  it('should parse negative numbers', () => {
    expect(parseMoneyAmount('-42.5')).toBe(-42.5);
  });

  it('should parse zero string', () => {
    expect(parseMoneyAmount('0')).toBe(0);
  });
});
