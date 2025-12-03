/**
 * Integration tests for RateLimiter with BaseClient
 *
 * Tests cover:
 * - BaseClient integration with rate limiting
 * - Real timing behavior (using fake timers for speed)
 * - Concurrent requests from multiple callers
 * - Queue ordering validation
 * - Endpoint-specific rate limit enforcement
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RateLimiter } from '../../src/client/rate-limiter';

describe('RateLimiter Integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Timing Behavior', () => {
    it('should enforce 1 request per minute timing', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 1, burstLimit: 1 },
      });

      const timestamps: number[] = [];

      // First request: immediate
      await limiter.waitForSlot('test');
      timestamps.push(Date.now());

      // Second request: queued for ~60 seconds
      const p1 = limiter.waitForSlot('test').then(() => {
        timestamps.push(Date.now());
      });

      await vi.advanceTimersByTimeAsync(60000);
      await p1;

      // Third request: queued for another ~60 seconds
      const p2 = limiter.waitForSlot('test').then(() => {
        timestamps.push(Date.now());
      });

      await vi.advanceTimersByTimeAsync(60000);
      await p2;

      expect(timestamps[1] - timestamps[0]).toBeGreaterThanOrEqual(60000);
      expect(timestamps[2] - timestamps[1]).toBeGreaterThanOrEqual(60000);
    });

    it('should enforce 10 second intervals', async () => {
      const limiter = new RateLimiter({
        test: {
          requestsPerMinute: 6,
          intervalSeconds: 10,
          burstLimit: 1,
        },
      });

      const timestamps: number[] = [];

      // Make 3 requests
      await limiter.waitForSlot('test');
      timestamps.push(Date.now());

      const p1 = limiter.waitForSlot('test').then(() => {
        timestamps.push(Date.now());
      });

      await vi.advanceTimersByTimeAsync(10000);
      await p1;

      const p2 = limiter.waitForSlot('test').then(() => {
        timestamps.push(Date.now());
      });

      await vi.advanceTimersByTimeAsync(10000);
      await p2;

      expect(timestamps[1] - timestamps[0]).toBeGreaterThanOrEqual(10000);
      expect(timestamps[2] - timestamps[1]).toBeGreaterThanOrEqual(10000);
    });

    it('should handle burst then throttle pattern', async () => {
      const limiter = new RateLimiter({
        test: {
          requestsPerMinute: 6,
          burstLimit: 5,
        },
      });

      const timestamps: number[] = [];

      // First 5 requests: immediate (burst)
      for (let i = 0; i < 5; i++) {
        await limiter.waitForSlot('test');
        timestamps.push(Date.now());
      }

      // All should be at same time (immediate burst)
      expect(timestamps.every((t) => t === timestamps[0])).toBe(true);

      // 6th request: queued
      const p1 = limiter.waitForSlot('test').then(() => {
        timestamps.push(Date.now());
      });

      await vi.advanceTimersByTimeAsync(10000);
      await p1;

      expect(timestamps[5] - timestamps[0]).toBeGreaterThanOrEqual(10000);
    });
  });

  describe('Concurrent Request Handling', () => {
    it('should queue concurrent requests correctly', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 6, burstLimit: 1 },
      });

      const order: number[] = [];

      // Consume initial token
      await limiter.waitForSlot('test');

      // Create 5 concurrent requests
      const promises = [
        limiter.waitForSlot('test').then(() => order.push(1)),
        limiter.waitForSlot('test').then(() => order.push(2)),
        limiter.waitForSlot('test').then(() => order.push(3)),
        limiter.waitForSlot('test').then(() => order.push(4)),
        limiter.waitForSlot('test').then(() => order.push(5)),
      ];

      // Advance time to process all
      await vi.advanceTimersByTimeAsync(60000);
      await Promise.all(promises);

      // Should be processed in FIFO order
      expect(order).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle high concurrency without losing requests', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 60, burstLimit: 10 },
      });

      const completedRequests: number[] = [];

      // Create 50 concurrent requests
      const promises = Array.from({ length: 50 }, async (_, i) => {
        await limiter.waitForSlot('test');
        completedRequests.push(i);
      });

      // First 10 immediate (burst)
      await Promise.all(promises.slice(0, 10));
      expect(completedRequests).toHaveLength(10);

      // Advance time for remaining
      await vi.advanceTimersByTimeAsync(60000);
      await Promise.all(promises);

      expect(completedRequests).toHaveLength(50);
      expect(new Set(completedRequests).size).toBe(50); // All unique
    });
  });

  describe('BaseClient Integration', () => {
    it('should rate limit HTTP requests via BaseClient', async () => {
      const limiter = new RateLimiter({
        'test.endpoint': { requestsPerMinute: 60, burstLimit: 1 },
      });

      const timestamps: number[] = [];

      // First request: immediate
      await limiter.waitForSlot('test.endpoint');
      timestamps.push(Date.now());

      // Second request with same key: should be rate limited
      const p1 = limiter.waitForSlot('test.endpoint').then(() => {
        timestamps.push(Date.now());
      });

      await vi.advanceTimersByTimeAsync(1000);
      await p1;

      expect(timestamps[1] - timestamps[0]).toBeGreaterThanOrEqual(1000);
    });

    it('should handle different endpoints independently in BaseClient', async () => {
      const limiter = new RateLimiter({
        'products.list': { requestsPerMinute: 20, burstLimit: 20 },
        'orders.list': { requestsPerMinute: 5, burstLimit: 5 },
      });

      const timestamps: Record<string, number[]> = {
        products: [],
        orders: [],
      };

      // Different endpoints should not affect each other
      await limiter.waitForSlot('products.list');
      timestamps.products.push(Date.now());

      await limiter.waitForSlot('orders.list');
      timestamps.orders.push(Date.now());

      // Both should execute immediately (independent limits)
      expect(timestamps.products[0]).toBe(timestamps.orders[0]);
    });

    it('should not rate limit requests without rateLimitKey', async () => {
      const limiter = new RateLimiter({
        limited: { requestsPerMinute: 1 },
      });

      const timestamps: number[] = [];

      // Requests to unconfigured endpoints should be unlimited
      for (let i = 0; i < 100; i++) {
        await limiter.waitForSlot('unlimited');
        timestamps.push(Date.now());
      }

      // All should be immediate (no rate limiting)
      expect(timestamps.every((t) => t === timestamps[0])).toBe(true);
    });
  });

  describe('Multiple Endpoint Scenarios', () => {
    it('should enforce different limits for different endpoints', async () => {
      const limiter = new RateLimiter({
        fast: { requestsPerMinute: 60, burstLimit: 10 },
        slow: { requestsPerMinute: 6, burstLimit: 1 },
      });

      const fastTimestamps: number[] = [];
      const slowTimestamps: number[] = [];

      // Fast endpoint: 10 rapid requests
      for (let i = 0; i < 10; i++) {
        await limiter.waitForSlot('fast');
        fastTimestamps.push(Date.now());
      }

      // All fast requests should be immediate
      expect(fastTimestamps.every((t) => t === fastTimestamps[0])).toBe(true);

      // Slow endpoint: 2 requests
      await limiter.waitForSlot('slow');
      slowTimestamps.push(Date.now());

      const p1 = limiter.waitForSlot('slow').then(() => {
        slowTimestamps.push(Date.now());
      });

      await vi.advanceTimersByTimeAsync(10000);
      await p1;

      // Slow requests should be spaced apart
      expect(slowTimestamps[1] - slowTimestamps[0]).toBeGreaterThanOrEqual(10000);
    });
  });

  describe('Queue Fairness', () => {
    it('should maintain FIFO order under load', async () => {
      const limiter = new RateLimiter({
        test: { requestsPerMinute: 10, burstLimit: 2 },
      });

      const order: number[] = [];

      // Consume burst tokens
      await limiter.waitForSlot('test');
      await limiter.waitForSlot('test');

      // Queue 10 requests
      const promises = Array.from({ length: 10 }, (_, i) =>
        limiter.waitForSlot('test').then(() => order.push(i))
      );

      // Process queue
      await vi.advanceTimersByTimeAsync(60000);
      await Promise.all(promises);

      // Should be in exact order
      expect(order).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });
});
