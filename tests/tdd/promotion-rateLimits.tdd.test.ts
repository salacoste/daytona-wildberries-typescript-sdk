/**
 * TDD RED-PHASE Tests for task-56: Rate Limits Configuration
 *
 * Tests verify: All 6 new/updated endpoints have correct rate limit configuration
 * in promotion-rate-limits.ts with proper requestsPerMinute, intervalSeconds, and burstLimit.
 *
 * Expected: Tests may FAIL if rate limit keys don't match rateLimitKey values in module methods
 * or if config values don't match the documented API limits.
 *
 * @see backlog/tasks/task-56 - Обновить-конфигурацию-rate-limits-для-Promotion-модуля.md
 */

import { describe, it, expect } from 'vitest';
import { promotionRateLimits } from '../../src/config/promotion-rate-limits';

describe('EPIC: Promotion Rate Limits (task-56)', () => {
  describe('AC #1: All 6 new/updated endpoints have entries in promotion-rate-limits.ts', () => {
    it('should have config entry for getAdvertsV2', () => {
      // The key must match rateLimitKey in module: 'promotion.advertsV2'
      expect(promotionRateLimits).toHaveProperty('promotion.advertsV2');
    });

    it('should have config entry for updateBids (V1 API)', () => {
      // Based on module: rateLimitKey: 'promotion.bidsV1'
      expect(promotionRateLimits).toHaveProperty('promotion.bidsV1');
    });

    it('should have config entry for updateCampaignProducts', () => {
      // Based on module: rateLimitKey: 'promotion.patchAdvAuctionNms'
      expect(promotionRateLimits).toHaveProperty('promotion.patchAdvAuctionNms');
    });

    it('should have config entry for getMinusPhrases', () => {
      // Based on module: rateLimitKey: 'promotion.normqueryGetMinus'
      expect(promotionRateLimits).toHaveProperty('promotion.normqueryGetMinus');
    });

    it('should have config entry for setMinusPhrases', () => {
      // Based on module: rateLimitKey: 'promotion.normquerySetMinus'
      expect(promotionRateLimits).toHaveProperty('promotion.normquerySetMinus');
    });

    it('should have config entry for getSearchClusterStats', () => {
      // Based on module: rateLimitKey: 'promotion.normqueryStats'
      expect(promotionRateLimits).toHaveProperty('promotion.normqueryStats');
    });
  });

  describe('AC #2: getAdvertsV2 rate limit config', () => {
    it('should have requestsPerMinute: 300', () => {
      expect(promotionRateLimits['promotion.advertsV2']).toBeDefined();
      expect(promotionRateLimits['promotion.advertsV2'].requestsPerMinute).toBe(300);
    });

    it('should have intervalSeconds: 0.2 (200ms)', () => {
      expect(promotionRateLimits['promotion.advertsV2'].intervalSeconds).toBe(0.2);
    });

    it('should have burstLimit: 5', () => {
      expect(promotionRateLimits['promotion.advertsV2'].burstLimit).toBe(5);
    });

    it('should match documented rate limit exactly', () => {
      expect(promotionRateLimits['promotion.advertsV2']).toEqual({
        requestsPerMinute: 300,
        intervalSeconds: 0.2,
        burstLimit: 5,
      });
    });
  });

  describe('AC #3: updateBids rate limit config', () => {
    it('should have requestsPerMinute: 300', () => {
      expect(promotionRateLimits['promotion.bidsV1']).toBeDefined();
      expect(promotionRateLimits['promotion.bidsV1'].requestsPerMinute).toBe(300);
    });

    it('should have intervalSeconds: 0.2 (200ms)', () => {
      expect(promotionRateLimits['promotion.bidsV1'].intervalSeconds).toBe(0.2);
    });

    it('should have burstLimit: 10', () => {
      // Task specifies burstLimit 10, but current config may have 5
      expect(promotionRateLimits['promotion.bidsV1'].burstLimit).toBe(10);
    });

    it('should match documented rate limit exactly', () => {
      expect(promotionRateLimits['promotion.bidsV1']).toEqual({
        requestsPerMinute: 300,
        intervalSeconds: 0.2,
        burstLimit: 10,
      });
    });
  });

  describe('AC #4: updateCampaignProducts rate limit config', () => {
    it('should have requestsPerMinute: 60', () => {
      expect(promotionRateLimits['promotion.patchAdvAuctionNms']).toBeDefined();
      expect(promotionRateLimits['promotion.patchAdvAuctionNms'].requestsPerMinute).toBe(60);
    });

    it('should have intervalSeconds: 1', () => {
      expect(promotionRateLimits['promotion.patchAdvAuctionNms'].intervalSeconds).toBe(1);
    });

    it('should not require burstLimit (or have default)', () => {
      // Task says "- " for burst, meaning no specific requirement
      // Should either not have burstLimit or have a reasonable default
      const config = promotionRateLimits['promotion.patchAdvAuctionNms'];
      expect(config.requestsPerMinute).toBe(60);
      expect(config.intervalSeconds).toBe(1);
    });
  });

  describe('AC #5: getMinusPhrases rate limit config', () => {
    it('should have requestsPerMinute: 300', () => {
      expect(promotionRateLimits['promotion.normqueryGetMinus']).toBeDefined();
      expect(promotionRateLimits['promotion.normqueryGetMinus'].requestsPerMinute).toBe(300);
    });

    it('should have intervalSeconds: 0.2 (200ms)', () => {
      expect(promotionRateLimits['promotion.normqueryGetMinus'].intervalSeconds).toBe(0.2);
    });

    it('should have burstLimit: 10', () => {
      expect(promotionRateLimits['promotion.normqueryGetMinus'].burstLimit).toBe(10);
    });

    it('should match documented rate limit exactly', () => {
      expect(promotionRateLimits['promotion.normqueryGetMinus']).toEqual({
        requestsPerMinute: 300,
        intervalSeconds: 0.2,
        burstLimit: 10,
      });
    });
  });

  describe('AC #6: setMinusPhrases rate limit config', () => {
    it('should have requestsPerMinute: 300', () => {
      expect(promotionRateLimits['promotion.normquerySetMinus']).toBeDefined();
      expect(promotionRateLimits['promotion.normquerySetMinus'].requestsPerMinute).toBe(300);
    });

    it('should have intervalSeconds: 0.2 (200ms)', () => {
      expect(promotionRateLimits['promotion.normquerySetMinus'].intervalSeconds).toBe(0.2);
    });

    it('should have burstLimit: 10', () => {
      expect(promotionRateLimits['promotion.normquerySetMinus'].burstLimit).toBe(10);
    });

    it('should match documented rate limit exactly', () => {
      expect(promotionRateLimits['promotion.normquerySetMinus']).toEqual({
        requestsPerMinute: 300,
        intervalSeconds: 0.2,
        burstLimit: 10,
      });
    });
  });

  describe('AC #7: getSearchClusterStats rate limit config', () => {
    it('should have requestsPerMinute: 10', () => {
      expect(promotionRateLimits['promotion.normqueryStats']).toBeDefined();
      expect(promotionRateLimits['promotion.normqueryStats'].requestsPerMinute).toBe(10);
    });

    it('should have intervalSeconds: 6', () => {
      expect(promotionRateLimits['promotion.normqueryStats'].intervalSeconds).toBe(6);
    });

    it('should have burstLimit: 20', () => {
      expect(promotionRateLimits['promotion.normqueryStats'].burstLimit).toBe(20);
    });

    it('should match documented rate limit exactly', () => {
      expect(promotionRateLimits['promotion.normqueryStats']).toEqual({
        requestsPerMinute: 10,
        intervalSeconds: 6,
        burstLimit: 20,
      });
    });
  });

  describe('AC #8: Keys in config match rateLimitKey in module methods', () => {
    it('advertsV2 key should match module rateLimitKey exactly', () => {
      // Module uses: rateLimitKey: 'promotion.advertsV2'
      expect(promotionRateLimits['promotion.advertsV2']).toBeDefined();
    });

    it('bidsV1 key should match module rateLimitKey exactly', () => {
      // Module uses: rateLimitKey: 'promotion.bidsV1'
      expect(promotionRateLimits['promotion.bidsV1']).toBeDefined();
    });

    it('normqueryGetMinus key should match module rateLimitKey exactly', () => {
      // Module uses: rateLimitKey: 'promotion.normqueryGetMinus'
      expect(promotionRateLimits['promotion.normqueryGetMinus']).toBeDefined();
    });

    it('normquerySetMinus key should match module rateLimitKey exactly', () => {
      // Module uses: rateLimitKey: 'promotion.normquerySetMinus'
      expect(promotionRateLimits['promotion.normquerySetMinus']).toBeDefined();
    });

    it('normqueryStats key should match module rateLimitKey exactly', () => {
      // Module uses: rateLimitKey: 'promotion.normqueryStats'
      expect(promotionRateLimits['promotion.normqueryStats']).toBeDefined();
    });

    it('patchAdvAuctionNms key should match module rateLimitKey exactly', () => {
      // Module uses: rateLimitKey: 'promotion.patchAdvAuctionNms'
      expect(promotionRateLimits['promotion.patchAdvAuctionNms']).toBeDefined();
    });
  });

  describe('Rate limit sanity checks', () => {
    it('all rate limit entries should have valid requestsPerMinute', () => {
      for (const [key, config] of Object.entries(promotionRateLimits)) {
        expect(config.requestsPerMinute).toBeGreaterThan(0);
        expect(typeof config.requestsPerMinute).toBe('number');
      }
    });

    it('all rate limit entries should have valid intervalSeconds', () => {
      for (const [key, config] of Object.entries(promotionRateLimits)) {
        expect(config.intervalSeconds).toBeGreaterThan(0);
        expect(typeof config.intervalSeconds).toBe('number');
      }
    });

    it('intervalSeconds should be consistent with requestsPerMinute', () => {
      for (const [key, config] of Object.entries(promotionRateLimits)) {
        // intervalSeconds * requestsPerMinute should roughly equal 60
        // Allow for some rounding variance
        const product = config.intervalSeconds * config.requestsPerMinute;
        // Should be approximately 60 (the number of seconds in a minute)
        expect(product).toBeGreaterThanOrEqual(1);
        expect(product).toBeLessThanOrEqual(120);
      }
    });
  });
});
