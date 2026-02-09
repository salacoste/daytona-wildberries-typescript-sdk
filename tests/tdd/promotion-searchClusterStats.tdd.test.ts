/**
 * TDD RED-PHASE Tests for Task-55: Search Cluster Statistics Method
 *
 * Tests verify:
 * - getSearchClusterStats method exists and calls POST /adv/v0/normquery/stats
 * - Request contains: from (YYYY-MM-DD), to (YYYY-MM-DD), items array
 * - Response contains: stats array with advert_id, nm_id, nested stats[]
 * - Nested stats has: norm_query, views, clicks, atbs, orders, ctr, cpc, cpm, avg_pos
 * - rateLimitKey is passed
 *
 * Expected: ALL tests FAIL in RED phase until task-55 is implemented
 *
 * Run with: npx vitest run tests/tdd/promotion-searchClusterStats.tdd.test.ts --config /dev/null --reporter verbose
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromotionModule } from '../../src/modules/promotion';
import type { BaseClient } from '../../src/client/base-client';
import * as PromotionTypes from '../../src/types/promotion.types';

describe('Task-55: Search Cluster Statistics Method (EPIC: Statistics)', () => {
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
      get: vi.fn().mockResolvedValue({}),
      post: vi.fn().mockResolvedValue({ stats: [] }),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new PromotionModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: getSearchClusterStats method exists and calls POST /adv/v0/normquery/stats', () => {
    it('should have getSearchClusterStats method', () => {
      expect(typeof module.getSearchClusterStats).toBe('function');
    });

    it('should call POST /adv/v0/normquery/stats with correct URL', async () => {
      const request = {
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 123456, nm_id: 789012 }],
      };

      await module.getSearchClusterStats(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/stats',
        expect.anything(),
        expect.anything()
      );
    });

    it('should include rateLimitKey in options', async () => {
      const request = {
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 123, nm_id: 456 }],
      };

      await module.getSearchClusterStats(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.any(String),
        })
      );
    });
  });

  describe('AC #2: Request contains from (YYYY-MM-DD), to (YYYY-MM-DD), items (max 100)', () => {
    it('should pass from date in YYYY-MM-DD format', async () => {
      const request = {
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      };

      await module.getSearchClusterStats(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          from: '2026-02-01',
        }),
        expect.anything()
      );
    });

    it('should pass to date in YYYY-MM-DD format', async () => {
      const request = {
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      };

      await module.getSearchClusterStats(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          to: '2026-02-09',
        }),
        expect.anything()
      );
    });

    it('should pass items array with advert_id and nm_id', async () => {
      const request = {
        from: '2026-02-01',
        to: '2026-02-09',
        items: [
          { advert_id: 1825035, nm_id: 983512347 },
          { advert_id: 1825036, nm_id: 983512348 },
        ],
      };

      await module.getSearchClusterStats(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          items: expect.arrayContaining([
            expect.objectContaining({ advert_id: 1825035, nm_id: 983512347 }),
            expect.objectContaining({ advert_id: 1825036, nm_id: 983512348 }),
          ]),
        }),
        expect.anything()
      );
    });

    it('should handle max 100 items in request', async () => {
      const items = Array.from({ length: 100 }, (_, i) => ({
        advert_id: 1000 + i,
        nm_id: 2000 + i,
      }));

      const request = {
        from: '2026-02-01',
        to: '2026-02-09',
        items,
      };

      await module.getSearchClusterStats(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          items: expect.any(Array),
        }),
        expect.anything()
      );
      // Verify 100 items were passed
      const calledRequest = mockClient.post.mock.calls[0][1];
      expect(calledRequest.items).toHaveLength(100);
    });
  });

  describe('AC #3: Response contains stats array with advert_id, nm_id, stats[]', () => {
    it('should return response with stats array', async () => {
      const mockResponse = {
        stats: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            stats: [],
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result).toHaveProperty('stats');
      expect(Array.isArray(result.stats)).toBe(true);
    });

    it('should return advert_id in each stats item', async () => {
      const mockResponse = {
        stats: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            stats: [],
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0]).toHaveProperty('advert_id', 1825035);
    });

    it('should return nm_id in each stats item', async () => {
      const mockResponse = {
        stats: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            stats: [],
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0]).toHaveProperty('nm_id', 983512347);
    });

    it('should return nested stats array in each item', async () => {
      const mockResponse = {
        stats: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            stats: [
              {
                norm_query: 'Фраза 1',
                views: 1949,
                clicks: 2090,
                atbs: 68,
                orders: 19,
                ctr: 107.23,
                cpc: 471,
                cpm: 813,
                avg_pos: 3.6,
              },
            ],
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0]).toHaveProperty('stats');
      expect(Array.isArray(result.stats[0].stats)).toBe(true);
    });
  });

  describe('AC #4: Nested stats contains norm_query, views, clicks, atbs, orders, ctr, cpc, cpm, avg_pos', () => {
    const mockStatsItem = {
      norm_query: 'Фраза 1',
      views: 1949,
      clicks: 2090,
      atbs: 68,
      orders: 19,
      ctr: 107.23,
      cpc: 471,
      cpm: 813,
      avg_pos: 3.6,
    };

    const mockResponse = {
      stats: [
        {
          advert_id: 1825035,
          nm_id: 983512347,
          stats: [mockStatsItem],
        },
      ],
    };

    beforeEach(() => {
      mockClient.post.mockResolvedValue(mockResponse);
    });

    it('should return norm_query in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('norm_query', 'Фраза 1');
    });

    it('should return views count in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('views', 1949);
    });

    it('should return clicks count in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('clicks', 2090);
    });

    it('should return atbs (add to basket) count in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('atbs', 68);
    });

    it('should return orders count in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('orders', 19);
    });

    it('should return ctr (click-through rate) in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('ctr', 107.23);
    });

    it('should return cpc (cost per click) in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('cpc', 471);
    });

    it('should return cpm (cost per mille) in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('cpm', 813);
    });

    it('should return avg_pos (average position) in nested stats', async () => {
      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats[0]).toHaveProperty('avg_pos', 3.6);
    });
  });

  describe('AC #5-6: JSDoc documentation (verified by method existence)', () => {
    // JSDoc verification is done through code review
    it('getSearchClusterStats JSDoc should indicate CPM-only (not CPC)', () => {
      // Method should have JSDoc noting: "Only for campaigns with cpm payment model"
      expect(typeof module.getSearchClusterStats).toBe('function');
    });

    it('getSearchClusterStats JSDoc should document nm_id differences for Type 8/9', () => {
      // Type 8: nm_id=0 for aggregate
      // Type 9: actual article IDs
      expect(typeof module.getSearchClusterStats).toBe('function');
    });
  });

  describe('AC #7: Rate limit (10 req/min, 6 sec interval, burst 20)', () => {
    it('should have rateLimitKey for getSearchClusterStats', async () => {
      await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1, nm_id: 2 }],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: expect.stringMatching(/searchClusterStats|normquery/i),
        })
      );
    });
  });

  describe('AC #8: Unit tests for getting statistics (edge cases)', () => {
    it('should handle response with multiple search clusters per item', async () => {
      const mockResponse = {
        stats: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            stats: [
              {
                norm_query: 'Фраза 1',
                views: 1949,
                clicks: 2090,
                atbs: 68,
                orders: 19,
                ctr: 107.23,
                cpc: 471,
                cpm: 813,
                avg_pos: 3.6,
              },
              {
                norm_query: 'Фраза 2',
                views: 500,
                clicks: 100,
                atbs: 20,
                orders: 5,
                ctr: 20.0,
                cpc: 200,
                cpm: 400,
                avg_pos: 5.2,
              },
            ],
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats).toHaveLength(2);
      expect(result.stats[0].stats[0].norm_query).toBe('Фраза 1');
      expect(result.stats[0].stats[1].norm_query).toBe('Фраза 2');
    });

    it('should handle response with empty stats array (no data for period)', async () => {
      const mockResponse = {
        stats: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            stats: [],
          },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      });

      expect(result.stats[0].stats).toEqual([]);
    });

    it('should handle Type 8 campaign with nm_id=0', async () => {
      // Type 8 campaigns may use nm_id=0 for aggregate statistics
      const request = {
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 0 }],
      };

      await module.getSearchClusterStats(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          items: [{ advert_id: 1825035, nm_id: 0 }],
        }),
        expect.anything()
      );
    });

    it('should handle Type 9 campaign with real nm_id', async () => {
      // Type 9 campaigns require actual article IDs
      const request = {
        from: '2026-02-01',
        to: '2026-02-09',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      };

      await module.getSearchClusterStats(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          items: [{ advert_id: 1825035, nm_id: 983512347 }],
        }),
        expect.anything()
      );
    });

    it('should handle multiple items in single request', async () => {
      const mockResponse = {
        stats: [
          { advert_id: 1, nm_id: 10, stats: [] },
          { advert_id: 2, nm_id: 20, stats: [] },
          { advert_id: 3, nm_id: 30, stats: [] },
        ],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getSearchClusterStats({
        from: '2026-02-01',
        to: '2026-02-09',
        items: [
          { advert_id: 1, nm_id: 10 },
          { advert_id: 2, nm_id: 20 },
          { advert_id: 3, nm_id: 30 },
        ],
      });

      expect(result.stats).toHaveLength(3);
    });
  });

  describe('Type exports for Search Cluster Statistics', () => {
    it('should export GetSearchClusterStatsRequest type', () => {
      expect(PromotionTypes).toHaveProperty('GetSearchClusterStatsRequest');
    });

    it('should export GetSearchClusterStatsRequestItem type', () => {
      expect(PromotionTypes).toHaveProperty('GetSearchClusterStatsRequestItem');
    });

    it('should export GetSearchClusterStatsResponse type', () => {
      expect(PromotionTypes).toHaveProperty('GetSearchClusterStatsResponse');
    });

    it('should export GetSearchClusterStatsItem type', () => {
      expect(PromotionTypes).toHaveProperty('GetSearchClusterStatsItem');
    });

    it('should export SearchClusterStatEntry type', () => {
      // The nested stats entry type
      expect(PromotionTypes).toHaveProperty('SearchClusterStatEntry');
    });
  });
});
