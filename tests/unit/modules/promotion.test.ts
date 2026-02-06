/**
 * Unit tests for PromotionModule
 *
 * Tests the PromotionModule class with mocked BaseClient to verify:
 * - Campaign management operations (count, creation, control)
 * - Configuration and bid operations
 * - Statistics and calendar access
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Type safety and error handling
 *
 * @see {@link ../../../src/modules/promotion/index PromotionModule}
 */

/* eslint-disable @typescript-eslint/no-deprecated */
// Tests intentionally call deprecated methods to verify backward compatibility

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PromotionModule } from '../../../src/modules/promotion';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';
import {
  CampaignNotFoundError,
  InvalidBidError,
  BudgetExceededError,
  InvalidCampaignStateError,
} from '../../../src/errors/promotion-errors';

describe('PromotionModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let promotionModule: PromotionModule;

  beforeEach(() => {
    // Create fresh mocks before each test
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    // Create fresh instance before each test
    promotionModule = new PromotionModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('Campaign Management Operations', () => {
    describe('getPromotionCount() - Campaign count summary', () => {
      const mockCountResponse = {
        adverts: [
          {
            type: 9,
            status: 7,
            count: 5,
            advert_list: [{ advertId: 123, changeTime: '2024-01-01T00:00:00Z' }],
          },
          {
            type: 8,
            status: 4,
            count: 3,
            advert_list: [],
          },
        ],
        all: 8,
      };

      it('should call BaseClient.get with correct URL', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockCountResponse);

        // Act
        await promotionModule.getPromotionCount();

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v1/promotion/count',
          { rateLimitKey: 'promotion.advPromotionCount' }
        );
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should return typed campaign count response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockCountResponse);

        // Act
        const result = await promotionModule.getPromotionCount();

        // Assert
        expect(result).toEqual(mockCountResponse);
        expect(result.adverts).toHaveLength(2);
        expect(result.all).toBe(8);
        expect(result.adverts?.[0]?.type).toBe(9);
        expect(result.adverts?.[0]?.count).toBe(5);
      });

      it('should handle empty campaign list', async () => {
        // Arrange
        const emptyResponse = { adverts: [], all: 0 };
        mockClient.get.mockResolvedValue(emptyResponse);

        // Act
        const result = await promotionModule.getPromotionCount();

        // Assert
        expect(result.adverts).toHaveLength(0);
        expect(result.all).toBe(0);
      });

      it('should throw AuthenticationError on 401', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));

        // Act & Assert
        await expect(promotionModule.getPromotionCount()).rejects.toThrow(AuthenticationError);
      });

      it('should throw RateLimitError on 429', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));

        // Act & Assert
        await expect(promotionModule.getPromotionCount()).rejects.toThrow(RateLimitError);
      });
    });

    describe('createPromotionAdvert() - Get campaign information', () => {
      const mockAdvertIds = [123, 456, 789];
      const mockAdvertsResponse = [
        {
          advertId: 123,
          name: 'Test Campaign 1',
          type: 9,
          status: 7,
          createTime: '2024-01-01T00:00:00Z',
        },
        {
          advertId: 456,
          name: 'Test Campaign 2',
          type: 8,
          status: 4,
          createTime: '2024-01-02T00:00:00Z',
        },
      ];

      it('should call BaseClient.post with IDs and no options', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockAdvertsResponse);

        // Act
        await promotionModule.createPromotionAdvert(mockAdvertIds);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v1/promotion/adverts',
          mockAdvertIds,
          { params: undefined, rateLimitKey: 'promotion.postAdvPromotionAdverts' }
        );
      });

      it('should pass status filter when provided', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockAdvertsResponse);
        const options = { status: 7 as const, type: 8 as const };

        // Act
        await promotionModule.createPromotionAdvert(mockAdvertIds, options);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v1/promotion/adverts',
          mockAdvertIds,
          { params: options, rateLimitKey: 'promotion.postAdvPromotionAdverts' }
        );
      });

      it('should return campaign information array', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockAdvertsResponse);

        // Act
        const result = await promotionModule.createPromotionAdvert(mockAdvertIds);

        // Assert
        expect(Array.isArray(result)).toBe(true);
        expect(result).toHaveLength(2);
      });

      it('should throw ValidationError when IDs array is invalid', async () => {
        // Arrange
        mockClient.post.mockRejectedValue(new ValidationError('Invalid campaign IDs', {}));

        // Act & Assert
        await expect(promotionModule.createPromotionAdvert([])).rejects.toThrow(ValidationError);
      });
    });

    describe('getAuctionAdverts() - Manual bid campaigns', () => {
      const mockAuctionResponse = {
        adverts: [
          {
            advertId: 123,
            name: 'Auction Campaign',
            type: 9,
            status: 9,
            paymentType: 'cpm' as const,
          },
        ],
      };

      it('should call BaseClient.get with correct URL when no filters', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockAuctionResponse);

        // Act
        await promotionModule.getAuctionAdverts();

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/auction/adverts',
          { params: undefined, rateLimitKey: 'promotion.advAuctionAdverts' }
        );
      });

      it('should pass filter parameters when provided', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockAuctionResponse);
        const options = { statuses: '9' as const, payment_type: 'cpm' as const };

        // Act
        await promotionModule.getAuctionAdverts(options);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/auction/adverts',
          { params: options, rateLimitKey: 'promotion.advAuctionAdverts' }
        );
      });

      it('should return auction campaigns response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockAuctionResponse);

        // Act
        const result = await promotionModule.getAuctionAdverts();

        // Assert
        expect(result.adverts).toHaveLength(1);
      });
    });
  });

  describe('Campaign Creation Operations', () => {
    describe('createAdvSaveAd() - Create unified bid campaign', () => {
      const mockCampaignData = {
        type: 9,
        name: 'New Campaign',
        subjectId: 100,
        sum: 10000,
        btype: 1,
        on_pause: false,
        nms: [12345, 67890],
        cpm: 50,
      };

      it('should call BaseClient.post with campaign data', async () => {
        // Arrange
        const mockResponse = 'Campaign created successfully';
        mockClient.post.mockResolvedValue(mockResponse);

        // Act
        await promotionModule.createAdvSaveAd(mockCampaignData);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v1/save-ad',
          mockCampaignData,
          { rateLimitKey: 'promotion.postAdvSaveAd' }
        );
      });

      it('should return success message', async () => {
        // Arrange
        const mockResponse = 'Campaign created';
        mockClient.post.mockResolvedValue(mockResponse);

        // Act
        const result = await promotionModule.createAdvSaveAd(mockCampaignData);

        // Assert
        expect(result).toBe(mockResponse);
      });

      it('should throw ValidationError when campaign data is invalid', async () => {
        // Arrange
        mockClient.post.mockRejectedValue(
          new ValidationError('Invalid campaign parameters', {
            field: 'subjectId',
            message: 'Subject ID is required',
          })
        );

        // Act & Assert
        await expect(promotionModule.createAdvSaveAd({})).rejects.toThrow(ValidationError);
      });

      it('should throw BudgetExceededError when budget insufficient', async () => {
        // Arrange
        const budgetError = new BudgetExceededError('Insufficient budget for campaign creation', {
          availableBudget: 5000,
          requiredBudget: 10000,
        });
        mockClient.post.mockRejectedValue(budgetError);

        // Act & Assert
        await expect(promotionModule.createAdvSaveAd(mockCampaignData)).rejects.toThrow(
          BudgetExceededError
        );
      });
    });

    describe('createSeacatSaveAd() - Create manual/unified bid campaign', () => {
      const mockCampaignData = {
        name: 'Search Campaign',
        nms: [12345],
        bid_type: 'manual' as const,
        placement_types: ['recommendations'] as ('search' | 'recommendations')[],
      };

      it('should call BaseClient.post with campaign configuration', async () => {
        // Arrange
        const mockCampaignId = 12345;
        mockClient.post.mockResolvedValue(mockCampaignId);

        // Act
        await promotionModule.createSeacatSaveAd(mockCampaignData);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v2/seacat/save-ad',
          mockCampaignData,
          { rateLimitKey: 'promotion.postAdvSeacatSaveAd' }
        );
      });

      it('should return campaign ID', async () => {
        // Arrange
        const mockCampaignId = 99999;
        mockClient.post.mockResolvedValue(mockCampaignId);

        // Act
        const result = await promotionModule.createSeacatSaveAd(mockCampaignData);

        // Assert
        expect(result).toBe(mockCampaignId);
        expect(typeof result).toBe('number');
      });

      it('should handle optional parameters', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(123);

        // Act
        await promotionModule.createSeacatSaveAd();

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v2/seacat/save-ad',
          undefined,
          { rateLimitKey: 'promotion.postAdvSeacatSaveAd' }
        );
      });
    });
  });

  describe('Configuration and Bid Operations', () => {
    // Testing deprecated method - eslint warnings expected
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    describe('getAdvConfig() - Configuration values (deprecated)', () => {
      const mockConfigResponse = {
        categories: [{ id: 1, name: 'Electronics', minBid: 50 }],
        config: [{ name: 'MAX_PRODUCTS', value: '1000', description: 'Max products per campaign' }],
      };

      it('should call BaseClient.get with correct URL', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockConfigResponse);

        // Act
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        await promotionModule.getAdvConfig();

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/config',
          { rateLimitKey: 'promotion.advConfig' }
        );
      });

      it('should return configuration response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockConfigResponse);

        // Act
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        const result = await promotionModule.getAdvConfig();

        // Assert
        expect(result.categories).toHaveLength(1);
        expect(result.config).toHaveLength(1);
        expect(result.config?.[0]?.name).toBe('MAX_PRODUCTS');
      });
    });

    describe('createBidsMin() - Minimum bids', () => {
      const mockBidRequest = {
        advert_id: 123,
        nm_ids: [12345, 67890],
        payment_type: 'cpm' as const,
        placement_types: ['recommendation'] as ('combined' | 'search' | 'recommendation')[],
      };

      const mockBidsResponse = {
        bids: [
          {
            nm_id: 12345,
            bids: [
              { type: 'search' as const, value: 50 },
              { type: 'recommendation' as const, value: 30 },
            ],
          },
        ],
      };

      it('should call BaseClient.post with bid request', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockBidsResponse);

        // Act
        await promotionModule.createBidsMin(mockBidRequest);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/bids/min',
          mockBidRequest,
          { rateLimitKey: 'promotion.postAdvBidsMin' }
        );
      });

      it('should return minimum bids response', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockBidsResponse);

        // Act
        const result = await promotionModule.createBidsMin(mockBidRequest);

        // Assert
        expect(result.bids).toHaveLength(1);
        expect(result.bids[0].bids).toHaveLength(2);
        expect(result.bids[0].bids[0].value).toBe(50);
      });

      it('should throw InvalidBidError when bid validation fails', async () => {
        // Arrange
        const bidError = new InvalidBidError('Bid below minimum', { minBid: 50, currentBid: 30 });
        mockClient.post.mockRejectedValue(bidError);

        // Act & Assert
        await expect(promotionModule.createBidsMin(mockBidRequest)).rejects.toThrow(
          InvalidBidError
        );
      });
    });
  });

  describe('Error Handling - Promotion-Specific Errors', () => {
    describe('CampaignNotFoundError scenarios', () => {
      it('should handle campaign not found when getting campaign info', async () => {
        // Arrange
        const campaignId = 999999;
        const notFoundError = new CampaignNotFoundError(campaignId);
        mockClient.post.mockRejectedValue(notFoundError);

        // Act & Assert
        await expect(promotionModule.createPromotionAdvert([campaignId])).rejects.toThrow(
          CampaignNotFoundError
        );
      });
    });

    describe('InvalidCampaignStateError scenarios', () => {
      it('should handle invalid state transition attempts', async () => {
        // Arrange
        const stateError = new InvalidCampaignStateError('completed', 'start', ['ready', 'paused']);
        mockClient.get.mockRejectedValue(stateError);

        // Act & Assert - attempting to start an already completed campaign
        await expect(promotionModule.getPromotionCount()).rejects.toThrow(
          InvalidCampaignStateError
        );
      });
    });

    describe('BudgetExceededError scenarios', () => {
      it('should handle budget exceeded when creating campaign', async () => {
        // Arrange
        const budgetError = new BudgetExceededError('Campaign budget exceeds available balance', {
          availableBudget: 5000,
          requiredBudget: 15000,
        });
        mockClient.post.mockRejectedValue(budgetError);

        // Act & Assert
        await expect(
          promotionModule.createAdvSaveAd({
            sum: 15000,
            name: 'Expensive Campaign',
          })
        ).rejects.toThrow(BudgetExceededError);
      });
    });

    describe('InvalidBidError scenarios', () => {
      it('should handle bid below minimum', async () => {
        // Arrange
        const bidError = new InvalidBidError('Bid amount is below minimum', {
          field: 'cpm',
          minBid: 50,
          currentBid: 25,
        });
        mockClient.post.mockRejectedValue(bidError);

        // Act & Assert
        await expect(
          promotionModule.createBidsMin({
            advert_id: 123,
            nm_ids: [12345],
            payment_type: 'cpm',
            placement_types: ['search'],
          })
        ).rejects.toThrow(InvalidBidError);
      });
    });
  });

  describe('Network and Rate Limit Error Handling', () => {
    it('should throw NetworkError on network failure', async () => {
      // Arrange
      mockClient.get.mockRejectedValue(new NetworkError('Network timeout', true));

      // Act & Assert
      await expect(promotionModule.getPromotionCount()).rejects.toThrow(NetworkError);
    });

    it('should throw RateLimitError when rate limited', async () => {
      // Arrange
      const rateLimitError = new RateLimitError('Rate limit exceeded: 5 req/sec', 200);
      mockClient.get.mockRejectedValue(rateLimitError);

      // Act & Assert
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      await expect(promotionModule.getAdvConfig()).rejects.toThrow(RateLimitError);

      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const error = await promotionModule.getAdvConfig().catch((e: unknown) => e);
      if (error instanceof RateLimitError) {
        expect(error.retryAfter).toBe(200);
      }
    });

    it('should throw AuthenticationError on invalid API key', async () => {
      // Arrange
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid or expired API key'));

      // Act & Assert
      await expect(promotionModule.createAdvSaveAd({ name: 'Test' })).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  describe('Type Safety and Parameter Validation', () => {
    it('should accept valid status enum values', async () => {
      // Arrange
      mockClient.post.mockResolvedValue([]);
      const validStatuses: (-1 | 4 | 7 | 8 | 9 | 11)[] = [-1, 4, 7, 8, 9, 11];

      // Act & Assert - should not throw TypeScript errors
      for (const status of validStatuses) {
        await promotionModule.createPromotionAdvert([123], { status });
        expect(mockClient.post).toHaveBeenCalled();
        mockClient.post.mockClear();
      }
    });

    it('should accept valid campaign type enum values', async () => {
      // Arrange
      mockClient.post.mockResolvedValue([]);
      const validTypes: (4 | 5 | 6 | 7 | 8)[] = [4, 5, 6, 7, 8];

      // Act & Assert
      for (const type of validTypes) {
        await promotionModule.createPromotionAdvert([123], { type });
        expect(mockClient.post).toHaveBeenCalled();
        mockClient.post.mockClear();
      }
    });

    it('should accept valid payment type enum values', async () => {
      // Arrange
      mockClient.get.mockResolvedValue({ adverts: [] });
      const paymentTypes: ('cpm' | 'cpc')[] = ['cpm', 'cpc'];

      // Act & Assert
      for (const payment_type of paymentTypes) {
        await promotionModule.getAuctionAdverts({ payment_type });
        expect(mockClient.get).toHaveBeenCalled();
        mockClient.get.mockClear();
      }
    });

    it('should accept valid bid type enum values', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(123);
      const bidTypes: ('manual' | 'unified')[] = ['manual', 'unified'];

      // Act & Assert
      for (const bid_type of bidTypes) {
        await promotionModule.createSeacatSaveAd({ bid_type });
        expect(mockClient.post).toHaveBeenCalled();
        mockClient.post.mockClear();
      }
    });
  });

  describe('New Endpoints (EPIC 34)', () => {
    describe('getNormqueryStats() - Search cluster statistics', () => {
      const mockRequest = {
        from: '2025-10-07',
        to: '2025-10-08',
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      };

      const mockResponse = {
        stats: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            normqueries: [{ normquery: 'test query', views: 100, clicks: 10, ctr: 10.0, cpc: 50 }],
          },
        ],
      };

      it('should call BaseClient.post with correct URL and rateLimitKey', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        await promotionModule.getNormqueryStats(mockRequest);

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/normquery/stats',
          mockRequest,
          { rateLimitKey: 'promotion.normqueryStats' }
        );
      });

      it('should return expected response', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await promotionModule.getNormqueryStats(mockRequest);

        expect(result).toEqual(mockResponse);
      });
    });

    describe('getNormqueryBids() - Get search cluster bids', () => {
      const mockRequest = {
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      };

      const mockResponse = {
        bids: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            normqueries: [{ normquery: 'test', bid: 1000 }],
          },
        ],
      };

      it('should call BaseClient.post with correct URL and rateLimitKey', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        await promotionModule.getNormqueryBids(mockRequest);

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/normquery/get-bids',
          mockRequest,
          { rateLimitKey: 'promotion.normqueryGetBids' }
        );
      });

      it('should return expected response', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await promotionModule.getNormqueryBids(mockRequest);

        expect(result).toEqual(mockResponse);
      });
    });

    describe('setNormqueryBids() - Set search cluster bids', () => {
      const mockRequest = {
        bids: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            norm_query: 'Фраза 1',
            bid: 1000,
          },
        ],
      };

      it('should call BaseClient.post with correct URL and rateLimitKey', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await promotionModule.setNormqueryBids(mockRequest);

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/normquery/bids',
          mockRequest,
          { rateLimitKey: 'promotion.normquerySetBids' }
        );
      });

      it('should complete without error on success', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await expect(promotionModule.setNormqueryBids(mockRequest)).resolves.toBeUndefined();
      });
    });

    describe('deleteNormqueryBids() - Delete search cluster bids', () => {
      const mockRequest = {
        bids: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            norm_query: 'Фраза 1',
            bid: 1000,
          },
        ],
      };

      it('should call BaseClient.delete with correct URL and rateLimitKey', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await promotionModule.deleteNormqueryBids(mockRequest);

        expect(mockClient.delete).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/normquery/bids',
          mockRequest,
          { rateLimitKey: 'promotion.normqueryDeleteBids' }
        );
      });

      it('should complete without error on success', async () => {
        mockClient.delete.mockResolvedValue(undefined);

        await expect(promotionModule.deleteNormqueryBids(mockRequest)).resolves.toBeUndefined();
      });
    });

    describe('getNormqueryMinus() - Get minus phrases', () => {
      const mockRequest = {
        items: [{ advert_id: 1825035, nm_id: 983512347 }],
      };

      const mockResponse = {
        items: [
          {
            advert_id: 1825035,
            nm_id: 983512347,
            norm_queries: ['Фраза 1', 'Фраза 2'],
          },
        ],
      };

      it('should call BaseClient.post with correct URL and rateLimitKey', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        await promotionModule.getNormqueryMinus(mockRequest);

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/normquery/get-minus',
          mockRequest,
          { rateLimitKey: 'promotion.normqueryGetMinus' }
        );
      });

      it('should return expected response', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await promotionModule.getNormqueryMinus(mockRequest);

        expect(result).toEqual(mockResponse);
      });
    });

    describe('setNormqueryMinus() - Set minus phrases', () => {
      const mockRequest = {
        advert_id: 1825035,
        nm_id: 983512347,
        norm_queries: ['Фраза 1', 'Фраза 2'],
      };

      it('should call BaseClient.post with correct URL and rateLimitKey', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await promotionModule.setNormqueryMinus(mockRequest);

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/adv/v0/normquery/set-minus',
          mockRequest,
          { rateLimitKey: 'promotion.normquerySetMinus' }
        );
      });

      it('should complete without error on success', async () => {
        mockClient.post.mockResolvedValue(undefined);

        await expect(promotionModule.setNormqueryMinus(mockRequest)).resolves.toBeUndefined();
      });
    });

    describe('getAdvertsV2() - Get campaigns V2', () => {
      const mockResponse = {
        adverts: [
          {
            advertId: 12345,
            name: 'Test Campaign',
            type: 9,
            status: 9,
            paymentType: 'cpm',
          },
        ],
      };

      it('should call BaseClient.get with correct URL and rateLimitKey (no options)', async () => {
        mockClient.get.mockResolvedValue(mockResponse);

        await promotionModule.getAdvertsV2();

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/api/advert/v2/adverts',
          { params: undefined, rateLimitKey: 'promotion.advertsV2' }
        );
      });

      it('should pass filter parameters when provided', async () => {
        mockClient.get.mockResolvedValue(mockResponse);
        const options = { ids: '12345,23456', statuses: '9,11', payment_type: 'cpm' as const };

        await promotionModule.getAdvertsV2(options);

        expect(mockClient.get).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/api/advert/v2/adverts',
          { params: options, rateLimitKey: 'promotion.advertsV2' }
        );
      });

      it('should return expected response', async () => {
        mockClient.get.mockResolvedValue(mockResponse);

        const result = await promotionModule.getAdvertsV2();

        expect(result).toEqual(mockResponse);
      });
    });

    describe('getBidsMinV2() - Get minimum bids V1 API', () => {
      const mockRequest = {
        advert_id: 98765432,
        nm_ids: [12345678, 87654321],
        payment_type: 'cpm' as 'cpm' | 'cpc',
        placement_types: ['combined', 'search', 'recommendation'] as (
          | 'combined'
          | 'search'
          | 'recommendation'
        )[],
      };

      const mockResponse = {
        bids: [
          {
            nm_id: 12345678,
            bids: [
              { type: 'combined' as const, value: 100 },
              { type: 'search' as const, value: 150 },
            ],
          },
        ],
      };

      it('should call BaseClient.post with correct URL and rateLimitKey', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        await promotionModule.getBidsMinV2(mockRequest);

        expect(mockClient.post).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/api/advert/v1/bids/min',
          mockRequest,
          { rateLimitKey: 'promotion.bidsMinV1' }
        );
      });

      it('should return expected response', async () => {
        mockClient.post.mockResolvedValue(mockResponse);

        const result = await promotionModule.getBidsMinV2(mockRequest);

        expect(result).toEqual(mockResponse);
      });
    });

    describe('updateBidsV2() - Update bids V1 API', () => {
      const mockRequest = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [
              {
                nm_id: 13335157,
                bid_kopecks: 250,
                placement: 'recommendations' as const,
              },
            ],
          },
        ],
      };

      const mockResponse = {
        bids: [
          {
            advert_id: 12345,
            nm_bids: [
              {
                nm_id: 13335157,
                bid_kopecks: 250,
                placement: 'recommendations',
              },
            ],
          },
        ],
      };

      it('should call BaseClient.patch with correct URL and rateLimitKey', async () => {
        mockClient.patch.mockResolvedValue(mockResponse);

        await promotionModule.updateBidsV2(mockRequest);

        expect(mockClient.patch).toHaveBeenCalledWith(
          'https://advert-api.wildberries.ru/api/advert/v1/bids',
          mockRequest,
          { rateLimitKey: 'promotion.bidsV1' }
        );
      });

      it('should return expected response', async () => {
        mockClient.patch.mockResolvedValue(mockResponse);

        const result = await promotionModule.updateBidsV2(mockRequest);

        expect(result).toEqual(mockResponse);
      });
    });
  });
});
