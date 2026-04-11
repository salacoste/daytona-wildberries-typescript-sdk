import { describe, it, expect } from 'vitest';
import { version } from '../../src/index';

describe('SDK Index', () => {
  it('should export version string', () => {
    expect(version).toBeDefined();
    expect(typeof version).toBe('string');
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('should have version 3.6.2', () => {
    expect(version).toBe('3.6.2');
  });
});
