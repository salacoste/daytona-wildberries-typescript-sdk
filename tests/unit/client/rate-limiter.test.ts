/**
 * Unit tests for RateLimiter - Token Bucket Algorithm
 *
 * Tests cover:
 * - Token bucket refill logic
 * - Token consumption and queueing
 * - FIFO queue processing
 * - Concurrent requests handling
 * - Configuration methods
 * - Edge cases and boundary conditions
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RateLimiter } from '../../../src/client/rate-limiter';

describe('RateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Token Consumption', () => {
    it('should allow immediate request when tokens available', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 6 },
      });

      const start = Date.now();
      await limiter.waitForSlot('test');
      const elapsed = Date.now() - start;

      expect(elapsed).toBe(0); // Immediate
      expect(limiter.getRemainingTokens('test')).toBe(5);
    });

    it('should queue request when no tokens available', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 1 },
      });

      // First request: immediate (consumes the only token)
      await limiter.waitForSlot('test');
      expect(limiter.getRemainingTokens('test')).toBe(0);
      expect(limiter.canProceed('test')).toBe(false);

      // Second request: should queue
      const promise = limiter.waitForSlot('test');

      // Advance time to allow token refill (10 seconds for 1 token at 6/min rate)
      await vi.advanceTimersByTimeAsync(10000);

      await promise; // Should resolve after token refill
      expect(limiter.getRemainingTokens('test')).toBe(0);
    });

    it('should allow unlimited requests for unconfigured endpoints', async () => {
      const limiter = new RateLimiter({
        configured: { requestsPerMinute: 1 },
      });

      // Unconfigured endpoint should be unlimited
      for (let i = 0; i < 100; i++) {
        await limiter.waitForSlot('unconfigured');
      }

      expect(limiter.getRemainingTokens('unconfigured')).toBe(Infinity);
      expect(limiter.canProceed('unconfigured')).toBe(true);
    });
  });

  describe('Token Refill Mechanism', () => {
    it('should refill tokens over time', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 6 },
      });

      // Consume all tokens
      for (let i = 0; i < 6; i++) {
        await limiter.waitForSlot('test');
      }

      expect(limiter.getRemainingTokens('test')).toBe(0);

      // Advance 30 seconds (should refill 3 tokens at rate of 6/min = 0.1/s)
      await vi.advanceTimersByTimeAsync(30000);

      expect(limiter.getRemainingTokens('test')).toBeCloseTo(3, 1);
    });

    it('should not exceed capacity when refilling', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 6 },
      });

      // Wait long time to ensure refill doesn't exceed capacity
      await vi.advanceTimersByTimeAsync(120000); // 2 minutes

      expect(limiter.getRemainingTokens('test')).toBe(6);
    });
  });

  describe('FIFO Queue Processing', () => {
    it('should process queued requests in FIFO order', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 1 },
      });

      const order: number[] = [];

      // Consume the only token
      await limiter.waitForSlot('test');

      // Queue 3 requests
      const p1 = limiter.waitForSlot('test').then(() => order.push(1));
      const p2 = limiter.waitForSlot('test').then(() => order.push(2));
      const p3 = limiter.waitForSlot('test').then(() => order.push(3));

      // Advance time to allow all tokens to refill
      await vi.advanceTimersByTimeAsync(30000);

      await Promise.all([p1, p2, p3]);

      expect(order).toEqual([1, 2, 3]); // FIFO order
    });

    it('should handle concurrent requests from multiple callers', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 10, burstLimit: 2 },
      });

      const results: number[] = [];

      // Create 10 concurrent requests
      const promises = Array.from({ length: 10 }, async (_, i) => {
        await limiter.waitForSlot('test');
        results.push(i);
      });

      // First 2 should execute immediately
      await Promise.all(promises.slice(0, 2));
      expect(results).toHaveLength(2);

      // Advance time for remaining requests
      await vi.advanceTimersByTimeAsync(60000);

      await Promise.all(promises);
      expect(results).toHaveLength(10);
    });
  });

  describe('Rate Limit Configurations', () => {
    it('should handle strict rate limit (1 req per 10s)', async () => {
      const limiter = new RateLimiter({
        test: {
          requestsPerMinute: 6,
          intervalSeconds: 10,
          burstLimit: 1,
        },
      });

      // First request
      await limiter.waitForSlot('test');
      expect(limiter.getRemainingTokens('test')).toBe(0);

      // Second request queued
      const p1 = limiter.waitForSlot('test');

      // Advance 9 seconds - not enough
      await vi.advanceTimersByTimeAsync(9000);

      // Advance 1 more second - total 10s, should resolve
      await vi.advanceTimersByTimeAsync(1000);
      await p1;

      expect(limiter.getRemainingTokens('test')).toBe(0);
    });

    it('should handle burst limits correctly', async () => {
      const limiter = new RateLimiter({
        test: {
          requestsPerMinute: 6,
          burstLimit: 10, // Can burst 10 rapid requests
        },
      });

      // Should allow 10 rapid requests (burst)
      for (let i = 0; i < 10; i++) {
        await limiter.waitForSlot('test');
      }

      expect(limiter.getRemainingTokens('test')).toBe(0);
      expect(limiter.canProceed('test')).toBe(false);

      // 11th request should queue
      const p1 = limiter.waitForSlot('test');

      await vi.advanceTimersByTimeAsync(10000); // Wait for refill

      await p1;
    });

    it('should handle very strict limits (1 req per 2 minutes)', async () => {
      const limiter = new RateLimiter({
        test: {
          requestsPerMinute: 0.5, // 1 req per 2 minutes
          intervalSeconds: 120,
          burstLimit: 1,
        },
      });

      await limiter.waitForSlot('test');
      expect(limiter.getRemainingTokens('test')).toBe(0);

      const p1 = limiter.waitForSlot('test');

      // Need to wait 120 seconds for next token
      await vi.advanceTimersByTimeAsync(120000);
      await p1;

      expect(limiter.getRemainingTokens('test')).toBe(0);
    });
  });

  describe('Configuration Methods', () => {
    it('should allow dynamic configuration', () => {
      const limiter = new RateLimiter();

      limiter.configure('test', {
        requestsPerMinute: 10,
        burstLimit: 5,
      });

      expect(limiter.getConfiguration('test')).toEqual({
        requestsPerMinute: 10,
        burstLimit: 5,
      });
    });

    it('should reset bucket when configuration changed', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 6 },
      });

      // Consume some tokens
      await limiter.waitForSlot('test');
      await limiter.waitForSlot('test');
      expect(limiter.getRemainingTokens('test')).toBe(4);

      // Reconfigure (should reset bucket)
      limiter.configure('test', { requestsPerMinute: 10 });

      // Should have full capacity again
      expect(limiter.getRemainingTokens('test')).toBe(10);
    });

    it('should return undefined for unconfigured endpoints', () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 10 },
      });

      expect(limiter.getConfiguration('unconfigured')).toBeUndefined();
    });
  });

  describe('Monitoring Methods', () => {
    it('should report remaining tokens accurately', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 6 },
      });

      expect(limiter.getRemainingTokens('test')).toBe(6);

      await limiter.waitForSlot('test');
      expect(limiter.getRemainingTokens('test')).toBe(5);

      await limiter.waitForSlot('test');
      expect(limiter.getRemainingTokens('test')).toBe(4);
    });

    it('should indicate when requests can proceed', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 1 },
      });

      expect(limiter.canProceed('test')).toBe(true);

      await limiter.waitForSlot('test');
      expect(limiter.canProceed('test')).toBe(false);

      await vi.advanceTimersByTimeAsync(10000);
      expect(limiter.canProceed('test')).toBe(true);
    });
  });

  describe('Reset Functionality', () => {
    it('should reset specific endpoint', async () => {
      const limiter = new RateLimiter({
        test1: { requestsPerMinute: 6 },
        test2: { requestsPerMinute: 10 },
      });

      await limiter.waitForSlot('test1');
      await limiter.waitForSlot('test2');

      limiter.reset('test1');

      // test1 should be reset to full capacity
      expect(limiter.getRemainingTokens('test1')).toBe(6);
      // test2 should still have consumed token
      expect(limiter.getRemainingTokens('test2')).toBe(9);
    });

    it('should reset all endpoints when no key provided', async () => {
      const limiter = new RateLimiter({
        test1: { requestsPerMinute: 6 },
        test2: { requestsPerMinute: 10 },
      });

      await limiter.waitForSlot('test1');
      await limiter.waitForSlot('test2');

      limiter.reset();

      // Both should be reset
      expect(limiter.getRemainingTokens('test1')).toBe(6);
      expect(limiter.getRemainingTokens('test2')).toBe(10);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty configuration', () => {
      const limiter = new RateLimiter();

      expect(limiter.getRemainingTokens('any')).toBe(Infinity);
      expect(limiter.canProceed('any')).toBe(true);
      expect(limiter.getConfiguration('any')).toBeUndefined();
    });

    it('should handle multiple endpoints independently', async () => {
      const limiter = new RateLimiter({
        endpoint1: { requestsPerMinute: 6, burstLimit: 1 },
        endpoint2: { requestsPerMinute: 10, burstLimit: 2 },
      });

      await limiter.waitForSlot('endpoint1');
      expect(limiter.getRemainingTokens('endpoint1')).toBe(0);
      expect(limiter.getRemainingTokens('endpoint2')).toBe(2);

      await limiter.waitForSlot('endpoint2');
      expect(limiter.getRemainingTokens('endpoint1')).toBe(0);
      expect(limiter.getRemainingTokens('endpoint2')).toBe(1);
    });

    it('should handle rapid successive requests', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 60, burstLimit: 10 },
      });

      const promises = Array.from({ length: 20 }, () => limiter.waitForSlot('test'));

      // First 10 immediate (burst)
      await Promise.all(promises.slice(0, 10));
      expect(limiter.getRemainingTokens('test')).toBe(0);

      // Remaining 10 queued
      await vi.advanceTimersByTimeAsync(10000);
      await Promise.all(promises.slice(10));
    });
  });
});

// ============================================================================
// applyBasicTokenMultipliers
// ============================================================================

import { applyBasicTokenMultipliers } from '../../../src/config/rate-limits';

describe('applyBasicTokenMultipliers', () => {
  const sampleLimits = {
    'general.ping': { requestsPerMinute: 6, intervalSeconds: 10, burstLimit: 3 },
    'orders-fbs.getOrders': { requestsPerMinute: 300, intervalSeconds: 0.2, burstLimit: 20 },
    'analytics.postReport': { requestsPerMinute: 3, intervalSeconds: 20, burstLimit: 3 },
    'promotion.getCampaigns': { requestsPerMinute: 5, intervalSeconds: 12, burstLimit: 5 },
  };

  it('should reduce requestsPerMinute by category multiplier', () => {
    const result = applyBasicTokenMultipliers(sampleLimits);

    // general: 6 * 0.001 = 0.006 → ceil → 1 (min 1)
    expect(result['general.ping'].requestsPerMinute).toBe(1);

    // orders-fbs: 300 * 0.003 = 0.9 → ceil → 1
    expect(result['orders-fbs.getOrders'].requestsPerMinute).toBe(1);

    // analytics: 3 * 0.05 = 0.15 → ceil → 1
    expect(result['analytics.postReport'].requestsPerMinute).toBe(1);

    // promotion: 5 * 0.02 = 0.1 → ceil → 1
    expect(result['promotion.getCampaigns'].requestsPerMinute).toBe(1);
  });

  it('should set burst limit to 1 for all endpoints', () => {
    const result = applyBasicTokenMultipliers(sampleLimits);

    expect(result['general.ping'].burstLimit).toBe(1);
    expect(result['orders-fbs.getOrders'].burstLimit).toBe(1);
    expect(result['analytics.postReport'].burstLimit).toBe(1);
    expect(result['promotion.getCampaigns'].burstLimit).toBe(1);
  });

  it('should preserve intervalSeconds and penaltyMultiplier', () => {
    const limitsWithPenalty = {
      'orders-fbw.getClientInfo': {
        requestsPerMinute: 300,
        intervalSeconds: 0.2,
        burstLimit: 20,
        penaltyMultiplier: 10,
      },
    };
    const result = applyBasicTokenMultipliers(limitsWithPenalty);

    expect(result['orders-fbw.getClientInfo'].intervalSeconds).toBe(0.2);
    expect(result['orders-fbw.getClientInfo'].penaltyMultiplier).toBe(10);
  });

  it('should use default multiplier for unknown categories', () => {
    const unknownLimits = {
      'unknown-module.method': { requestsPerMinute: 100, burstLimit: 10 },
    };
    const result = applyBasicTokenMultipliers(unknownLimits);

    // default: 100 * 0.01 = 1
    expect(result['unknown-module.method'].requestsPerMinute).toBe(1);
    expect(result['unknown-module.method'].burstLimit).toBe(1);
  });

  it('should not modify the original limits object', () => {
    const original = { 'general.ping': { requestsPerMinute: 6, burstLimit: 3 } };
    applyBasicTokenMultipliers(original);

    expect(original['general.ping'].requestsPerMinute).toBe(6);
    expect(original['general.ping'].burstLimit).toBe(3);
  });

  it('should guarantee minimum 1 requestsPerMinute', () => {
    const tinyLimits = {
      'general.sellerInfo': { requestsPerMinute: 1, burstLimit: 10 },
    };
    const result = applyBasicTokenMultipliers(tinyLimits);

    // 1 * 0.001 = 0.001 → ceil → 1 (Math.max(1, ...))
    expect(result['general.sellerInfo'].requestsPerMinute).toBe(1);
  });
});
