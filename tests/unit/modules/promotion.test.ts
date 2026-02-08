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

    it('updateAuctionBid - should update bids', async () => {
      mockClient.patch.mockResolvedValue({ bids: [] });
      const data = {
        bids: [
          { advert_id: 123, nm_bids: [{ nm_id: 456, bid: 100, placement: 'search' as const }] },
        ],
      };
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

    it('getStatsKeywords - should get keyword statistics', async () => {
      mockClient.get.mockResolvedValue({});
      await module.getStatsKeywords({ advert_id: 123, from: '2025-01-01', to: '2025-01-07' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://api.wildberries.ru/adv/v0/stats/keywords',
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
  });

  describe('V2 API Methods', () => {
    it('getAdvertsV2 - should get campaigns with V2 API', async () => {
      mockClient.get.mockResolvedValue({ adverts: [] });
      await module.getAdvertsV2({ ids: '123,456', statuses: '9,11', payment_type: 'cpm' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://advert-api.wildberries.ru/api/advert/v2/adverts',
        expect.objectContaining({
          params: { ids: '123,456', statuses: '9,11', payment_type: 'cpm' },
          rateLimitKey: 'promotion.advertsV2',
        })
      );
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

    it('updateBidsV2 - should update bids with V1 API', async () => {
      mockClient.patch.mockResolvedValue({ bids: [] });
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
});
