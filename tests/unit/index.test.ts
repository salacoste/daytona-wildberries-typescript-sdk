import { describe, it, expect } from 'vitest';
import { version } from '../../src/index';

describe('SDK Index', () => {
  it('should export version string', () => {
    expect(version).toBeDefined();
    expect(typeof version).toBe('string');
    expect(version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('should have version 3.4.0', () => {
    expect(version).toBe('3.4.0');
  });
});
