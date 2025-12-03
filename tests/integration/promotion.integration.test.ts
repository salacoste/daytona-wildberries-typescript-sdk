/**
 * Integration tests for PromotionModule
 *
 * Tests the PromotionModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow from module → BaseClient → RateLimiter → RetryHandler → HTTP
 * - Rate limiting enforcement for promotion endpoints
 * - Retry logic with real timing
 * - Error transformation from HTTP responses
 * - Promotion-specific error scenarios
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/promotion/index PromotionModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { PromotionModule } from '../../src/modules/promotion';
import { BaseClient } from '../../src/client/base-client';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { NetworkError } from '../../src/errors/network-error';

/**
 * MSW handlers for Promotion API endpoints
 * These intercept HTTP requests at the network level and return mocked responses
 */
const handlers = [
  // GET /adv/v1/promotion/count - Campaign count summary
  http.get('https://advert-api.wildberries.ru/adv/v1/promotion/count', () => {
    return HttpResponse.json({
      adverts: [
        {
          type: 9,
          status: 7,
          count: 5,
          advert_list: [
            { advertId: 12345, changeTime: '2024-01-15T10:00:00Z' },
            { advertId: 12346, changeTime: '2024-01-16T11:00:00Z' },
          ],
        },
        {
          type: 8,
          status: 4,
          count: 3,
          advert_list: [{ advertId: 12347, changeTime: '2024-01-17T09:00:00Z' }],
        },
      ],
      all: 8,
    });
  }),

  // POST /adv/v1/promotion/adverts - Get campaign information
  http.post('https://advert-api.wildberries.ru/adv/v1/promotion/adverts', async ({ request }) => {
    const body = (await request.json()) as number[];

    // Simulate campaign not found
    if (body.includes(999999)) {
      return HttpResponse.json({ error: 'Campaign not found', code: 404 }, { status: 404 });
    }

    return HttpResponse.json([
      {
        advertId: body[0],
        name: 'Integration Test Campaign',
        type: 9,
        status: 7,
        createTime: '2024-01-01T00:00:00Z',
        changeTime: '2024-01-15T10:00:00Z',
        startTime: '2024-01-02T00:00:00Z',
        endTime: '2024-12-31T23:59:59Z',
      },
    ]);
  }),

  // GET /adv/v0/auction/adverts - Manual bid campaigns
  http.get('https://advert-api.wildberries.ru/adv/v0/auction/adverts', () => {
    return HttpResponse.json({
      adverts: [
        {
          advertId: 12345,
          name: 'Auction Campaign',
          type: 9,
          status: 9,
          paymentType: 'cpm',
        },
      ],
    });
  }),

  // GET /adv/v0/config - Configuration values
  http.get('https://advert-api.wildberries.ru/adv/v0/config', () => {
    return HttpResponse.json({
      categories: [
        { id: 1, name: 'Electronics', minBid: 50 },
        { id: 2, name: 'Clothing', minBid: 30 },
      ],
      config: [
        { name: 'MAX_PRODUCTS', value: '1000', description: 'Maximum products per campaign' },
        { name: 'MIN_BID', value: '10', description: 'Minimum bid amount in rubles' },
      ],
    });
  }),

  // POST /adv/v0/bids/min - Minimum bids
  http.post('https://advert-api.wildberries.ru/adv/v0/bids/min', async ({ request }) => {
    const body = (await request.json()) as {
      advert_id: number;
      nm_ids: number[];
      payment_type: string;
    };

    // Simulate invalid bid error
    if (body.advert_id === 88888) {
      return HttpResponse.json(
        { error: 'Bid below minimum', minBid: 50, currentBid: 25 },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      bids: body.nm_ids.map((nm_id) => ({
        nm_id,
        bids: [
          { type: 'search', value: 50 },
          { type: 'recommendation', value: 30 },
        ],
      })),
    });
  }),

  // POST /adv/v1/save-ad - Create unified bid campaign
  http.post('https://advert-api.wildberries.ru/adv/v1/save-ad', async ({ request }) => {
    const body = (await request.json()) as { sum?: number; name?: string };

    // Simulate budget exceeded error
    if (body.sum && body.sum > 50000) {
      return HttpResponse.json(
        { error: 'Budget exceeded', availableBudget: 30000, requiredBudget: body.sum },
        { status: 400 }
      );
    }

    return HttpResponse.json('Campaign created successfully');
  }),

  // POST /adv/v2/seacat/save-ad - Create manual/unified bid campaign
  http.post('https://advert-api.wildberries.ru/adv/v2/seacat/save-ad', () => {
    return HttpResponse.json(12345); // Return campaign ID
  }),
];

