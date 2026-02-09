/**
 * TDD Tests for task-53: Add updateCampaignProducts method (PATCH /adv/v0/auction/nms)
 *
 * These tests are designed to FAIL until the functionality is implemented.
 * Run with: npx vitest run tests/tdd/promotion-updateCampaignProducts.tdd.test.ts --config /dev/null --reporter verbose
 *
 * Acceptance Criteria from task-53:
 * - [ ] #1 Метод updateCampaignProducts реализован с URL PATCH /adv/v0/auction/nms
 * - [ ] #2 Интерфейс UpdateCampaignProductsRequest с массивом campaigns
 * - [ ] #3 Каждый campaign содержит: advert_id, add_nms?, delete_nms?
 * - [ ] #4 JSDoc указывает: только для Type 9 кампаний
 * - [ ] #5 Валидация в JSDoc: max 20 кампаний, max 50 товаров на кампанию
 * - [ ] #6 Rate limit 'promotion.updateCampaignProducts': { requestsPerMinute: 60, intervalSeconds: 1 }
 * - [ ] #7 Unit тесты для добавления и удаления товаров
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PromotionModule } from '../../src/modules/promotion';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC: Add updateCampaignProducts method (task-53)', () => {
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
        nms: [
          {
            advert_id: 12345,
            nms: {
              added: [11111111, 44444444],
              deleted: [55555555],
            },
          },
        ],
      }),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new PromotionModule(mockClient as unknown as BaseClient);
  });

  describe('AC #1: Method calls PATCH /adv/v0/auction/nms', () => {
    it('should call the correct endpoint URL', async () => {
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [111222333],
          },
        ],
      };

      // This will fail until updateCampaignProducts method is implemented
      await module.updateCampaignProducts(request);

      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/auction/nms',
        expect.anything(),
        expect.anything()
      );
    });
  });

  describe('AC #2: Request has campaigns array', () => {
    it('should accept campaigns array in request body', async () => {
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [111222333, 444555666],
          },
          {
            advert_id: 67890,
            delete_nms: [777888999],
          },
        ],
      };

      await module.updateCampaignProducts(request);

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          nms: expect.arrayContaining([
            expect.objectContaining({
              advert_id: 12345,
            }),
            expect.objectContaining({
              advert_id: 67890,
            }),
          ]),
        }),
        expect.anything()
      );
    });
  });

  describe('AC #3: Campaign contains advert_id, add_nms?, delete_nms?', () => {
    it('should handle add_nms only', async () => {
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [111222333, 444555666],
          },
        ],
      };

      await module.updateCampaignProducts(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.nms[0]).toHaveProperty('advert_id', 12345);
      expect(callArgs.nms[0].nms).toHaveProperty('add');
      expect(callArgs.nms[0].nms.add).toEqual([111222333, 444555666]);
    });

    it('should handle delete_nms only', async () => {
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            delete_nms: [777888999],
          },
        ],
      };

      await module.updateCampaignProducts(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.nms[0]).toHaveProperty('advert_id', 12345);
      expect(callArgs.nms[0].nms).toHaveProperty('delete');
      expect(callArgs.nms[0].nms.delete).toEqual([777888999]);
    });

    it('should handle both add_nms and delete_nms', async () => {
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [111222333, 444555666],
            delete_nms: [777888999],
          },
        ],
      };

      await module.updateCampaignProducts(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.nms[0]).toHaveProperty('advert_id', 12345);
      expect(callArgs.nms[0].nms).toHaveProperty('add');
      expect(callArgs.nms[0].nms).toHaveProperty('delete');
      expect(callArgs.nms[0].nms.add).toEqual([111222333, 444555666]);
      expect(callArgs.nms[0].nms.delete).toEqual([777888999]);
    });
  });

  describe('AC #6: rateLimitKey "promotion.updateCampaignProducts" is passed', () => {
    it('should pass rateLimitKey "promotion.updateCampaignProducts" to client', async () => {
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [111222333],
          },
        ],
      };

      await module.updateCampaignProducts(request);

      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        expect.anything(),
        expect.objectContaining({
          rateLimitKey: 'promotion.updateCampaignProducts',
        })
      );
    });
  });

  describe('AC #7: Tests for adding and deleting products', () => {
    it('should add products to a campaign', async () => {
      mockClient.patch.mockResolvedValue({
        nms: [
          {
            advert_id: 12345,
            nms: {
              added: [111222333, 444555666],
              deleted: [],
            },
          },
        ],
      });

      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [111222333, 444555666],
          },
        ],
      };

      const result = await module.updateCampaignProducts(request);

      expect(result).toHaveProperty('nms');
      expect(result.nms[0].nms.added).toEqual([111222333, 444555666]);
    });

    it('should delete products from a campaign', async () => {
      mockClient.patch.mockResolvedValue({
        nms: [
          {
            advert_id: 12345,
            nms: {
              added: [],
              deleted: [777888999],
            },
          },
        ],
      });

      const request = {
        campaigns: [
          {
            advert_id: 12345,
            delete_nms: [777888999],
          },
        ],
      };

      const result = await module.updateCampaignProducts(request);

      expect(result).toHaveProperty('nms');
      expect(result.nms[0].nms.deleted).toEqual([777888999]);
    });

    it('should handle multiple campaigns in single request', async () => {
      mockClient.patch.mockResolvedValue({
        nms: [
          {
            advert_id: 11111,
            nms: { added: [100, 101], deleted: [] },
          },
          {
            advert_id: 22222,
            nms: { added: [], deleted: [200] },
          },
          {
            advert_id: 33333,
            nms: { added: [300], deleted: [301] },
          },
        ],
      });

      const request = {
        campaigns: [
          { advert_id: 11111, add_nms: [100, 101] },
          { advert_id: 22222, delete_nms: [200] },
          { advert_id: 33333, add_nms: [300], delete_nms: [301] },
        ],
      };

      const result = await module.updateCampaignProducts(request);

      expect(result.nms).toHaveLength(3);
      expect(result.nms[0].advert_id).toBe(11111);
      expect(result.nms[1].advert_id).toBe(22222);
      expect(result.nms[2].advert_id).toBe(33333);
    });

    it('should handle empty add_nms array', async () => {
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [],
            delete_nms: [777888999],
          },
        ],
      };

      await module.updateCampaignProducts(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.nms[0].nms.add).toEqual([]);
      expect(callArgs.nms[0].nms.delete).toEqual([777888999]);
    });

    it('should handle empty delete_nms array', async () => {
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [111222333],
            delete_nms: [],
          },
        ],
      };

      await module.updateCampaignProducts(request);

      const callArgs = mockClient.patch.mock.calls[0][1];
      expect(callArgs.nms[0].nms.add).toEqual([111222333]);
      expect(callArgs.nms[0].nms.delete).toEqual([]);
    });
  });

  describe('Response handling', () => {
    it('should return response with added and deleted arrays', async () => {
      mockClient.patch.mockResolvedValue({
        nms: [
          {
            advert_id: 12345,
            nms: {
              added: [11111111, 44444444],
              deleted: [55555555],
            },
          },
        ],
      });

      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [11111111, 44444444],
            delete_nms: [55555555],
          },
        ],
      };

      const result = await module.updateCampaignProducts(request);

      expect(result).toHaveProperty('nms');
      expect(result.nms[0]).toHaveProperty('advert_id', 12345);
      expect(result.nms[0].nms).toHaveProperty('added');
      expect(result.nms[0].nms).toHaveProperty('deleted');
      expect(result.nms[0].nms.added).toEqual([11111111, 44444444]);
      expect(result.nms[0].nms.deleted).toEqual([55555555]);
    });
  });

  describe('Request transformation (SDK interface to API schema)', () => {
    it('should transform campaigns array to nms array with nested nms object', async () => {
      // SDK interface uses "campaigns" with "add_nms" and "delete_nms"
      // API expects "nms" with nested "nms" object containing "add" and "delete"
      const request = {
        campaigns: [
          {
            advert_id: 12345,
            add_nms: [111, 222],
            delete_nms: [333],
          },
        ],
      };

      await module.updateCampaignProducts(request);

      // The method should transform to API schema format
      expect(mockClient.patch).toHaveBeenCalledWith(
        expect.any(String),
        {
          nms: [
            {
              advert_id: 12345,
              nms: {
                add: [111, 222],
                delete: [333],
              },
            },
          ],
        },
        expect.anything()
      );
    });
  });
});
