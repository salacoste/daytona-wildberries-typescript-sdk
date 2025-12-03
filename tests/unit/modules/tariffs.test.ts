/**
 * Unit tests for TariffsModule
 *
 * Tests the TariffsModule class with mocked BaseClient to verify:
 * - Commission rate retrieval operations
 * - Storage tariff operations (box and pallet)
 * - Return tariff operations
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Type safety and error handling
 *
 * @see {@link ../../../src/modules/tariffs/index TariffsModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { TariffsModule } from '../../../src/modules/tariffs';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';

describe('TariffsModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let tariffsModule: TariffsModule;

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
    tariffsModule = new TariffsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('Commission Rate Operations', () => {
    describe('getTariffsCommission() - Commission by category', () => {
      const mockCommissionResponse = {
        report: [
          {
            parentID: 479,
            parentName: 'Электроника',
            commission: 15.5,
          },
          {
            parentID: 629,
            parentName: 'Бытовая химия',
            commission: 12.0,
          },
        ],
      };

      it('should call BaseClient.get with correct URL and empty params', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockCommissionResponse);

        // Act
        await tariffsModule.getTariffsCommission();

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://common-api.wildberries.ru/api/v1/tariffs/commission',
          { params: {}, rateLimitKey: 'tariffs.getTariffsCommission' }
        );
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should call BaseClient.get with locale param when provided', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockCommissionResponse);

        // Act
        await tariffsModule.getTariffsCommission('en');

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://common-api.wildberries.ru/api/v1/tariffs/commission',
          { params: { locale: 'en' }, rateLimitKey: 'tariffs.getTariffsCommission' }
        );
      });

      it('should support all locale options: ru, en, zh', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockCommissionResponse);

        // Act & Assert - Russian
        await tariffsModule.getTariffsCommission('ru');
        expect(mockClient.get).toHaveBeenLastCalledWith(
          'https://common-api.wildberries.ru/api/v1/tariffs/commission',
          { params: { locale: 'ru' }, rateLimitKey: 'tariffs.getTariffsCommission' }
        );

        // Act & Assert - English
        await tariffsModule.getTariffsCommission('en');
        expect(mockClient.get).toHaveBeenLastCalledWith(
          'https://common-api.wildberries.ru/api/v1/tariffs/commission',
          { params: { locale: 'en' }, rateLimitKey: 'tariffs.getTariffsCommission' }
        );

        // Act & Assert - Chinese
        await tariffsModule.getTariffsCommission('zh');
        expect(mockClient.get).toHaveBeenLastCalledWith(
          'https://common-api.wildberries.ru/api/v1/tariffs/commission',
          { params: { locale: 'zh' }, rateLimitKey: 'tariffs.getTariffsCommission' }
        );
      });

      it('should return commission rates response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockCommissionResponse);

        // Act
        const result = await tariffsModule.getTariffsCommission();

        // Assert
        expect(result).toEqual(mockCommissionResponse);
      });

      it('should handle commission response for different sales models', async () => {
        // Arrange - Commission for different regions
        const chinaCommissionResponse = {
          report: [
            {
              parentID: 100,
              parentName: 'Electronics China',
              commission: 18.0,
            },
          ],
        };
        mockClient.get.mockResolvedValue(chinaCommissionResponse);

        // Act
        const result = await tariffsModule.getTariffsCommission();

        // Assert
        expect(result).toBeDefined();
      });

      it('should throw AuthenticationError on 401', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));

        // Act & Assert
        await expect(tariffsModule.getTariffsCommission()).rejects.toThrow(AuthenticationError);
      });

      it('should throw RateLimitError on 429', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 60000));

        // Act & Assert
        await expect(tariffsModule.getTariffsCommission()).rejects.toThrow(RateLimitError);
      });
    });
  });

  describe('Storage Tariff Operations', () => {
    describe('getTariffsBox() - Box storage tariffs', () => {
      const testDate = '2024-01-15';
      const mockBoxTariffsResponse = {
        response: {
          data: {
            dtNextBox: '2024-02-01',
            dtTillMax: '2024-12-31',
            warehouseList: [
              {
                warehouseName: 'Коледино',
                boxDeliveryBase: '10',
                boxDeliveryLiter: '0.5',
                boxStorageBase: '5',
                boxStorageLiter: '0.2',
              },
            ],
          },
        },
      };

      it('should call BaseClient.get with correct URL and date param', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockBoxTariffsResponse);

        // Act
        await tariffsModule.getTariffsBox(testDate);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://common-api.wildberries.ru/api/v1/tariffs/box',
          { params: { date: testDate }, rateLimitKey: 'tariffs.getTariffsBox' }
        );
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should return box tariffs response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockBoxTariffsResponse);

        // Act
        const result = await tariffsModule.getTariffsBox(testDate);

        // Assert
        expect(result).toEqual(mockBoxTariffsResponse);
        expect(result.response?.data?.warehouseList).toBeDefined();
      });

      it('should handle multiple warehouse tariffs', async () => {
        // Arrange
        const multiWarehouseResponse = {
          response: {
            data: {
              dtNextBox: '2024-02-01',
              dtTillMax: '2024-12-31',
              warehouseList: [
                {
                  warehouseName: 'Коледино',
                  boxDeliveryBase: '10',
                  boxStorageBase: '5',
                },
                {
                  warehouseName: 'Подольск',
                  boxDeliveryBase: '12',
                  boxStorageBase: '6',
                },
              ],
            },
          },
        };
        mockClient.get.mockResolvedValue(multiWarehouseResponse);

        // Act
        const result = await tariffsModule.getTariffsBox(testDate);

        // Assert
        expect(result.response?.data?.warehouseList).toHaveLength(2);
      });

      it('should throw ValidationError when date is missing', async () => {
        // Act & Assert
        // @ts-expect-error Testing missing required parameter
        await expect(tariffsModule.getTariffsBox()).rejects.toThrow(ValidationError);
      });

      it('should throw ValidationError when date format is invalid', async () => {
        // Act & Assert
        await expect(tariffsModule.getTariffsBox('01-15-2024')).rejects.toThrow(ValidationError);
        await expect(tariffsModule.getTariffsBox('2024/01/15')).rejects.toThrow(ValidationError);
      });

      it('should throw NetworkError on network failure', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new NetworkError('Network timeout', true));

        // Act & Assert
        await expect(tariffsModule.getTariffsBox(testDate)).rejects.toThrow(NetworkError);
      });
    });

    describe('getTariffsPallet() - Pallet storage tariffs', () => {
      const testDate = '2024-01-15';
      const mockPalletTariffsResponse = {
        response: {
          data: {
            dtNextPallet: '2024-02-01',
            dtTillMax: '2024-12-31',
            warehouseList: [
              {
                warehouseName: 'Коледино',
                palletDeliveryValueBase: '500',
                palletStorageValueExpr: '100',
              },
            ],
          },
        },
      };

      it('should call BaseClient.get with correct URL and date param', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockPalletTariffsResponse);

        // Act
        await tariffsModule.getTariffsPallet(testDate);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://common-api.wildberries.ru/api/v1/tariffs/pallet',
          { params: { date: testDate }, rateLimitKey: 'tariffs.getTariffsPallet' }
        );
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should return pallet tariffs response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockPalletTariffsResponse);

        // Act
        const result = await tariffsModule.getTariffsPallet(testDate);

        // Assert
        expect(result).toEqual(mockPalletTariffsResponse);
        expect(result.response?.data?.warehouseList).toBeDefined();
      });

      it('should handle pallet tariffs for multiple warehouses', async () => {
        // Arrange
        const multiWarehouseResponse = {
          response: {
            data: {
              dtNextPallet: '2024-02-01',
              dtTillMax: '2024-12-31',
              warehouseList: [
                { warehouseName: 'Коледино', palletDeliveryValueBase: '500' },
                { warehouseName: 'Подольск', palletDeliveryValueBase: '550' },
                { warehouseName: 'Электросталь', palletDeliveryValueBase: '480' },
              ],
            },
          },
        };
        mockClient.get.mockResolvedValue(multiWarehouseResponse);

        // Act
        const result = await tariffsModule.getTariffsPallet(testDate);

        // Assert
        expect(result.response?.data?.warehouseList).toHaveLength(3);
      });

      it('should throw ValidationError when date is missing', async () => {
        // Act & Assert
        // @ts-expect-error Testing missing required parameter
        await expect(tariffsModule.getTariffsPallet()).rejects.toThrow(ValidationError);
      });

      it('should throw ValidationError when date format is invalid', async () => {
        // Act & Assert
        await expect(tariffsModule.getTariffsPallet('invalid-date')).rejects.toThrow(
          ValidationError
        );
      });

      it('should throw RateLimitError when rate limited', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new RateLimitError('Rate limit: 60 req/min', 1000));

        // Act & Assert
        await expect(tariffsModule.getTariffsPallet(testDate)).rejects.toThrow(RateLimitError);
      });
    });
  });

  describe('Return Tariff Operations', () => {
    describe('getTariffsReturn() - Return handling tariffs', () => {
      const testDate = '2024-01-15';
      const mockReturnTariffsResponse = {
        response: {
          data: {
            dtNextDeliveryDumpSup: '2024-02-01',
            warehouseList: [
              {
                warehouseName: 'Коледино',
                deliveryDumpSupOfficeBase: '50',
                deliveryDumpSupOfficeLiter: '2.0',
              },
            ],
          },
        },
      };

      it('should call BaseClient.get with correct URL and date param', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockReturnTariffsResponse);

        // Act
        await tariffsModule.getTariffsReturn(testDate);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://common-api.wildberries.ru/api/v1/tariffs/return',
          { params: { date: testDate }, rateLimitKey: 'tariffs.getTariffsReturn' }
        );
        expect(mockClient.get).toHaveBeenCalledTimes(1);
      });

      it('should return return tariffs response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockReturnTariffsResponse);

        // Act
        const result = await tariffsModule.getTariffsReturn(testDate);

        // Assert
        expect(result).toEqual(mockReturnTariffsResponse);
        expect(result.response?.data?.warehouseList).toBeDefined();
      });

      it('should handle return tariffs across multiple warehouses', async () => {
        // Arrange
        const multiWarehouseResponse = {
          response: {
            data: {
              dtNextDeliveryDumpSup: '2024-02-01',
              warehouseList: [
                {
                  warehouseName: 'Коледино',
                  deliveryDumpSupOfficeBase: '50',
                  deliveryDumpSupOfficeLiter: '2.0',
                },
                {
                  warehouseName: 'Подольск',
                  deliveryDumpSupOfficeBase: '55',
                  deliveryDumpSupOfficeLiter: '2.5',
                },
              ],
            },
          },
        };
        mockClient.get.mockResolvedValue(multiWarehouseResponse);

        // Act
        const result = await tariffsModule.getTariffsReturn(testDate);

        // Assert
        expect(result.response?.data?.warehouseList).toHaveLength(2);
      });

      it('should throw ValidationError when date is missing', async () => {
        // Act & Assert
        // @ts-expect-error Testing missing required parameter
        await expect(tariffsModule.getTariffsReturn()).rejects.toThrow(ValidationError);
      });

      it('should throw ValidationError when date format is invalid', async () => {
        // Act & Assert
        await expect(tariffsModule.getTariffsReturn('')).rejects.toThrow(ValidationError);
      });

      it('should throw AuthenticationError on invalid API key', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new AuthenticationError('Invalid or expired API key'));

        // Act & Assert
        await expect(tariffsModule.getTariffsReturn(testDate)).rejects.toThrow(AuthenticationError);
      });
    });
  });

  describe('Error Handling', () => {
    const testDate = '2024-01-15';

    describe('Network errors', () => {
      it('should handle network timeout for commission endpoint', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new NetworkError('Request timeout', true));

        // Act & Assert
        await expect(tariffsModule.getTariffsCommission()).rejects.toThrow(NetworkError);
      });

      it('should handle server errors for tariff endpoints', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new NetworkError('Server error 500', false));

        // Act & Assert
        await expect(tariffsModule.getTariffsBox(testDate)).rejects.toThrow(NetworkError);
      });
    });

    describe('Rate limit errors', () => {
      it('should handle rate limit for commission endpoint (1 req/min)', async () => {
        // Arrange
        const rateLimitError = new RateLimitError('Rate limit: 1 request per minute', 60000);
        mockClient.get.mockRejectedValue(rateLimitError);

        // Act & Assert
        await expect(tariffsModule.getTariffsCommission()).rejects.toThrow(RateLimitError);

        const error = await tariffsModule.getTariffsCommission().catch((e: unknown) => e);
        if (error instanceof RateLimitError) {
          expect(error.retryAfter).toBe(60000);
        }
      });

      it('should handle rate limit for storage endpoints (60 req/min)', async () => {
        // Arrange
        const rateLimitError = new RateLimitError('Rate limit: 60 requests per minute', 1000);
        mockClient.get.mockRejectedValue(rateLimitError);

        // Act & Assert
        await expect(tariffsModule.getTariffsBox(testDate)).rejects.toThrow(RateLimitError);

        await expect(tariffsModule.getTariffsPallet(testDate)).rejects.toThrow(RateLimitError);

        await expect(tariffsModule.getTariffsReturn(testDate)).rejects.toThrow(RateLimitError);
      });
    });

    describe('Authentication errors', () => {
      it('should handle invalid API key across all endpoints', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));

        // Act & Assert
        await expect(tariffsModule.getTariffsCommission()).rejects.toThrow(AuthenticationError);
        await expect(tariffsModule.getTariffsBox(testDate)).rejects.toThrow(AuthenticationError);
        await expect(tariffsModule.getTariffsPallet(testDate)).rejects.toThrow(AuthenticationError);
        await expect(tariffsModule.getTariffsReturn(testDate)).rejects.toThrow(AuthenticationError);
      });

      it('should handle expired API key', async () => {
        // Arrange
        mockClient.get.mockRejectedValue(new AuthenticationError('API key expired'));

        // Act & Assert
        await expect(tariffsModule.getTariffsCommission()).rejects.toThrow(AuthenticationError);
      });
    });
  });

  describe('Type Safety', () => {
    const testDate = '2024-01-15';

    it('should return correctly typed commission response', async () => {
      // Arrange
      const mockResponse = {
        report: [{ parentID: 1, parentName: 'Test', commission: 10.5 }],
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await tariffsModule.getTariffsCommission();

      // Assert - TypeScript will ensure correct types
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should return correctly typed box tariffs response', async () => {
      // Arrange
      const mockResponse = {
        response: {
          data: {
            dtNextBox: '2024-02-01',
            dtTillMax: '2024-12-31',
            warehouseList: [],
          },
        },
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await tariffsModule.getTariffsBox(testDate);

      // Assert - TypeScript ensures type safety
      expect(result.response?.data?.dtNextBox).toBe('2024-02-01');
      expect(result.response?.data?.warehouseList).toBeDefined();
    });

    it('should return correctly typed pallet tariffs response', async () => {
      // Arrange
      const mockResponse = {
        response: {
          data: {
            dtNextPallet: '2024-02-01',
            dtTillMax: '2024-12-31',
            warehouseList: [],
          },
        },
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await tariffsModule.getTariffsPallet(testDate);

      // Assert
      expect(result.response?.data?.dtNextPallet).toBeDefined();
      expect(Array.isArray(result.response?.data?.warehouseList)).toBe(true);
    });

    it('should return correctly typed return tariffs response', async () => {
      // Arrange
      const mockResponse = {
        response: {
          data: {
            dtNextDeliveryDumpSup: '2024-02-01',
            warehouseList: [],
          },
        },
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await tariffsModule.getTariffsReturn(testDate);

      // Assert
      expect(result).toBeDefined();
      expect(result.response?.data?.warehouseList).toEqual([]);
    });
  });

  describe('Integration with BaseClient', () => {
    const testDate = '2024-01-15';

    it('should delegate all operations to BaseClient.get', async () => {
      // Arrange
      mockClient.get.mockResolvedValue({});

      // Act
      await tariffsModule.getTariffsCommission();
      await tariffsModule.getTariffsBox(testDate);
      await tariffsModule.getTariffsPallet(testDate);
      await tariffsModule.getTariffsReturn(testDate);

      // Assert - All 4 methods should call BaseClient.get
      expect(mockClient.get).toHaveBeenCalledTimes(4);
    });

    it('should use correct base URL for all endpoints', async () => {
      // Arrange
      mockClient.get.mockResolvedValue({});

      // Act
      await tariffsModule.getTariffsCommission();
      await tariffsModule.getTariffsBox(testDate);
      await tariffsModule.getTariffsPallet(testDate);
      await tariffsModule.getTariffsReturn(testDate);

      // Assert - All should use common-api.wildberries.ru
      const calls = mockClient.get.mock.calls;
      expect(calls[0]?.[0]).toContain('common-api.wildberries.ru');
      expect(calls[1]?.[0]).toContain('common-api.wildberries.ru');
      expect(calls[2]?.[0]).toContain('common-api.wildberries.ru');
      expect(calls[3]?.[0]).toContain('common-api.wildberries.ru');
    });

    it('should not use POST, PUT, PATCH, or DELETE methods', async () => {
      // Arrange
      mockClient.get.mockResolvedValue({});

      // Act
      await tariffsModule.getTariffsCommission();
      await tariffsModule.getTariffsBox(testDate);
      await tariffsModule.getTariffsPallet(testDate);
      await tariffsModule.getTariffsReturn(testDate);

      // Assert - TariffsModule is read-only, should only use GET
      expect(mockClient.post).not.toHaveBeenCalled();
      expect(mockClient.put).not.toHaveBeenCalled();
      expect(mockClient.patch).not.toHaveBeenCalled();
      expect(mockClient.delete).not.toHaveBeenCalled();
    });
  });
});
