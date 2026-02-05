/**
 * TDD Unit tests for getAcceptanceCoefficients
 *
 * API: GET https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients
 * Rate limit: 6 req/min
 *
 * @module tests/unit/modules/supplies/getAcceptanceCoefficients.test
 */

/* eslint-disable @typescript-eslint/no-deprecated */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { OrdersFbwModule } from '../../../../src/modules/orders-fbw';
import type { BaseClient } from '../../../../src/client/base-client';
import type { ModelsAcceptanceCoefficient } from '../../../../src/types/orders-fbw.types';
import { AuthenticationError } from '../../../../src/errors/auth-error';
import { RateLimitError } from '../../../../src/errors/rate-limit-error';

describe('getAcceptanceCoefficients', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };
  let ordersFbw: OrdersFbwModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
    };
    ordersFbw = new OrdersFbwModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // SUCCESS SCENARIOS
  // ==========================================================================

  describe('Success Scenarios', () => {
    it('should fetch acceptance coefficients without parameters', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 5,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 2,
          storageCoef: '1.5',
          deliveryCoef: '1.2',
        },
        {
          date: '2025-01-26',
          coefficient: 0,
          warehouseID: 211622,
          warehouseName: 'Электросталь',
          allowUnload: true,
          boxTypeName: 'Монопаллеты',
          boxTypeID: 5,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients',
        { params: undefined, rateLimitKey: 'orders-fbw.acceptanceCoefficients' }
      );
      expect(result).toEqual(mockResponse);
      expect(result).toHaveLength(2);
    });

    it('should fetch acceptance coefficients with single warehouseID', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 3,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 2,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients({ warehouseIDs: '507' });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients',
        { params: { warehouseIDs: '507' }, rateLimitKey: 'orders-fbw.acceptanceCoefficients' }
      );
      expect(result).toHaveLength(1);
      expect(result[0].warehouseID).toBe(507);
    });

    it('should fetch acceptance coefficients with multiple warehouseIDs', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 2,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 2,
        },
        {
          date: '2025-01-26',
          coefficient: 1,
          warehouseID: 211622,
          warehouseName: 'Электросталь',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 2,
        },
        {
          date: '2025-01-26',
          coefficient: 0,
          warehouseID: 300461,
          warehouseName: 'Гомель 2',
          allowUnload: true,
          boxTypeName: 'Монопаллеты',
          boxTypeID: 5,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients({
        warehouseIDs: '507,211622,300461',
      });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients',
        {
          params: { warehouseIDs: '507,211622,300461' },
          rateLimitKey: 'orders-fbw.acceptanceCoefficients',
        }
      );
      expect(result).toHaveLength(3);
    });
  });

  // ==========================================================================
  // RESPONSE STRUCTURE VALIDATION
  // ==========================================================================

  describe('Response Structure Validation', () => {
    it('should return correct response structure with all AcceptanceCoefficient fields', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 5,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 2,
          storageCoef: '1.5',
          deliveryCoef: '1.2',
          deliveryBaseLiter: '10.50',
          deliveryAdditionalLiter: '2.30',
          storageBaseLiter: '5.00',
          storageAdditionalLiter: '1.00',
          isSortingCenter: false,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();
      const coef = result[0];

      expect(typeof coef.date).toBe('string');
      expect(typeof coef.coefficient).toBe('number');
      expect(typeof coef.warehouseID).toBe('number');
      expect(typeof coef.warehouseName).toBe('string');
      expect(typeof coef.allowUnload).toBe('boolean');
      expect(typeof coef.boxTypeName).toBe('string');
      expect(typeof coef.boxTypeID).toBe('number');
      expect(typeof coef.storageCoef).toBe('string');
      expect(typeof coef.deliveryCoef).toBe('string');
      expect(typeof coef.deliveryBaseLiter).toBe('string');
      expect(typeof coef.deliveryAdditionalLiter).toBe('string');
      expect(typeof coef.storageBaseLiter).toBe('string');
      expect(typeof coef.storageAdditionalLiter).toBe('string');
      expect(typeof coef.isSortingCenter).toBe('boolean');
    });
  });

  // ==========================================================================
  // COEFFICIENT VALUES
  // ==========================================================================

  describe('Coefficient Values', () => {
    it('should handle coefficient = -1 (acceptance unavailable)', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: -1,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: false,
          boxTypeName: 'Короба',
          boxTypeID: 2,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();

      expect(result[0].coefficient).toBe(-1);
      expect(result[0].allowUnload).toBe(false);
    });

    it('should handle coefficient = 0 (free acceptance)', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 0,
          warehouseID: 211622,
          warehouseName: 'Электросталь',
          allowUnload: true,
          boxTypeName: 'Монопаллеты',
          boxTypeID: 5,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();

      expect(result[0].coefficient).toBe(0);
      expect(result[0].allowUnload).toBe(true);
    });

    it('should handle coefficient >= 1 (acceptance cost multiplier)', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 10,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Суперсейф',
          boxTypeID: 6,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();

      expect(result[0].coefficient).toBe(10);
      expect(result[0].coefficient).toBeGreaterThanOrEqual(1);
    });
  });

  // ==========================================================================
  // NULLABLE FIELDS
  // ==========================================================================

  describe('Nullable Fields', () => {
    it('should handle storageCoef as null', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 5,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Монопаллеты',
          boxTypeID: 5,
          storageCoef: undefined,
          deliveryCoef: '1.2',
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();

      expect(result[0].storageCoef).toBeUndefined();
      expect(result[0].deliveryCoef).toBe('1.2');
    });

    it('should handle deliveryCoef as null', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 3,
          warehouseID: 211622,
          warehouseName: 'Электросталь',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 2,
          storageCoef: '2.0',
          deliveryCoef: undefined,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();

      expect(result[0].deliveryCoef).toBeUndefined();
      expect(result[0].storageCoef).toBe('2.0');
    });
  });

  // ==========================================================================
  // HTTP ERROR SCENARIOS
  // ==========================================================================

  describe('HTTP Errors', () => {
    it('should handle 401 Unauthorized', async () => {
      const error = new AuthenticationError('token problem; token is malformed', 401, {
        title: 'unauthorized',
        detail: 'token problem; token is malformed',
        status: 401,
        statusText: 'Unauthorized',
      });
      mockClient.get.mockRejectedValue(error);

      await expect(ordersFbw.getAcceptanceCoefficients()).rejects.toThrow(AuthenticationError);
      await expect(ordersFbw.getAcceptanceCoefficients()).rejects.toThrow('token problem');
    });

    it('should handle 429 Rate Limit with retryAfter', async () => {
      const error = new RateLimitError('Rate limit exceeded', 10000);
      mockClient.get.mockRejectedValue(error);

      try {
        await ordersFbw.getAcceptanceCoefficients();
        expect.fail('Should have thrown RateLimitError');
      } catch (err) {
        expect(err).toBeInstanceOf(RateLimitError);
        if (err instanceof RateLimitError) {
          expect(err.retryAfter).toBe(10000);
        }
      }
    });
  });

  // ==========================================================================
  // EDGE CASES
  // ==========================================================================

  describe('Edge Cases', () => {
    it('should handle empty array response', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle non-existent warehouseID (returns empty or filtered)', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients({ warehouseIDs: '999999999' });

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://supplies-api.wildberries.ru/api/v1/acceptance/coefficients',
        { params: { warehouseIDs: '999999999' }, rateLimitKey: 'orders-fbw.acceptanceCoefficients' }
      );
      expect(result).toEqual([]);
    });
  });

  // ==========================================================================
  // BOX TYPE VARIATIONS
  // ==========================================================================

  describe('Box Type Variations', () => {
    it('should handle all box types in response', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 2,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 2,
        },
        {
          date: '2025-01-26',
          coefficient: 3,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Монопаллеты',
          boxTypeID: 5,
        },
        {
          date: '2025-01-26',
          coefficient: 5,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'Суперсейф',
          boxTypeID: 6,
        },
        {
          date: '2025-01-26',
          coefficient: 1,
          warehouseID: 507,
          warehouseName: 'Коледино',
          allowUnload: true,
          boxTypeName: 'QR-поставка с коробами',
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients({ warehouseIDs: '507' });

      expect(result).toHaveLength(4);
      expect(result[0].boxTypeName).toBe('Короба');
      expect(result[1].boxTypeName).toBe('Монопаллеты');
      expect(result[2].boxTypeName).toBe('Суперсейф');
      expect(result[3].boxTypeName).toBe('QR-поставка с коробами');
      expect(result[3].boxTypeID).toBeUndefined(); // QR-поставка не имеет boxTypeID
    });

    it('should handle sorting center warehouse', async () => {
      const mockResponse: ModelsAcceptanceCoefficient[] = [
        {
          date: '2025-01-26',
          coefficient: 0,
          warehouseID: 123456,
          warehouseName: 'СЦ Москва',
          allowUnload: true,
          boxTypeName: 'Короба',
          boxTypeID: 2,
          isSortingCenter: true,
        },
      ];

      mockClient.get.mockResolvedValue(mockResponse);

      const result = await ordersFbw.getAcceptanceCoefficients();

      expect(result[0].isSortingCenter).toBe(true);
    });
  });
});
