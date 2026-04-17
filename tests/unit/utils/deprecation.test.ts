/**
 * Unit tests for centralized deprecation warning utility (task-107)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { warnOnce, resetDeprecationWarnings } from '../../../src/utils/deprecation';

describe('deprecation utility', () => {
  beforeEach(() => {
    resetDeprecationWarnings();
  });

  it('should emit warning on first call', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    warnOnce('test.method', 'Test warning');
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith('Test warning');
    spy.mockRestore();
  });

  it('should NOT emit warning on second call with same key', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    warnOnce('test.method', 'Test warning');
    warnOnce('test.method', 'Test warning');
    expect(spy).toHaveBeenCalledOnce();
    spy.mockRestore();
  });

  it('should emit separate warnings for different keys', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    warnOnce('method.a', 'Warning A');
    warnOnce('method.b', 'Warning B');
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  it('should emit again after resetDeprecationWarnings()', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    warnOnce('test.method', 'First');
    resetDeprecationWarnings();
    warnOnce('test.method', 'Second');
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });
});
