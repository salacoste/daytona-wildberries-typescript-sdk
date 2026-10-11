import { describe, expect, it } from 'vitest';
import { ALL_RATE_LIMITS, applyBasicTokenMultipliers } from '../../../src/config/rate-limits';
import { sandboxDbsRateLimits } from '../../../src/config/sandbox-dbs-rate-limits';

describe('sandbox DBS rate limits', () => {
  const expected = {
    requestsPerMinute: 60,
    intervalSeconds: 1,
    burstLimit: 1,
    penaltyMultiplier: 1,
  };

  it('registers the official one-request-per-second limit', () => {
    expect(sandboxDbsRateLimits['sandbox-dbs.createTestOrders']).toEqual(expected);
    expect(ALL_RATE_LIMITS['sandbox-dbs.createTestOrders']).toEqual(expected);
  });

  it('does not apply the generic 60x Test-token downscale to sandbox limits', () => {
    const testTokenLimits = applyBasicTokenMultipliers(ALL_RATE_LIMITS);
    expect(testTokenLimits['sandbox-dbs.createTestOrders']).toEqual(expected);
  });
});
