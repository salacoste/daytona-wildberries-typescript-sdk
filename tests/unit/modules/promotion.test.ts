/**
 * Unit tests for PromotionModule
 *
 * Tests the PromotionModule class with mocked BaseClient to verify:
 * - All promotion campaign management methods
 * - Finance/budget operations
 * - Statistics methods
 * - Calendar promotion methods
 * - Search cluster (NormQuery) methods
 * - V2 API replacement methods
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PromotionModule } from '../../../src/modules/promotion';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { ValidationError } from '../../../src/errors/validation-error';

describe('PromotionModule', () => {
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
      patch: vi.fn().mockResolvedValue({}),
      delete: vi.fn().mockResolvedValue({}),
    };
    module = new PromotionModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Campaign Management Methods', () => {
    it('getAdvDelete - should delete campaign', async () => {
      await module.getAdvDelete({ id: 12345 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/delete',
        expect.objectContaining({ params: { id: 12345 }, rateLimitKey: 'promotion.advDelete' })
      );
    });

    it('createAdvRename - should rename campaign', async () => {
      await module.createAdvRename({ advertId: 123, name: 'New Name' });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/rename',
        { advertId: 123, name: 'New Name' },
        expect.objectContaining({ rateLimitKey: 'promotion.postAdvRename' })
      );
    });

    it('getAdvStop - should stop campaign', async () => {
      await module.getAdvStop({ id: 12345 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/stop',
        expect.objectContaining({ params: { id: 12345 }, rateLimitKey: 'promotion.advStop' })
      );
    });

    it('updateAuctionPlacement - should update placements', async () => {
      const data = {
        placements: [{ advert_id: 123, placements: { search: true, recommendations: false } }],
      };
      await module.updateAuctionPlacement(data);
      expect(mockClient.put).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/auction/placements',
        data,
        expect.objectContaining({ rateLimitKey: 'promotion.putAdvAuctionPlacements' })
      );
    });

    it('updateAuctionBid - should update bids (deprecated)', async () => {
      mockClient.patch.mockResolvedValue({ bids: [] });
      const data = {
        bids: [
          { advert_id: 123, nm_bids: [{ nm_id: 456, bid: 100, placement: 'search' as const }] },
        ],
      };
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      await module.updateAuctionBid(data);
      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/auction/bids',
        data,
        expect.objectContaining({ rateLimitKey: 'promotion.patchAdvAuctionBids' })
      );
    });

    it('updateAuctionNm - should update product list', async () => {
      mockClient.patch.mockResolvedValue({ nms: [] });
      const data = { nms: [{ advert_id: 123, nms: { add: [456], delete: [789] } }] };
      await module.updateAuctionNm(data);
      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/auction/nms',
        data,
        expect.objectContaining({ rateLimitKey: 'promotion.patchAdvAuctionNms' })
      );
    });
  });

  describe('Finance Methods', () => {
    it('getAdvBalance - should get balance', async () => {
      mockClient.get.mockResolvedValue({ balance: 1000, net: 500, bonus: 100 });
      const result = await module.getAdvBalance();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/balance',
        expect.objectContaining({ rateLimitKey: 'promotion.advBalance' })
      );
      expect(result).toEqual({ balance: 1000, net: 500, bonus: 100 });
    });

    it('getAdvBudget - should get campaign budget', async () => {
      mockClient.get.mockResolvedValue({ cash: 500, netting: 200, total: 700 });
      await module.getAdvBudget({ id: 123 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/budget',
        expect.objectContaining({ params: { id: 123 }, rateLimitKey: 'promotion.advBudget' })
      );
    });

    it('createBudgetDeposit - should deposit to budget', async () => {
      await module.createBudgetDeposit({ sum: 1000, type: 1 }, { id: 123 });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/budget/deposit',
        { sum: 1000, type: 1 },
        expect.objectContaining({
          params: { id: 123 },
          rateLimitKey: 'promotion.postAdvBudgetDeposit',
        })
      );
    });

    it('getAdvUpd - should get expense history', async () => {
      mockClient.get.mockResolvedValue([{ updNum: 1, updSum: 100 }]);
      await module.getAdvUpd({ from: '2025-01-01', to: '2025-01-31' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/upd',
        expect.objectContaining({
          params: { from: '2025-01-01', to: '2025-01-31' },
          rateLimitKey: 'promotion.advUpd',
        })
      );
    });

    it('getAdvPayments - should get payment history', async () => {
      mockClient.get.mockResolvedValue([{ id: 1, sum: 500 }]);
      await module.getAdvPayments({ from: '2025-01-01', to: '2025-01-31' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/payments',
        expect.objectContaining({
          params: { from: '2025-01-01', to: '2025-01-31' },
          rateLimitKey: 'promotion.advPayments',
        })
      );
    });
  });

  describe('Deprecated Methods', () => {
    it('createAutoSetExcluded - should call with deprecation warning', async () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      await module.createAutoSetExcluded({ excluded: ['phrase1'] }, { id: 123 });
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('DEPRECATED'));
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/auto/set-excluded',
        { excluded: ['phrase1'] },
        expect.objectContaining({
          params: { id: 123 },
          rateLimitKey: 'promotion.postAdvAutoSetExcluded',
        })
      );
      warnSpy.mockRestore();
    });

    it('createAutoUpdatenm - should call with deprecation warning', async () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      await module.createAutoUpdatenm({ add: [123], delete: [456] }, { id: 789 });
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('DEPRECATED'));
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/auto/updatenm',
        { add: [123], delete: [456] },
        expect.objectContaining({
          params: { id: 789 },
          rateLimitKey: 'promotion.postAdvAutoUpdatenm',
        })
      );
      warnSpy.mockRestore();
    });
  });

  describe('Media Campaign Methods', () => {
    it('getAdvCount - should get media campaign count', async () => {
      mockClient.get.mockResolvedValue({ all: 10, adverts: { type: 1, status: 9, count: 5 } });
      await module.getAdvCount();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-media-api.wildberries.ru/adv/v1/count',
        expect.objectContaining({ rateLimitKey: 'promotion.advCount' })
      );
    });

    it('getAdvAdverts - should get media campaign list', async () => {
      mockClient.get.mockResolvedValue([{ advertId: 123, name: 'Campaign' }]);
      await module.getAdvAdverts({ status: 9, limit: 10 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-media-api.wildberries.ru/adv/v1/adverts',
        expect.objectContaining({
          params: { status: 9, limit: 10 },
          rateLimitKey: 'promotion.advAdverts',
        })
      );
    });

    it('getAdvAdvert - should get single media campaign', async () => {
      mockClient.get.mockResolvedValue({ advertId: 123, name: 'Campaign', status: 9 });
      await module.getAdvAdvert({ id: 123 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-media-api.wildberries.ru/adv/v1/advert',
        expect.objectContaining({ params: { id: 123 }, rateLimitKey: 'promotion.advAdvert' })
      );
    });
  });

  describe('Statistics Methods', () => {
    it('getAdvFullstats - should get campaign statistics', async () => {
      mockClient.get.mockResolvedValue([]);
      await module.getAdvFullstats({
        ids: '123,456',
        beginDate: '2025-01-01',
        endDate: '2025-01-31',
      });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v3/fullstats',
        expect.objectContaining({
          params: { ids: '123,456', beginDate: '2025-01-01', endDate: '2025-01-31' },
          rateLimitKey: 'promotion.advFullstats',
        })
      );
    });

    it('getStatsKeywords - should get keyword statistics (deprecated)', async () => {
      mockClient.get.mockResolvedValue({});
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      await module.getStatsKeywords({ advert_id: 123, from: '2025-01-01', to: '2025-01-07' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/stats/keywords',
        expect.objectContaining({
          params: { advert_id: 123, from: '2025-01-01', to: '2025-01-07' },
          rateLimitKey: 'promotion.advStatsKeywords',
        })
      );
    });

    it('createAdvStat - should get media campaign statistics', async () => {
      mockClient.post.mockResolvedValue([]);
      await module.createAdvStat({ dates: ['2025-01-01'], id: 123 });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-media-api.wildberries.ru/adv/v1/stats',
        { dates: ['2025-01-01'], id: 123 },
        expect.objectContaining({ rateLimitKey: 'promotion.postAdvStats' })
      );
    });
  });

  describe('Calendar Promotions Methods', () => {
    it('getCalendarPromotions - should get promotions list', async () => {
      await module.getCalendarPromotions({
        startDateTime: '2025-01-01',
        endDateTime: '2025-01-31',
        allPromo: true,
      });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions',
        expect.objectContaining({
          params: { startDateTime: '2025-01-01', endDateTime: '2025-01-31', allPromo: true },
          rateLimitKey: 'promotion.calendarPromotions',
        })
      );
    });

    it('getPromotionsDetails - should get promotion details', async () => {
      await module.getPromotionsDetails({ promotionIDs: '123,456' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/details',
        expect.objectContaining({
          params: { promotionIDs: '123,456' },
          rateLimitKey: 'promotion.calendarPromotionsDetails',
        })
      );
    });

    it('getPromotionsNomenclatures - should get promotion products', async () => {
      await module.getPromotionsNomenclatures({ promotionID: 123, inAction: true });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/nomenclatures',
        expect.objectContaining({
          params: { promotionID: 123, inAction: true },
          rateLimitKey: 'promotion.calendarPromotionsNomenclatures',
        })
      );
    });

    it('createPromotionsUpload - should upload products to promotion', async () => {
      await module.createPromotionsUpload();
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://dp-calendar-api.wildberries.ru/api/v1/calendar/promotions/upload',
        undefined,
        expect.objectContaining({ rateLimitKey: 'promotion.postCalendarPromotionsUpload' })
      );
    });
  });

  describe('Search Clusters (NormQuery) Methods', () => {
    it('getNormqueryStats - should get search cluster statistics', async () => {
      mockClient.post.mockResolvedValue({ stats: [] });
      await module.getNormqueryStats({
        from: '2025-01-01',
        to: '2025-01-07',
        items: [{ advert_id: 123, nm_id: 456 }],
      });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/stats',
        { from: '2025-01-01', to: '2025-01-07', items: [{ advert_id: 123, nm_id: 456 }] },
        expect.objectContaining({ rateLimitKey: 'promotion.normqueryStats' })
      );
    });

    it('getNormqueryBids - should get search cluster bids', async () => {
      mockClient.post.mockResolvedValue({ bids: [] });
      await module.getNormqueryBids({ items: [{ advert_id: 123, nm_id: 456 }] });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/get-bids',
        { items: [{ advert_id: 123, nm_id: 456 }] },
        expect.objectContaining({ rateLimitKey: 'promotion.normqueryGetBids' })
      );
    });

    it('setNormqueryBids - should set search cluster bids', async () => {
      await module.setNormqueryBids({
        bids: [{ advert_id: 123, nm_id: 456, norm_query: 'test', bid: 100 }],
      });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/bids',
        { bids: [{ advert_id: 123, nm_id: 456, norm_query: 'test', bid: 100 }] },
        expect.objectContaining({ rateLimitKey: 'promotion.normquerySetBids' })
      );
    });

    it('deleteNormqueryBids - should delete search cluster bids', async () => {
      await module.deleteNormqueryBids({
        bids: [{ advert_id: 123, nm_id: 456, norm_query: 'test', bid: 100 }],
      });
      expect(mockClient.delete).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/bids',
        { bids: [{ advert_id: 123, nm_id: 456, norm_query: 'test', bid: 100 }] },
        expect.objectContaining({ rateLimitKey: 'promotion.normqueryDeleteBids' })
      );
    });

    it('getNormqueryMinus - should get minus phrases', async () => {
      mockClient.post.mockResolvedValue({ items: [] });
      await module.getNormqueryMinus({ items: [{ advert_id: 123, nm_id: 456 }] });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/get-minus',
        { items: [{ advert_id: 123, nm_id: 456 }] },
        expect.objectContaining({ rateLimitKey: 'promotion.normqueryGetMinus' })
      );
    });

    it('setNormqueryMinus - should set minus phrases', async () => {
      await module.setNormqueryMinus({
        advert_id: 123,
        nm_id: 456,
        norm_queries: ['phrase1', 'phrase2'],
      });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/normquery/set-minus',
        { advert_id: 123, nm_id: 456, norm_queries: ['phrase1', 'phrase2'] },
        expect.objectContaining({ rateLimitKey: 'promotion.normquerySetMinus' })
      );
    });

    it('getV1Config - should get account currency and allowed bid steps', async () => {
      const mockResponse = {
        cpcStep: 500,
        cpmStep: 100000,
        currency: 'UZS',
        currencyCode: 860,
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.getV1Config();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v1/config',
        expect.objectContaining({ rateLimitKey: 'promotion.v1Config' })
      );
      expect(result).toEqual(mockResponse);
      expect(result.currency).toBe('UZS');
      expect(result.currencyCode).toBe(860);
      expect(result.cpmStep).toBe(100000);
      expect(result.cpcStep).toBe(500);
    });

    it('postV1NormqueryBids - should set search-cluster bids in account currency', async () => {
      const mockResponse = {
        success: [
          {
            advertId: 1825035,
            nmId: 983512347,
            normQuery: 'Фраза 1',
            currency: 'RUB',
          },
        ],
        failed: [],
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const requestBody = {
        bids: [
          {
            advertId: 1825035,
            nmId: 983512347,
            normQuery: 'Фраза 1',
            bidMinorUnits: 1000,
          },
        ],
      };
      const result = await module.postV1NormqueryBids(requestBody);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v1/normquery/bids',
        requestBody,
        expect.objectContaining({ rateLimitKey: 'promotion.v1NormqueryBids' })
      );
      expect(result.success).toHaveLength(1);
      expect(result.success[0].currency).toBe('RUB');
      expect(result.failed).toEqual([]);
    });
  });

  describe('V2 API Methods', () => {
    it('getAdvertsV2 - should get campaigns with V2 API', async () => {
      const mockResponse = {
        adverts: [
          {
            id: 567456457,
            bid_type: 'manual' as const,
            status: 9 as const,
            timestamps: {
              created: '2024-06-28T15:49:02Z',
              updated: '2025-07-30T10:23:55Z',
              started: '2024-07-01T23:32:09Z',
              deleted: '2099-01-01T00:00:00Z',
            },
            settings: {
              name: 'Campaign 34',
              payment_type: 'cpc' as const,
              placements: { recommendations: false, search: true },
            },
            nm_settings: [
              {
                bids_kopecks: { search: 15000, recommendations: 0 },
                nm_id: 139312996,
                subject: { id: 69, name: 'платья' },
              },
            ],
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.getAdvertsV2({
        ids: '123,456',
        statuses: '9,11',
        payment_type: 'cpm',
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v2/adverts',
        expect.objectContaining({
          params: { ids: '123,456', statuses: '9,11', payment_type: 'cpm' },
          rateLimitKey: 'promotion.advertsV2',
        })
      );
      expect(result.adverts).toHaveLength(1);
      expect(result.adverts[0].bid_type).toBe('manual');
      expect(result.adverts[0].nm_settings[0].bids_kopecks.search).toBe(15000);
    });

    it('getBidsMinV2 - should get minimum bids with V1 API', async () => {
      mockClient.post.mockResolvedValue({ bids: [] });
      await module.getBidsMinV2({
        advert_id: 123,
        nm_ids: [456, 789],
        payment_type: 'cpm',
        placement_types: ['combined', 'search'],
      });
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v1/bids/min',
        {
          advert_id: 123,
          nm_ids: [456, 789],
          payment_type: 'cpm',
          placement_types: ['combined', 'search'],
        },
        expect.objectContaining({ rateLimitKey: 'promotion.bidsMinV1' })
      );
    });

    // ================================================================
    // getBidsRecommendations
    // ================================================================

    it('getBidsRecommendations - should return recommended bids for cpm campaign', async () => {
      const mockResponse = {
        advertId: 29081652,
        nmId: 148190095,
        base: {
          competitiveBid: { bidKopecks: 50000 },
          leadersBid: { bidKopecks: 75000 },
          top2: { bidKopecks: 90000 },
        },
        normQueries: [
          {
            normQuery: 'жидкость для дым машины',
            reachMax: { bidKopecks: 89000 },
            reachMedium: { bidKopecks: 40500 },
            reachMin: { bidKopecks: 70800 },
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.getBidsRecommendations({ advertId: 29081652, nmId: 148190095 });

      expect(result.advertId).toBe(29081652);
      expect(result.nmId).toBe(148190095);
      expect(result.base?.competitiveBid?.bidKopecks).toBe(50000);
      expect(result.normQueries).toHaveLength(1);
      expect(result.normQueries[0].normQuery).toBe('жидкость для дым машины');
      expect(result.normQueries[0].reachMax.bidKopecks).toBe(89000);
    });

    it('getBidsRecommendations - should call correct URL with query params', async () => {
      mockClient.get.mockResolvedValue({ advertId: 123, nmId: 456, normQueries: [] });

      await module.getBidsRecommendations({ advertId: 123, nmId: 456 });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v0/bids/recommendations',
        expect.objectContaining({
          params: { advertId: 123, nmId: 456 },
          rateLimitKey: 'promotion.getBidsRecommendations',
        })
      );
    });

    it('getBidsRecommendations - should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));
      await expect(module.getBidsRecommendations({ advertId: 123, nmId: 456 })).rejects.toThrow(
        AuthenticationError
      );
    });

    it('getBidsRecommendations - should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(module.getBidsRecommendations({ advertId: 123, nmId: 456 })).rejects.toThrow(
        RateLimitError
      );
    });

    it('getBidsRecommendations - should handle response without base field', async () => {
      const mockResponse = {
        advertId: 29081652,
        nmId: 148190095,
        normQueries: [
          {
            normQuery: 'test query',
            reachMax: { bidKopecks: 10000 },
            reachMedium: { bidKopecks: 5000 },
            reachMin: { bidKopecks: 7000 },
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.getBidsRecommendations({ advertId: 29081652, nmId: 148190095 });

      expect(result.base).toBeUndefined();
      expect(result.normQueries).toHaveLength(1);
    });

    it('getBidsRecommendations - should propagate ValidationError for invalid nm', async () => {
      mockClient.get.mockRejectedValue(new ValidationError('nm does not belong to advert'));
      await expect(module.getBidsRecommendations({ advertId: 123, nmId: 999 })).rejects.toThrow(
        ValidationError
      );
      await expect(module.getBidsRecommendations({ advertId: 123, nmId: 999 })).rejects.toThrow(
        'nm does not belong to advert'
      );
    });

    it('updateBidsV2 - should update bids with V1 API', async () => {
      mockClient.patch.mockResolvedValue({ bids: [] });
      // updateBidsV2 is intentionally tested to confirm deprecation is non-breaking (task-131).
      // updateBids is the canonical entry for PATCH /api/advert/v1/bids.
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      await module.updateBidsV2({
        bids: [
          {
            advert_id: 123,
            nm_bids: [{ nm_id: 456, bid_kopecks: 250, placement: 'recommendations' }],
          },
        ],
      });
      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v1/bids',
        {
          bids: [
            {
              advert_id: 123,
              nm_bids: [{ nm_id: 456, bid_kopecks: 250, placement: 'recommendations' }],
            },
          ],
        },
        expect.objectContaining({ rateLimitKey: 'promotion.bidsV1' })
      );
    });
  });

  // ==========================================================================
  // Campaign Count Tests
  // ==========================================================================

  describe('getCampaignCount()', () => {
    const mockResponse = {
      adverts: [
        {
          type: 9,
          status: 9,
          count: 3,
          advert_list: [{ advertId: 123, changeTime: '2025-01-01' }],
        },
      ],
      all: 3,
    };

    it('should call correct endpoint with GET method', async () => {
      mockClient.get.mockResolvedValue(mockResponse);

      await module.getCampaignCount();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/promotion/count',
        { rateLimitKey: 'promotion.getCampaignCount' }
      );
    });

    it('should return campaign groups', async () => {
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.getCampaignCount();

      expect(result.all).toBe(3);
      expect(result.adverts).toHaveLength(1);
    });
  });

  // ==========================================================================
  // Create Campaign Tests
  // ==========================================================================

  describe('createCampaign()', () => {
    it('should call correct endpoint with POST method', async () => {
      mockClient.post.mockResolvedValue(1234567);

      const request = {
        name: 'Test Campaign',
        nms: [146168367, 200425104],
        bid_type: 'manual' as const,
        placement_types: ['search' as const, 'recommendation' as const],
      };

      await module.createCampaign(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v2/seacat/save-ad',
        request,
        { rateLimitKey: 'promotion.createCampaign' }
      );
    });

    it('should return campaign ID', async () => {
      mockClient.post.mockResolvedValue(1234567);

      const result = await module.createCampaign({ name: 'Test', nms: [123] });

      expect(result).toBe(1234567);
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(module.createCampaign({ name: 'Test', nms: [123] })).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  // ==========================================================================
  // Supplier Subjects Tests
  // ==========================================================================

  describe('getSupplierSubjects()', () => {
    const mockResponse = [{ id: 2560, name: '3D очки', count: 1899 }];

    it('should call correct endpoint with GET method', async () => {
      mockClient.get.mockResolvedValue(mockResponse);

      await module.getSupplierSubjects();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/supplier/subjects',
        { rateLimitKey: 'promotion.getSupplierSubjects' }
      );
    });

    it('should pass payment_type param', async () => {
      mockClient.get.mockResolvedValue(mockResponse);

      await module.getSupplierSubjects({ payment_type: 'cpm' });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v1/supplier/subjects',
        { params: { payment_type: 'cpm' }, rateLimitKey: 'promotion.getSupplierSubjects' }
      );
    });

    it('should return subjects array', async () => {
      mockClient.get.mockResolvedValue(mockResponse);

      const result = await module.getSupplierSubjects();

      expect(result).toHaveLength(1);
      expect(result![0].name).toBe('3D очки');
    });

    it('should return null when no subjects', async () => {
      mockClient.get.mockResolvedValue(null);

      const result = await module.getSupplierSubjects();

      expect(result).toBeNull();
    });
  });

  // ==========================================================================
  // Supplier NMs Tests
  // ==========================================================================

  describe('getSupplierNms()', () => {
    const mockResponse = [{ title: 'Плед', nm: 146168367, subjectId: 765 }];

    it('should call correct endpoint with POST method', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await module.getSupplierNms([123, 456]);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v2/supplier/nms',
        [123, 456],
        { rateLimitKey: 'promotion.getSupplierNms' }
      );
    });

    it('should return product cards', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getSupplierNms([765]);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Плед');
    });
  });

  // ==========================================================================
  // Start/Pause Campaign Tests
  // ==========================================================================

  describe('startCampaign()', () => {
    it('should call correct endpoint with GET method', async () => {
      mockClient.get.mockResolvedValue(undefined);

      await module.startCampaign(1234);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/start',
        {
          params: { id: 1234 },
          rateLimitKey: 'promotion.startCampaign',
        }
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

      await expect(module.startCampaign(1234)).rejects.toThrow(RateLimitError);
    });
  });

  describe('pauseCampaign()', () => {
    it('should call correct endpoint with GET method', async () => {
      mockClient.get.mockResolvedValue(undefined);

      await module.pauseCampaign(1234);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/adv/v0/pause',
        {
          params: { id: 1234 },
          rateLimitKey: 'promotion.pauseCampaign',
        }
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(module.pauseCampaign(1234)).rejects.toThrow(AuthenticationError);
    });
  });
});
