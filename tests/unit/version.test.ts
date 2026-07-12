/**
 * Drift-guard for the exported SDK `version`.
 *
 * Catches the bug where `version` was a hardcoded literal that wasn't bumped
 * alongside package.json (shipped stale '3.15.0' through v3.16/3.17/3.18/4.0.0).
 * `version` now derives from package.json; this test pins that invariant so any
 * future drift fails CI.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { version } from '../../src';

const pkg = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf-8')) as {
  version: string;
};

describe('SDK version export', () => {
  it('exported `version` matches package.json (no drift)', () => {
    expect(version).toBe(pkg.version);
  });

  it('exported `version` is a non-empty semver string', () => {
    expect(typeof version).toBe('string');
    expect(version).toMatch(/^\d+\.\d+\.\d+/);
  });
});