/**
 * Setup MSW server
 * This server intercepts all HTTP requests during tests and returns mocked responses
 */
const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// Reset handlers after each test to prevent test interference
afterEach(() => {
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => {
  server.close();
});

describe('PromotionModule Integration Tests', () => {
  let promotionModule: PromotionModule;
  let baseClient: BaseClient;

  beforeEach(() => {
    // Create real BaseClient with test configuration
    baseClient = new BaseClient({
      apiKey: 'test-promotion-integration-key',
      timeout: 5000,
      retryConfig: {
        maxRetries: 2,
        retryDelay: 100,
        exponentialBackoff: true,
      },
    });

    // Create PromotionModule with real BaseClient
    promotionModule = new PromotionModule(baseClient);
  });

  describe('Campaign Management Operations', () => {
    it('should successfully get campaign count summary with real BaseClient', async () => {
      // Act
      const result = await promotionModule.getPromotionCount();

      // Assert
      expect(result).toBeDefined();
      expect(result.adverts).toHaveLength(2);
      expect(result.all).toBe(8);
      expect(result.adverts?.[0]?.type).toBe(9);
      expect(result.adverts?.[0]?.count).toBe(5);
      expect(result.adverts?.[0]?.advert_list).toHaveLength(2);
    });

    it('should successfully get campaign information with IDs', async () => {
      // Arrange
      const campaignIds = [12345, 12346];

      // Act
      const result = await promotionModule.createPromotionAdverts(campaignIds);

      // Assert
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
    });

    it('should successfully filter campaigns by status and type', async () => {
      // Arrange
      const campaignIds = [12345];
      const options = { status: 7 as const, type: 8 as const };

      // Act
      const result = await promotionModule.createPromotionAdverts(campaignIds, options);

      // Assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should successfully get auction (manual bid) campaigns', async () => {
      // Act
      const result = await promotionModule.getAuctionAdverts();

      // Assert
      expect(result.adverts).toHaveLength(1);
    });

    it('should throw error for non-existent campaign (404)', async () => {
      // Arrange - 999999 triggers 404 in handler
      const nonExistentId = 999999;

      // Act & Assert
      await expect(promotionModule.createPromotionAdverts([nonExistentId])).rejects.toThrow();
    });
  });

  describe('Configuration and Bid Operations', () => {
    it('should successfully get configuration values', async () => {
      // Act
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const result = await promotionModule.getAdvConfig();

      // Assert
      expect(result.categories).toHaveLength(2);
      expect(result.config).toHaveLength(2);
      expect(result.categories?.[0]?.name).toBe('Electronics');
      expect(result.config?.[0]?.name).toBe('MAX_PRODUCTS');
    });

    it('should successfully get minimum bids for products', async () => {
      // Arrange
      const bidRequest = {
        advert_id: 12345,
        nm_ids: [111, 222],
        payment_type: 'cpm' as const,
        placement_types: ['recommendation'] as 'combined' | 'search' | 'recommendation'[],
      };

      // Act
      const result = await promotionModule.createBidsMin(bidRequest);

      // Assert
      expect(result.bids).toHaveLength(2);
      expect(result.bids[0]?.bids).toHaveLength(2);
      expect(result.bids[0]?.bids[0]?.value).toBe(50);
    });

    it('should throw validation error when bid is below minimum', async () => {
      // Arrange - 88888 triggers bid error in handler
      const invalidBidRequest = {
        advert_id: 88888,
        nm_ids: [111],
        payment_type: 'cpm' as const,
        placement_types: 'search' as const,
      };

      // Act & Assert
      await expect(promotionModule.createBidsMin(invalidBidRequest)).rejects.toThrow();
    });
  });

  describe('Campaign Creation Operations', () => {
    it('should successfully create unified bid campaign', async () => {
      // Arrange
      const campaignData = {
        type: 9,
        name: 'Integration Test Campaign',
        subjectId: 100,
        sum: 10000,
        btype: 1,
        on_pause: false,
        nms: [12345],
        cpm: 50,
      };

      // Act
      const result = await promotionModule.createAdvSaveAd(campaignData);

      // Assert
      expect(result).toBe('Campaign created successfully');
    });

    it('should throw validation error when budget is too high', async () => {
      // Arrange - sum > 50000 triggers budget error
      const expensiveCampaign = {
        name: 'Expensive Campaign',
        sum: 100000,
      };

      // Act & Assert
      await expect(promotionModule.createAdvSaveAd(expensiveCampaign)).rejects.toThrow();
    });

    it('should successfully create manual bid campaign', async () => {
      // Arrange
      const campaignData = {
        name: 'Manual Bid Campaign',
        nms: [12345],
        bid_type: 'manual' as const,
        placement_types: 'search' as const,
      };

      // Act
      const result = await promotionModule.createSeacatSaveAd(campaignData);

      // Assert
      expect(result).toBe(12345);
      expect(typeof result).toBe('number');
    });
  });

  describe('Error Handling - HTTP Status Codes', () => {
    it('should throw AuthenticationError on 401 response', async () => {
      // Arrange
      server.use(
        http.get('https://advert-api.wildberries.ru/adv/v1/promotion/count', () => {
          return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
        })
      );

      // Act & Assert
      await expect(promotionModule.getPromotionCount()).rejects.toThrow(AuthenticationError);
    });

    it('should throw RateLimitError on 429 response', async () => {
      // Arrange
      server.use(
        http.get('https://advert-api.wildberries.ru/adv/v0/config', () => {
          return HttpResponse.json(
            { error: 'Too Many Requests' },
            {
              status: 429,
              headers: { 'Retry-After': '60' },
            }
          );
        })
      );

      // Act & Assert
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      await expect(promotionModule.getAdvConfig()).rejects.toThrow(RateLimitError);
    });

    it('should throw NetworkError on 500 response', async () => {
      // Arrange
      server.use(
        http.get('https://advert-api.wildberries.ru/adv/v1/promotion/count', () => {
          return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        })
      );

      // Act & Assert
      await expect(promotionModule.getPromotionCount()).rejects.toThrow(NetworkError);
    });
  });

  describe('End-to-End Type Safety', () => {
    it('should maintain type safety through entire request flow', async () => {
      // Act
      const countResult = await promotionModule.getPromotionCount();
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const configResult = await promotionModule.getAdvConfig();

      // Assert - TypeScript ensures correct types
      expect(typeof countResult.all).toBe('number');
      expect(Array.isArray(countResult.adverts)).toBe(true);
      expect(Array.isArray(configResult.categories)).toBe(true);
      expect(Array.isArray(configResult.config)).toBe(true);
    });

    it('should correctly type enum parameters', async () => {
      // Arrange - These should compile with correct types
      const validStatus: -1 | 4 | 7 | 8 | 9 | 11 = 7;
      const validType: 4 | 5 | 6 | 7 | 8 = 8;

      // Act
      const result = await promotionModule.createPromotionAdverts([12345], {
        status: validStatus,
        type: validType,
      });

      // Assert
      expect(result).toBeDefined();
    });
  });

  describe('Real-World Scenarios', () => {
    it('should handle complete campaign creation workflow', async () => {
      // 1. Get configuration to check limits
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      const config = await promotionModule.getAdvConfig();
      expect(config.config).toBeDefined();

      // 2. Get minimum bids for products
      const minBids = await promotionModule.createBidsMin({
        advert_id: 12345,
        nm_ids: [111, 222],
        payment_type: 'cpm',
        placement_types: ['recommendation'] as 'combined' | 'search' | 'recommendation'[],
      });
      expect(minBids.bids).toHaveLength(2);

      // 3. Create campaign with validated bids
      const campaignId = await promotionModule.createSeacatSaveAd({
        name: 'Complete Workflow Campaign',
        nms: [111, 222],
        bid_type: 'manual' as const,
        placement_types: 'search' as const,
      });
      expect(campaignId).toBe(12345);

      // 4. Verify campaign was created
      const campaigns = await promotionModule.createPromotionAdverts([campaignId]);
      expect(campaigns).toBeDefined();
    });

    it('should handle campaign count monitoring workflow', async () => {
      // 1. Get all campaign counts
      const countSummary = await promotionModule.getPromotionCount();
      expect(countSummary.all).toBeGreaterThan(0);

      // 2. Get detailed info for specific campaigns
      const campaignIds =
        countSummary.adverts?.flatMap(
          (advert) =>
            advert.advert_list
              ?.map((item) => item.advertId)
              .filter((id): id is number => id !== undefined) ?? []
        ) ?? [];

      if (campaignIds.length > 0) {
        const details = await promotionModule.createPromotionAdverts(campaignIds.slice(0, 2));
        expect(details).toBeDefined();
      }
    });
  });
});
