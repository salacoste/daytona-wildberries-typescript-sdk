/**
 * TDD Tests for task-52: updateBids Migration to bid_kopecks
 *
 * These tests are designed to FAIL until the functionality is implemented.
 * Run with: npx vitest run tests/tdd/promotion-updateBids.tdd.test.ts --config /dev/null --reporter verbose
 *
 * Acceptance Criteria from task-52:
 * - [ ] #1 Интерфейс BidUpdateItem содержит поле bid_kopecks (number) вместо bid
 * - [ ] #2 Добавлено поле placement с типом 'search' | 'recommendations' | 'combined'
 * - [ ] #3 JSDoc для bid_kopecks: "Ставка в копейках. Пример: 250 = 2.50 RUB"
 * - [ ] #4 Валидация: max 50 кампаний, max 50 артикулов на кампанию (документировано в JSDoc)
 * - [ ] #5 Rate limit 'promotion.updateBids': { requestsPerMinute: 300, intervalSeconds: 0.2, burstLimit: 10 }
 * - [ ] #6 Unit тесты проверяют отправку bid_kopecks и placement
 * - [ ] #7 Добавлен пример использования в JSDoc с конвертацией рублей в копейки
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromotionModule } from '../../src/modules/promotion';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC: updateBids Migration to bid_kopecks (task-52)', () => {
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
      post: vi.fn().mockResolvedValue({}),
      put: vi.fn().mockResolvedValue({}),
      patch: vi.fn().mockResolvedValue({
        bids: [
          {
            advert_id: 12345,
            nm_bids: [{ nm_id: 13335157, bid_kopecks: 250, placement: 'recommendations' }],
          },
        ],
      }),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new PromotionModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: BidUpdateItem contains bid_kopecks field instead of bid', () => {
    it('should accept bid_kopecks in request body', async () => {
      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [
              {
                nm_id: 13335157,
                bid_kopecks: 1500, // 15.00 RUB
                placement: 'search' as const,
              },
            ],
          },
        ],
      };

      // This will fail until updateBids method is implemented
      await module.updateBids(request);

      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v1/bids',
        expect.objectContaining({
          bids: expect.arrayContaining([
            expect.objectContaining({
              advert_id: 12345,
              nm_bids: expect.arrayContaining([
                expect.objectContaining({
                  nm_id: 13335157,
                  bid_kopecks: 1500,
                }),
              ]),
            }),
          ]),
        }),
        expect.anything()
      );
    });

    it('should NOT use the old "bid" field in request', async () => {
      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [
              {
                nm_id: 13335157,
                bid_kopecks: 250,
                placement: 'combined' as const,
              },
            ],
          },
        ],
      };

      await module.updateBids(request);

      // Verify the request does not contain "bid" field
      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.bids[0].nm_bids[0]).not.toHaveProperty('bid');
      expect(callArgs.bids[0].nm_bids[0]).toHaveProperty('bid_kopecks');
    });
  });

  describe('AC #2: placement field with type search | recommendations | combined', () => {
    it('should accept placement: "search"', async () => {
      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [{ nm_id: 111, bid_kopecks: 500, placement: 'search' as const }],
          },
        ],
      };

      await module.updateBids(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.bids[0].nm_bids[0].placement).toBe('search');
    });

    it('should accept placement: "recommendations"', async () => {
      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [{ nm_id: 111, bid_kopecks: 500, placement: 'recommendations' as const }],
          },
        ],
      };

      await module.updateBids(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.bids[0].nm_bids[0].placement).toBe('recommendations');
    });

    it('should accept placement: "combined"', async () => {
      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [{ nm_id: 111, bid_kopecks: 500, placement: 'combined' as const }],
          },
        ],
      };

      await module.updateBids(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.bids[0].nm_bids[0].placement).toBe('combined');
    });
  });

  describe('AC #3 & #4: Method calls correct endpoint with correct URL', () => {
    it('should call PATCH /api/advert/v1/bids', async () => {
      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [{ nm_id: 13335157, bid_kopecks: 250, placement: 'search' as const }],
          },
        ],
      };

      await module.updateBids(request);

      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v1/bids',
        expect.anything(),
        expect.anything()
      );
    });
  });

  describe('AC #5: rateLimitKey "promotion.updateBids" is passed', () => {
    it('should pass rateLimitKey "promotion.updateBids" to client', async () => {
      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [{ nm_id: 13335157, bid_kopecks: 250, placement: 'search' as const }],
          },
        ],
      };

      await module.updateBids(request);

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: 'promotion.updateBids',
        })
      );
    });
  });

  describe('AC #6: Request body contains bid_kopecks and placement', () => {
    it('should send multiple campaigns with multiple articles', async () => {
      const request = {
        bids: [
          {
            advert_id: 11111,
            nm_bids: [
              { nm_id: 100, bid_kopecks: 250, placement: 'search' as const },
              { nm_id: 101, bid_kopecks: 500, placement: 'recommendations' as const },
            ],
          },
          {
            advert_id: 22222,
            nm_bids: [{ nm_id: 200, bid_kopecks: 1500, placement: 'combined' as const }],
          },
        ],
      };

      await module.updateBids(request);

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          bids: expect.arrayContaining([
            expect.objectContaining({
              advert_id: 11111,
              nm_bids: expect.arrayContaining([
                expect.objectContaining({ nm_id: 100, bid_kopecks: 250, placement: 'search' }),
                expect.objectContaining({
                  nm_id: 101,
                  bid_kopecks: 500,
                  placement: 'recommendations',
                }),
              ]),
            }),
            expect.objectContaining({
              advert_id: 22222,
              nm_bids: expect.arrayContaining([
                expect.objectContaining({ nm_id: 200, bid_kopecks: 1500, placement: 'combined' }),
              ]),
            }),
          ]),
        }),
        expect.anything()
      );
    });

    it('should properly handle kopeck values (250 kopecks = 2.50 RUB)', async () => {
      // Example conversion: 15.00 RUB = 1500 kopecks
      const priceInRubles = 15.0;
      const priceInKopecks = priceInRubles * 100; // 1500

      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [
              { nm_id: 13335157, bid_kopecks: priceInKopecks, placement: 'search' as const },
            ],
          },
        ],
      };

      await module.updateBids(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.bids[0].nm_bids[0].bid_kopecks).toBe(1500);
    });
  });

  describe('Response handling', () => {
    it('should return response with bid_kopecks', async () => {
      mockClient.patch.mockResolvedValue({
        bids: [
          {
            advert_id: 12345,
            nm_bids: [{ nm_id: 13335157, bid_kopecks: 250, placement: 'recommendations' }],
          },
        ],
      });

      const request = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [{ nm_id: 13335157, bid_kopecks: 250, placement: 'recommendations' as const }],
          },
        ],
      };

      const result = await module.updateBids(request);

      expect(result).toHaveProperty('bids');
      expect(result.bids[0]).toHaveProperty('advert_id', 12345);
      expect(result.bids[0].nm_bids[0]).toHaveProperty('bid_kopecks', 250);
      expect(result.bids[0].nm_bids[0]).toHaveProperty('placement', 'recommendations');
    });
  });
});
