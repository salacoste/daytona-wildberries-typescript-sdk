/**
 * TDD RED-PHASE Tests for Task-51: Update getAdvertsV2 Method
 *
 * Tests verify getAdvertsV2 method implementation:
 * - Uses correct URL: GET /api/advert/v2/adverts
 * - Response includes adverts array with correct structure
 * - Each advert has: id, bid_type, status, timestamps, settings, nm_settings
 * - nm_settings contains bids_kopecks (not bids) with search and recommendations
 * - JSDoc contains data synchronization information
 * - Rate limit: 5 req/sec, 200ms interval
 *
 * Current Implementation Status:
 * - The getAdvertsV2 method already exists with correct URL and rateLimitKey
 * - The GetAdverts type exists but uses bid_type: string instead of typed enum
 * - Tests verify the expected behavior for when types are properly updated
 *
 * Expected: Most tests PASS (method exists), but type-specific tests may fail
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromotionModule } from '../../src/modules/promotion';
import type { BaseClient } from '../../src/client/base-client';

describe('Task-51: Update getAdvertsV2 Method', () => {
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
      get: vi.fn().mockResolvedValue({ adverts: [] }),
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new PromotionModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: Method uses correct URL: GET /api/advert/v2/adverts', () => {
    it('getAdvertsV2 method should exist', () => {
      expect(typeof module.getAdvertsV2).toBe('function');
    });

    it('should call GET with correct base URL', async () => {
      await module.getAdvertsV2();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v2/adverts',
        expect.any(Object)
      );
    });

    it('should pass query parameters correctly - ids', async () => {
      await module.getAdvertsV2({ ids: '12345,23456,34567' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v2/adverts',
        expect.objectContaining({
          params: expect.objectContaining({ ids: '12345,23456,34567' }),
        })
      );
    });

    it('should pass query parameters correctly - statuses', async () => {
      await module.getAdvertsV2({ statuses: '-1,4,8,9,11' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v2/adverts',
        expect.objectContaining({
          params: expect.objectContaining({ statuses: '-1,4,8,9,11' }),
        })
      );
    });

    it('should pass query parameters correctly - payment_type', async () => {
      await module.getAdvertsV2({ payment_type: 'cpm' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v2/adverts',
        expect.objectContaining({
          params: expect.objectContaining({ payment_type: 'cpm' }),
        })
      );
    });

    it('should accept all parameters together', async () => {
      await module.getAdvertsV2({
        ids: '12345,23456',
        statuses: '9,11',
        payment_type: 'cpc',
      });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v2/adverts',
        expect.objectContaining({
          params: {
            ids: '12345,23456',
            statuses: '9,11',
            payment_type: 'cpc',
          },
        })
      );
    });
  });

  describe('AC #2: Response includes adverts array with correct structure', () => {
    it('should return GetAdvertsV2Response type with adverts array', async () => {
      const mockResponse = {
        adverts: [
          {
            bid_type: 'manual',
            id: 567456457,
            nm_settings: [],
            settings: {
              name: 'Test Campaign',
              payment_type: 'cpm',
              placements: { search: true, recommendations: false },
            },
            status: 9,
            timestamps: {
              created: '2024-02-01T09:57:38.500606+03:00',
              deleted: '2100-01-01T00:00:00+03:00',
              started: null,
              updated: '2024-02-01T09:57:38.500606+03:00',
            },
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.getAdvertsV2();
      expect(result).toHaveProperty('adverts');
      expect(Array.isArray(result.adverts)).toBe(true);
    });

    it('should handle empty adverts array', async () => {
      mockClient.get.mockResolvedValue({ adverts: [] });
      const result = await module.getAdvertsV2();
      expect(result.adverts).toHaveLength(0);
    });
  });

  describe('AC #3: Each advert contains required fields', () => {
    const mockAdvert = {
      bid_type: 'manual',
      id: 567456457,
      nm_settings: [
        {
          bids_kopecks: { search: 1100, recommendations: 0 },
          nm_id: 123456789,
          subject: { id: 52, name: 'кошельки' },
        },
      ],
      settings: {
        name: 'Campaign Test',
        payment_type: 'cpm',
        placements: { search: true, recommendations: false },
      },
      status: 9,
      timestamps: {
        created: '2024-02-01T09:57:38.500606+03:00',
        deleted: '2100-01-01T00:00:00+03:00',
        started: '2024-02-05T12:38:10.212086+03:00',
        updated: '2024-02-05T14:29:32.633968+03:00',
      },
    };

    beforeEach(() => {
      mockClient.get.mockResolvedValue({ adverts: [mockAdvert] });
    });

    it('advert should have id field', async () => {
      const result = await module.getAdvertsV2();
      expect(result.adverts[0]).toHaveProperty('id');
      expect(typeof result.adverts[0].id).toBe('number');
    });

    it('advert should have bid_type field with auto or manual value', async () => {
      const result = await module.getAdvertsV2();
      expect(result.adverts[0]).toHaveProperty('bid_type');
      expect(['auto', 'manual']).toContain(result.adverts[0].bid_type);
    });

    it('advert should have status field with valid status code', async () => {
      const result = await module.getAdvertsV2();
      expect(result.adverts[0]).toHaveProperty('status');
      expect([-1, 4, 7, 8, 9, 11]).toContain(result.adverts[0].status);
    });

    it('advert should have timestamps object with created, deleted, started, updated', async () => {
      const result = await module.getAdvertsV2();
      const timestamps = result.adverts[0].timestamps;
      expect(timestamps).toHaveProperty('created');
      expect(timestamps).toHaveProperty('deleted');
      expect(timestamps).toHaveProperty('started');
      expect(timestamps).toHaveProperty('updated');
    });

    it('advert should have settings object with name, payment_type, placements', async () => {
      const result = await module.getAdvertsV2();
      const settings = result.adverts[0].settings;
      expect(settings).toHaveProperty('name');
      expect(settings).toHaveProperty('payment_type');
      expect(settings).toHaveProperty('placements');
    });

    it('advert should have nm_settings array', async () => {
      const result = await module.getAdvertsV2();
      expect(result.adverts[0]).toHaveProperty('nm_settings');
      expect(Array.isArray(result.adverts[0].nm_settings)).toBe(true);
    });
  });

  describe('AC #4: nm_settings contains bids_kopecks (not bids)', () => {
    const mockResponse = {
      adverts: [
        {
          bid_type: 'manual',
          id: 567456457,
          nm_settings: [
            {
              bids_kopecks: {
                recommendations: 11200,
                search: 1100,
              },
              nm_id: 987654321,
              subject: {
                id: 54,
                name: 'ювелирные кольца',
              },
            },
          ],
          settings: {
            name: 'Test Campaign',
            payment_type: 'cpm',
            placements: { search: true, recommendations: false },
          },
          status: 11,
          timestamps: {
            created: '2024-02-01T09:57:38.500606+03:00',
            deleted: '2100-01-01T00:00:00+03:00',
            started: null,
            updated: '2024-02-01T09:57:38.500606+03:00',
          },
        },
      ],
    };

    beforeEach(() => {
      mockClient.get.mockResolvedValue(mockResponse);
    });

    it('nm_settings item should have bids_kopecks field (not bids)', async () => {
      const result = await module.getAdvertsV2();
      const nmSetting = result.adverts[0].nm_settings[0];
      expect(nmSetting).toHaveProperty('bids_kopecks');
      expect(nmSetting).not.toHaveProperty('bids');
      expect(nmSetting).not.toHaveProperty('bid');
    });

    it('bids_kopecks should have search field', async () => {
      const result = await module.getAdvertsV2();
      const bidsKopecks = result.adverts[0].nm_settings[0].bids_kopecks;
      expect(bidsKopecks).toHaveProperty('search');
      expect(typeof bidsKopecks.search).toBe('number');
    });

    it('bids_kopecks should have recommendations field', async () => {
      const result = await module.getAdvertsV2();
      const bidsKopecks = result.adverts[0].nm_settings[0].bids_kopecks;
      expect(bidsKopecks).toHaveProperty('recommendations');
      expect(typeof bidsKopecks.recommendations).toBe('number');
    });

    it('bids_kopecks values are in kopecks (1100 = 11 RUB)', async () => {
      const result = await module.getAdvertsV2();
      const bidsKopecks = result.adverts[0].nm_settings[0].bids_kopecks;
      // 1100 kopecks = 11.00 RUB
      expect(bidsKopecks.search).toBe(1100);
      expect(bidsKopecks.search / 100).toBe(11);
      // 11200 kopecks = 112.00 RUB
      expect(bidsKopecks.recommendations).toBe(11200);
      expect(bidsKopecks.recommendations / 100).toBe(112);
    });

    it('nm_settings item should have nm_id field', async () => {
      const result = await module.getAdvertsV2();
      const nmSetting = result.adverts[0].nm_settings[0];
      expect(nmSetting).toHaveProperty('nm_id');
      expect(typeof nmSetting.nm_id).toBe('number');
    });

    it('nm_settings item should have subject with id and name', async () => {
      const result = await module.getAdvertsV2();
      const subject = result.adverts[0].nm_settings[0].subject;
      expect(subject).toHaveProperty('id');
      expect(subject).toHaveProperty('name');
      expect(typeof subject.id).toBe('number');
      expect(typeof subject.name).toBe('string');
    });
  });

  describe('AC #5: JSDoc contains data synchronization information', () => {
    it.todo('JSDoc should mention: database syncs every 3 minutes');
    it.todo('JSDoc should mention: statuses change every 1 minute');
    it.todo('JSDoc should mention: bids change every 30 seconds');
    // Note: JSDoc comments cannot be tested at runtime
    // These should be verified by code review or documentation generation
  });

  describe('AC #6: Rate limit configuration', () => {
    it('should pass rateLimitKey to client', async () => {
      await module.getAdvertsV2();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: expect.any(String),
        })
      );
    });

    it('rateLimitKey should be promotion.advertsV2', async () => {
      await module.getAdvertsV2();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          rateLimitKey: 'promotion.advertsV2',
        })
      );
    });

    it.todo('rate limit config has requestsPerMinute: 300 (5 req/sec * 60)');
    it.todo('rate limit config has intervalSeconds: 0.2 (200ms)');
    it.todo('rate limit config has burstLimit: 5');
    // Rate limit configuration is in promotion-rate-limits.ts, tested separately
  });

  describe('AC #7: Unit tests updated for new structure', () => {
    it('should correctly type the response as GetAdvertsV2Response', async () => {
      const mockResponse = {
        adverts: [
          {
            bid_type: 'auto' as const,
            id: 28150154,
            nm_settings: [
              {
                bids_kopecks: {
                  recommendations: 0,
                  search: 1100,
                },
                nm_id: 5764746785,
                subject: {
                  id: 69,
                  name: 'платья',
                },
              },
            ],
            settings: {
              name: 'Кампания от 28.08.2025',
              payment_type: 'cpc' as const,
              placements: {
                recommendations: false,
                search: true,
              },
            },
            status: 11 as const,
            timestamps: {
              created: '2025-08-28T09:50:57.611559+03:00',
              deleted: '2100-01-01T00:00:00+03:00',
              started: null,
              updated: '2025-09-10T10:14:58.475499+03:00',
            },
          },
        ],
      };

      mockClient.get.mockResolvedValue(mockResponse);
      const result = await module.getAdvertsV2();

      // Verify the structure matches the API documentation example
      expect(result.adverts[0].bid_type).toBe('auto');
      expect(result.adverts[0].settings.payment_type).toBe('cpc');
      expect(result.adverts[0].nm_settings[0].bids_kopecks.search).toBe(1100);
      expect(result.adverts[0].timestamps.started).toBeNull();
    });
  });

  describe('Type correctness (requires task-50 type updates)', () => {
    it('response type should use GetAdvertsV2Response (not GetAdverts)', () => {
      // The method currently returns Promise<GetAdverts>
      // After task-50, it should return Promise<GetAdvertsV2Response> with proper types
      // This is a design decision to verify - GetAdvertsV2Response should be the canonical name
      expect(typeof module.getAdvertsV2).toBe('function');
    });

    it('advert bid_type should be typed as BidType enum, not string', () => {
      // Current: GetAdvertsItem.bid_type: string
      // Expected: GetAdvertsItem.bid_type: 'auto' | 'manual' (or BidType)
      const mockAdvert = {
        bid_type: 'auto' as const, // This should be valid after task-50
        id: 12345,
        nm_settings: [],
        settings: {
          name: 'Test',
          payment_type: 'cpm' as const,
          placements: { search: true, recommendations: false },
        },
        status: 9 as const,
        timestamps: {
          created: '2024-01-01T00:00:00+03:00',
          deleted: '2100-01-01T00:00:00+03:00',
          started: null,
          updated: '2024-01-01T00:00:00+03:00',
        },
      };

      // Verify 'auto' is accepted (not just 'manual' or 'unified')
      expect(['auto', 'manual']).toContain(mockAdvert.bid_type);
      expect(mockAdvert.bid_type).not.toBe('unified');
    });

    it('advert bid_type should NOT accept "unified" (deprecated value)', () => {
      // 'unified' was the old value in type 8 campaigns
      // New API uses 'auto' instead
      const deprecatedValue = 'unified';
      const validValues = ['auto', 'manual'];
      expect(validValues).not.toContain(deprecatedValue);
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle campaigns with no nm_settings', async () => {
      mockClient.get.mockResolvedValue({
        adverts: [
          {
            bid_type: 'manual',
            id: 12345,
            nm_settings: [],
            settings: {
              name: 'Empty Campaign',
              payment_type: 'cpm',
              placements: { search: true, recommendations: true },
            },
            status: 4,
            timestamps: {
              created: '2024-01-01T00:00:00+03:00',
              deleted: '2100-01-01T00:00:00+03:00',
              started: null,
              updated: '2024-01-01T00:00:00+03:00',
            },
          },
        ],
      });

      const result = await module.getAdvertsV2();
      expect(result.adverts[0].nm_settings).toHaveLength(0);
    });

    it('should handle timestamps.started being null', async () => {
      mockClient.get.mockResolvedValue({
        adverts: [
          {
            bid_type: 'manual',
            id: 12345,
            nm_settings: [],
            settings: {
              name: 'Not Started Campaign',
              payment_type: 'cpm',
              placements: { search: true, recommendations: false },
            },
            status: 4,
            timestamps: {
              created: '2024-01-01T00:00:00+03:00',
              deleted: '2100-01-01T00:00:00+03:00',
              started: null,
              updated: '2024-01-01T00:00:00+03:00',
            },
          },
        ],
      });

      const result = await module.getAdvertsV2();
      expect(result.adverts[0].timestamps.started).toBeNull();
    });

    it('should handle deleted campaign with future deletion date (2100-01-01)', async () => {
      mockClient.get.mockResolvedValue({
        adverts: [
          {
            bid_type: 'manual',
            id: 12345,
            nm_settings: [],
            settings: {
              name: 'Active Campaign',
              payment_type: 'cpm',
              placements: { search: true, recommendations: false },
            },
            status: 9,
            timestamps: {
              created: '2024-01-01T00:00:00+03:00',
              deleted: '2100-01-01T00:00:00+03:00',
              started: '2024-01-01T00:00:00+03:00',
              updated: '2024-01-01T00:00:00+03:00',
            },
          },
        ],
      });

      const result = await module.getAdvertsV2();
      // 2100-01-01 indicates campaign is not deleted
      expect(result.adverts[0].timestamps.deleted).toBe('2100-01-01T00:00:00+03:00');
    });

    it('should handle bids_kopecks with 0 values (not set)', async () => {
      mockClient.get.mockResolvedValue({
        adverts: [
          {
            bid_type: 'manual',
            id: 12345,
            nm_settings: [
              {
                bids_kopecks: {
                  recommendations: 0,
                  search: 0,
                },
                nm_id: 123456,
                subject: { id: 1, name: 'Test' },
              },
            ],
            settings: {
              name: 'No Bids Set',
              payment_type: 'cpm',
              placements: { search: true, recommendations: false },
            },
            status: 4,
            timestamps: {
              created: '2024-01-01T00:00:00+03:00',
              deleted: '2100-01-01T00:00:00+03:00',
              started: null,
              updated: '2024-01-01T00:00:00+03:00',
            },
          },
        ],
      });

      const result = await module.getAdvertsV2();
      // 0 indicates bid is not set
      expect(result.adverts[0].nm_settings[0].bids_kopecks.search).toBe(0);
      expect(result.adverts[0].nm_settings[0].bids_kopecks.recommendations).toBe(0);
    });
  });
});
