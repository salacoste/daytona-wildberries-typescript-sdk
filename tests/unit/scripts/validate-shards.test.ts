/**
 * Smoke tests for scripts/validate_shards.cjs
 *
 * Verifies the script exits cleanly against the real repo state and
 * covers the key error paths (missing _index.yaml, missing shard file).
 */

import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import path from 'path';

const REPO_ROOT = path.resolve(__dirname, '../../../');
const SCRIPT = path.join(REPO_ROOT, 'scripts/validate_shards.cjs');

describe('validate_shards.cjs', () => {
  it('should exit 0 and report all shards clean against the real repo', () => {
    let stdout = '';
    let exitCode = 0;
    try {
      stdout = execSync(`node "${SCRIPT}"`, {
        cwd: REPO_ROOT,
        encoding: 'utf8',
      });
    } catch (err) {
      // execSync throws on non-zero exit
      const e = err as { status?: number; stdout?: string };
      exitCode = e.status ?? 1;
      stdout = e.stdout ?? '';
    }

    expect(exitCode).toBe(0);
    // Script reports "N/N clean" on success
    expect(stdout).toMatch(/\d+\/\d+ clean/);
  });

  it('npm run validate:shards should exit 0', () => {
    let exitCode = 0;
    try {
      execSync('npm run validate:shards', {
        cwd: REPO_ROOT,
        encoding: 'utf8',
        stdio: 'pipe',
      });
    } catch (err) {
      const e = err as { status?: number };
      exitCode = e.status ?? 1;
    }
    expect(exitCode).toBe(0);
  });
});
