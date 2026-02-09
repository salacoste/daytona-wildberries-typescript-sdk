/**
 * TDD RED-PHASE Tests for Task-54: Minus Phrases Methods
 *
 * Tests verify:
 * - getMinusPhrases method exists and calls POST /adv/v0/normquery/get-minus
 * - setMinusPhrases method exists and calls POST /adv/v0/normquery/set-minus
 * - Proper request/response types: GetMinusPhrasesRequest, SetMinusPhrasesRequest
 * - rateLimitKey is passed for both methods
 * - Empty norm_queries array removes all minus phrases
 *
 * Expected: ALL tests FAIL in RED phase until task-54 is implemented
 *
 * Run with: npx vitest run tests/tdd/promotion-minusPhrases.tdd.test.ts --config /dev/null --reporter verbose
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromotionModule } from '../../src/modules/promotion';
import type { BaseClient } from '../../src/client/base-client';
import * as PromotionTypes from '../../src/types/promotion.types';

describe('Task-54: Minus Phrases Methods (EPIC: Search Clusters)', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: PromotionModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn().mockResolvedValue({ items: [] }),
      post: vi.fn().mockResolvedValue({ items: [] }),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new PromotionModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: getMinusPhrases method exists and calls POST /adv/v0/normquery/get-minus', () => {
    it('should have getMinusPhrases method', () => {
      expect(typeof module.getMinusPhrases).toBe('function');
    });

    it('should call POST /adv/v0/normquery/get-minus with correct URL', async () => {
      const request = {
        items: [{ advert_id: 123456, nm_id: 789012 }],
      };

      await module.getMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/get-minus',
        expect.anything(),
        expect.anything()
      );
    });

    it('should pass request body with items array', async () => {
      const request = {
        items: [
          { advert_id: 1825035, nm_id: 983512347 },
          { advert_id: 1825036, nm_id: 983512348 },
        ],
      };

      await module.getMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(expect.any(String), request, expect.anything());
    });

    it('should include rateLimitKey in options', async () => {
      const request = {
        items: [{ advert_id: 123, nm_id: 456 }],
      };

      await module.getMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.any(String),
        })
      );
    });

    it('should return response with items containing minus phrases', async () => {
      const mockResponse = {
        items: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            norm_queries: ['Фраза 1', 'Фраза 2'],
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getMinusPhrases({
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result).toEqual(mockResponse);
      expect(result.items[0].norm_queries).toContain('Фраза 1');
    });
  });

  describe('AC #2: setMinusPhrases method exists and calls POST /adv/v0/normquery/set-minus', () => {
    it('should have setMinusPhrases method', () => {
      expect(typeof module.setMinusPhrases).toBe('function');
    });

    it('should call POST /adv/v0/normquery/set-minus with correct URL', async () => {
      const request = {
        advert_id: 1825035,
        nm_id: 983512347,
        norm_queries: ['Фраза 1'],
      };

      await module.setMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/set-minus',
        expect.anything(),
        expect.anything()
      );
    });

    it('should pass request body with advert_id, nm_id, and norm_queries', async () => {
      const request = {
        advert_id: 1825035,
        nm_id: 983512347,
        norm_queries: ['нежелательная фраза', 'другая фраза'],
      };

      await module.setMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(expect.any(String), request, expect.anything());
    });

    it('should include rateLimitKey in options', async () => {
      const request = {
        advert_id: 123,
        nm_id: 456,
        norm_queries: ['test'],
      };

      await module.setMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.any(String),
        })
      );
    });

    it('should return void on success (200 response)', async () => {
      mockClient.post.mockResolvedValue(undefined);

      const result = await module.setMinusPhrases({
        advert_id: 1825035,
        nm_id: 983512347,
        norm_queries: ['test phrase'],
      });

      // setMinusPhrases returns void on success
      expect(result).toBeUndefined();
    });
  });

  describe('AC #3: Request types: GetMinusPhrasesRequest, SetMinusPhrasesRequest', () => {
    it('should export GetMinusPhrasesRequest type with items array', () => {
      // Type should have items array with max 100 items
      expect(PromotionTypes).toHaveProperty('GetMinusPhrasesRequest');
    });

    it('should export GetMinusPhrasesRequestItem type', () => {
      // Each item should have advert_id and nm_id
      expect(PromotionTypes).toHaveProperty('GetMinusPhrasesRequestItem');
    });

    it('should export GetMinusPhrasesResponse type', () => {
      expect(PromotionTypes).toHaveProperty('GetMinusPhrasesResponse');
    });

    it('should export GetMinusPhrasesResponseItem type', () => {
      expect(PromotionTypes).toHaveProperty('GetMinusPhrasesResponseItem');
    });

    it('should export SetMinusPhrasesRequest type with advert_id, nm_id, norm_queries', () => {
      // Request type should have: advert_id (number), nm_id (number), norm_queries (string[], max 1000)
      expect(PromotionTypes).toHaveProperty('SetMinusPhrasesRequest');
    });
  });

  describe('AC #4-5: JSDoc documentation (verified by method existence and code inspection)', () => {
    // JSDoc verification is done through code review
    // These tests verify the methods exist with proper documentation
    it('setMinusPhrases JSDoc should warn about empty array removing all minus phrases', () => {
      // This is verified by code inspection - method should have JSDoc comment
      expect(typeof module.setMinusPhrases).toBe('function');
    });

    it('both methods should document nm_id differences for Type 8 vs Type 9 campaigns', () => {
      // Type 8 campaigns: nm_id=0 for campaign-wide settings
      // Type 9 campaigns: nm_id = actual WB article ID
      expect(typeof module.getMinusPhrases).toBe('function');
      expect(typeof module.setMinusPhrases).toBe('function');
    });
  });

  describe('AC #6: Rate limit for both methods (5 req/sec, 200ms interval, burst 10)', () => {
    it('getMinusPhrases should have rateLimitKey configured', async () => {
      await module.getMinusPhrases({ items: [{ advert_id: 1, nm_id: 2 }] });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringMatching(/getMinusPhrases|normquery/i),
        })
      );
    });

    it('setMinusPhrases should have rateLimitKey configured', async () => {
      await module.setMinusPhrases({
        advert_id: 1,
        nm_id: 2,
        norm_queries: [],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringMatching(/setMinusPhrases|normquery/i),
        })
      );
    });
  });

  describe('AC #7-8: Unit tests for getting/setting minus phrases (edge cases)', () => {
    it('should handle campaign with no minus phrases', async () => {
      const mockResponse = {
        items: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            norm_queries: [],
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getMinusPhrases({
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.items[0].norm_queries).toEqual([]);
    });

    it('should handle multiple items in single request (max 100)', async () => {
      const items = Array.from({ length: 100 }, (_, i) => ({
        advert_id: 1000 + i,
        nm_id: 2000 + i,
      }));

      await module.getMinusPhrases({ items });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        { items },
        expect.anything()
      );
    });

    it('should support removing all minus phrases with empty array', async () => {
      // IMPORTANT: Empty norm_queries array REMOVES ALL minus phrases!
      const request = {
        advert_id: 1825035,
        nm_id: 983512347,
        norm_queries: [], // Empty array = remove all
      };

      await module.setMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(expect.any(String), request, expect.anything());
    });

    it('should handle setting multiple minus phrases (max 1000)', async () => {
      const phrases = Array.from({ length: 1000 }, (_, i) => `phrase_${i}`);
      const request = {
        advert_id: 1825035,
        nm_id: 983512347,
        norm_queries: phrases,
      };

      await module.setMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(expect.any(String), request, expect.anything());
    });

    it('should handle Type 8 campaign with nm_id=0', async () => {
      // Type 8 campaigns use nm_id=0 for aggregate campaign settings
      const request = {
        items: [{ advert_id: 1825035, nm_id: 0 }],
      };

      await module.getMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(expect.any(String), request, expect.anything());
    });

    it('should handle Type 9 campaign with real nm_id', async () => {
      // Type 9 campaigns require actual article IDs
      const request = {
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      };

      await module.getMinusPhrases(request);

      expect(mockClient.post).toHaveBeenCalledWith(expect.any(String), request, expect.anything());
    });
  });
});
