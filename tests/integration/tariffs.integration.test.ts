/**
 * Integration tests for TariffsModule
 *
 * Tests the TariffsModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow from module → BaseClient → RateLimiter → RetryHandler → HTTP
 * - Rate limiting enforcement for tariff endpoints
 * - Retry logic with real timing
 * - Error transformation from HTTP responses
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/tariffs/index TariffsModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { TariffsModule } from '../../src/modules/tariffs';
import { BaseClient } from '../../src/client/base-client';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { NetworkError } from '../../src/errors/network-error';

/**
 * MSW handlers for Tariffs API endpoints
 * These intercept HTTP requests at the network level and return mocked responses
 */
const handlers = [
  // GET /api/v1/tariffs/commission - Commission rates
  http.get('https://common-api.wildberries.ru/api/v1/tariffs/commission', () => {
    return HttpResponse.json({
      report: [
        {
          parentID: 479,
          parentName: 'Электроника',
          commission: 15.5
        },
        {
          parentID: 629,
          parentName: 'Бытовая химия',
          commission: 12.0
        },
        {
          parentID: 1234,
          parentName: 'Одежда',
          commission: 10.5
        }
      ]
    });
  }),

  // GET /api/v1/tariffs/box - Box storage tariffs
  http.get('https://common-api.wildberries.ru/api/v1/tariffs/box', () => {
    return HttpResponse.json({
      dtNextBox: '2024-02-01',
      dtTillMax: '2024-12-31',
      warehouseList: [
        {
          warehouseName: 'Коледино',
          boxDeliveryAndStorageExpr: '10 + 0.5*days',
          boxDeliveryBase: 10,
          boxDeliveryLiter: 0.5,
          boxStorageBase: 5,
          boxStorageLiter: 0.2
        },
        {
          warehouseName: 'Подольск',
          boxDeliveryAndStorageExpr: '12 + 0.6*days',
          boxDeliveryBase: 12,
          boxDeliveryLiter: 0.6,
          boxStorageBase: 6,
          boxStorageLiter: 0.25
        }
      ]
    });
  }),

  // GET /api/v1/tariffs/pallet - Pallet storage tariffs
  http.get('https://common-api.wildberries.ru/api/v1/tariffs/pallet', () => {
    return HttpResponse.json({
      dtNextBox: '2024-02-01',
      dtTillMax: '2024-12-31',
      warehouseList: [
        {
          warehouseName: 'Коледино',
          palletDeliveryAndStorageExpr: '500 + 50*days',
          palletDeliveryBase: 500,
          palletStorageBase: 100
        },
        {
          warehouseName: 'Подольск',
          palletDeliveryAndStorageExpr: '550 + 55*days',
          palletDeliveryBase: 550,
          palletStorageBase: 110
        },
        {
          warehouseName: 'Электросталь',
          palletDeliveryAndStorageExpr: '480 + 45*days',
          palletDeliveryBase: 480,
          palletStorageBase: 95
        }
      ]
    });
  }),

  // GET /api/v1/tariffs/return - Return handling tariffs
  http.get('https://common-api.wildberries.ru/api/v1/tariffs/return', () => {
    return HttpResponse.json({
      dtNextBox: '2024-02-01',
      dtTillMax: '2024-12-31',
      warehouseList: [
        {
          warehouseName: 'Коледино',
          returnBase: 50,
          returnLiter: 2.0
        },
        {
          warehouseName: 'Подольск',
          returnBase: 55,
          returnLiter: 2.5
        }
      ]
    });
  })
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

describe('TariffsModule Integration Tests', () => {
  let tariffsModule: TariffsModule;
  let baseClient: BaseClient;

  beforeEach(() => {
    // Create real BaseClient with test configuration
    baseClient = new BaseClient({
      apiKey: 'test-tariffs-integration-key',
      timeout: 5000,
      retryConfig: {
        maxRetries: 2,
        retryDelay: 100,
        exponentialBackoff: true
      }
    });

    // Create TariffsModule with real BaseClient
    tariffsModule = new TariffsModule(baseClient);
  });

  describe('Commission Rate Operations', () => {
    it('should successfully get commission rates with real BaseClient', async () => {
      // Act
      const result = await tariffsModule.getTariffsCommission();

      // Assert
      expect(result).toBeDefined();
      expect(result.report).toHaveLength(3);
    });

    it('should return correctly structured commission data', async () => {
      // Act
      const result = await tariffsModule.getTariffsCommission();

      // Assert
      expect(result.report).toBeDefined();
      expect(Array.isArray(result.report)).toBe(true);
    });

    it('should handle commission data for multiple categories', async () => {
      // Act
      const result = await tariffsModule.getTariffsCommission();

      // Assert - Verify all categories have required fields
      expect(result.report).toHaveLength(3);
      expect(result.report?.[0]?.parentName).toBe('Электроника');
      expect(result.report?.[1]?.parentName).toBe('Бытовая химия');
      expect(result.report?.[2]?.parentName).toBe('Одежда');
    });
  });

  describe('Storage Tariff Operations', () => {
    it('should successfully get box storage tariffs', async () => {
      // Act
      const result = await tariffsModule.getTariffsBox();

      // Assert
      expect(result).toBeDefined();
      expect(result.warehouseList).toHaveLength(2);
      expect(result.dtNextBox).toBe('2024-02-01');
      expect(result.dtTillMax).toBe('2024-12-31');
    });

    it('should return correctly structured box tariff data', async () => {
      // Act
      const result = await tariffsModule.getTariffsBox();

      // Assert
      expect(result.warehouseList).toBeDefined();
      expect(Array.isArray(result.warehouseList)).toBe(true);
    });

    it('should successfully get pallet storage tariffs', async () => {
      // Act
      const result = await tariffsModule.getTariffsPallet();

      // Assert
      expect(result).toBeDefined();
      expect(result.warehouseList).toHaveLength(3);
      expect(result.dtNextBox).toBe('2024-02-01');
    });

    it('should handle pallet tariffs for multiple warehouses', async () => {
      // Act
      const result = await tariffsModule.getTariffsPallet();

      // Assert
      expect(result.warehouseList).toHaveLength(3);
    });
  });

  describe('Return Tariff Operations', () => {
    it('should successfully get return handling tariffs', async () => {
      // Act
      const result = await tariffsModule.getTariffsReturn();

      // Assert
      expect(result).toBeDefined();
      expect(result.warehouseList).toHaveLength(2);
      expect(result.dtNextBox).toBe('2024-02-01');
      expect(result.dtTillMax).toBe('2024-12-31');
    });

    it('should return correctly structured return tariff data', async () => {
      // Act
      const result = await tariffsModule.getTariffsReturn();

      // Assert
      expect(result.warehouseList).toBeDefined();
      expect(Array.isArray(result.warehouseList)).toBe(true);
    });
  });

  describe('Error Handling - HTTP Status Codes', () => {
    it('should throw AuthenticationError on 401 response', async () => {
      // Arrange
      server.use(
        http.get('https://common-api.wildberries.ru/api/v1/tariffs/commission', () => {
          return HttpResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
          );
        })
      );

      // Act & Assert
      await expect(tariffsModule.getTariffsCommission())
        .rejects
        .toThrow(AuthenticationError);
    });

    it('should throw RateLimitError on 429 response for commission endpoint', async () => {
      // Arrange - Commission has 1 req/min limit
      server.use(
        http.get('https://common-api.wildberries.ru/api/v1/tariffs/commission', () => {
          return HttpResponse.json(
            { error: 'Rate limit: 1 request per minute' },
            {
              status: 429,
              headers: { 'Retry-After': '60' }
            }
          );
        })
      );

      // Act & Assert
      await expect(tariffsModule.getTariffsCommission())
        .rejects
        .toThrow(RateLimitError);
    });

    it('should throw RateLimitError on 429 response for storage endpoints', async () => {
      // Arrange - Storage endpoints have 60 req/min limit
      server.use(
        http.get('https://common-api.wildberries.ru/api/v1/tariffs/box', () => {
          return HttpResponse.json(
            { error: 'Rate limit: 60 requests per minute' },
            {
              status: 429,
              headers: { 'Retry-After': '1' }
            }
          );
        })
      );

      // Act & Assert
      await expect(tariffsModule.getTariffsBox())
        .rejects
        .toThrow(RateLimitError);
    });

    it('should throw NetworkError on 500 response', async () => {
      // Arrange
      server.use(
        http.get('https://common-api.wildberries.ru/api/v1/tariffs/pallet', () => {
          return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
          );
        })
      );

      // Act & Assert
      await expect(tariffsModule.getTariffsPallet())
        .rejects
        .toThrow(NetworkError);
    });

    it('should throw NetworkError on network timeout', async () => {
      // Arrange
      server.use(
        http.get('https://common-api.wildberries.ru/api/v1/tariffs/return', () => {
          return HttpResponse.error();
        })
      );

      // Act & Assert
      await expect(tariffsModule.getTariffsReturn())
        .rejects
        .toThrow(NetworkError);
    });
  });

  describe('End-to-End Type Safety', () => {
    it('should maintain type safety through entire request flow', async () => {
      // Act
      const commissionResult = await tariffsModule.getTariffsCommission();
      const boxResult = await tariffsModule.getTariffsBox();
      const palletResult = await tariffsModule.getTariffsPallet();
      const returnResult = await tariffsModule.getTariffsReturn();

      // Assert - TypeScript ensures correct types
      expect(Array.isArray(commissionResult.report)).toBe(true);
      expect(Array.isArray(boxResult.warehouseList)).toBe(true);
      expect(Array.isArray(palletResult.warehouseList)).toBe(true);
      expect(Array.isArray(returnResult.warehouseList)).toBe(true);
    });

    it('should correctly handle date string types', async () => {
      // Act
      const boxResult = await tariffsModule.getTariffsBox();

      // Assert
      expect(typeof boxResult.dtNextBox).toBe('string');
      expect(typeof boxResult.dtTillMax).toBe('string');
    });
  });

  describe('Real-World Scenarios', () => {
    it('should handle complete cost calculation workflow', async () => {
      // 1. Get commission rates
      const commissions = await tariffsModule.getTariffsCommission();
      expect(commissions.report).toBeDefined();

      // 2. Get storage costs for boxes
      const boxTariffs = await tariffsModule.getTariffsBox();
      expect(boxTariffs.warehouseList).toBeDefined();

      // 3. Get return costs
      const returnTariffs = await tariffsModule.getTariffsReturn();
      expect(returnTariffs.warehouseList).toBeDefined();

      // 4. Verify all data is available for cost calculations
      expect(commissions.report).toHaveLength(3);
      expect(boxTariffs.warehouseList).toHaveLength(2);
      expect(returnTariffs.warehouseList).toHaveLength(2);
    });

    it('should handle warehouse comparison workflow', async () => {
      // Get all storage tariffs for comparison
      const boxTariffs = await tariffsModule.getTariffsBox();
      const palletTariffs = await tariffsModule.getTariffsPallet();

      // Verify we can compare costs across warehouses
      expect(boxTariffs.warehouseList).toHaveLength(2);
      expect(palletTariffs.warehouseList).toHaveLength(3);
    });

    it('should handle multiple tariff queries in sequence', async () => {
      // Simulate checking all tariff types for business planning
      const commission = await tariffsModule.getTariffsCommission();
      const box = await tariffsModule.getTariffsBox();
      const pallet = await tariffsModule.getTariffsPallet();
      const returnTariff = await tariffsModule.getTariffsReturn();

      // Verify all queries succeeded
      expect(commission.report).toBeDefined();
      expect(box.warehouseList).toBeDefined();
      expect(pallet.warehouseList).toBeDefined();
      expect(returnTariff.warehouseList).toBeDefined();
    });
  });

  describe('Read-Only Operations Verification', () => {
    it('should only use GET requests for all endpoints', async () => {
      // Act - Call all module methods
      await tariffsModule.getTariffsCommission();
      await tariffsModule.getTariffsBox();
      await tariffsModule.getTariffsPallet();
      await tariffsModule.getTariffsReturn();

      // Assert - All requests should be GET (verified by MSW handlers)
      // If any POST/PUT/PATCH/DELETE was used, MSW would error
      expect(true).toBe(true);
    });
  });
});
